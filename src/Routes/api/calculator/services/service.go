package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"math"

	"github.com/alexkalak/pony_express/src/Routes/validation"
	currencyhelper "github.com/alexkalak/pony_express/src/currencyHelper"
	"github.com/alexkalak/pony_express/src/helpers/city_helper"
	"github.com/alexkalak/pony_express/src/helpers/package_types_helper"
	"github.com/alexkalak/pony_express/src/helpers/price_helper"
	"github.com/alexkalak/pony_express/src/helpers/weights_helper"
	"github.com/alexkalak/pony_express/src/types"
	"github.com/gofiber/fiber/v2"
)

type CalculatorService interface {
	Calculate(c *fiber.Ctx) (float64, bool, []*types.ErrorResponse, error)
}

type calculatorService struct {
}

func New() CalculatorService {
	return &calculatorService{}
}

type Place struct {
	Weight float64 `json:"weight" validate:"required"`
	Width  float64 `json:"width" validate:""`
	Length float64 `json:"length" validate:""`
	Height float64 `json:"height" validate:""`
}
type CalculateRequestBody struct {
	ReceiverCity string  `json:"receiver-city" validate:"required"`
	Places       []Place `json:"places" validate:"required,dive"`
	DeliveryType string  `json:"delivery-type" validate:"required"`
	PackageType  string  `json:"package-type" validate:"required"`
}

func (cs *calculatorService) Calculate(c *fiber.Ctx) (float64, bool, []*types.ErrorResponse, error) {
	var reqBody CalculateRequestBody
	//parsing user request
	err := c.BodyParser(&reqBody)
	if err != nil {
		return 0, false, nil, err
	}

	//printing req body in console in readable format
	fmt.Println("REQ BODY")
	str, _ := json.MarshalIndent(&reqBody, "", "\t")
	fmt.Println(string(str))

	//Validating user request
	validationErrors := validation.Validate(&reqBody)
	if len(reqBody.Places) < 1 {
		//If places length less than 1 returning validation error
		validationErrors = append(validationErrors, &types.ErrorResponse{
			FailedField: "places",
			Tag:         "min-length=1",
		})
	}

	if len(validationErrors) > 0 {
		return 0, false, validationErrors, nil
	}

	//Getting from database receiver city
	p_receiverCityFromDB, err := city_helper.GetCityByName(reqBody.ReceiverCity)
	if err != nil {
		return 0, false, nil, err
	}

	//Getitng package type from db
	p_packageTypeFromDB, err := package_types_helper.GetPackageTypeFromDB(reqBody.PackageType)
	if err != nil {
		return 0, false, nil, err
	}

	//Getting total weight
	weight, usedVolumeWeights, err := GetWeight(reqBody.Places, p_packageTypeFromDB.Name)
	if err != nil {
		return 0, false, nil, err
	}

	price, err := GetPrice(weight, p_receiverCityFromDB.RegionID, p_packageTypeFromDB.ID, p_packageTypeFromDB.Name)
	if err != nil {
		return 0, false, nil, err
	}

	floatedPrice := currencyhelper.ConvertIntValueToFloat(price)
	return floatedPrice, usedVolumeWeights, nil, nil
}

func GetPrice(weight float64, regionID int, packageTypeID int, packageType string) (int, error) {
	var maxWeight float64 = 20

	if packageType == "documents" {
		maxWeight = 2.5
	}

	numOfMaxWeights := int(weight / maxWeight)
	reminder := weight - float64(numOfMaxWeights)*maxWeight

	fmt.Println("num of max weights: ", numOfMaxWeights)
	fmt.Println("reminder: ", reminder)

	p_maxWeightFromDB, err := weights_helper.GetWeightFromDB(maxWeight)
	if err != nil {
		return 0, err
	}

	//Finding price for max weight in db
	maxPriceFromDB, err := price_helper.GetPriceFromDB(regionID, packageTypeID, p_maxWeightFromDB.ID)
	if err != nil {
		return 0, nil
	}

	price := numOfMaxWeights * maxPriceFromDB.Price

	err = addReminderToPrice(&price, reminder, regionID, packageTypeID)

	if err != nil {
		return 0, err
	}

	return price, nil
}

func GetWeight(places []Place, packageType string) (float64, bool, error) {
	weights, usedVolumeWeights, err := GetWeights(places, packageType)
	if err != nil {
		return 0, false, err
	}

	RoundUpWeights(&weights)
	fmt.Println(weights)

	var sum float64
	for _, weight := range weights {
		sum += weight
	}
	return sum, usedVolumeWeights, nil
}

func GetWeights(places []Place, packageType string) ([]float64, bool, error) {
	var err error
	var weights = make([]float64, 0, len(places))

	//If user uses documents package type, will be checked only real weights
	if packageType == "documents" {
		for _, place := range places {
			weights = append(weights, place.Weight)
		}
		return weights, false, nil
	}

	//If user uses standart or B2B package type, will be checked volume weights too
	weights, usedVolumeWeights, err := GetMaxWeights(places)
	if err != nil {
		return nil, false, err
	}

	return weights, usedVolumeWeights, nil
}

func GetMaxWeights(places []Place) ([]float64, bool, error) {
	maxWeights := make([]float64, 0, len(places))
	usedVolumeWeights := false

	for _, place := range places {
		if place.Length == 0 || place.Weight == 0 || place.Height == 0 {
			return nil, false, errors.New("invalid sizes")
		}

		volumeWeight := CalculateVolumeWeight(place.Length, place.Width, place.Height)

		if volumeWeight > place.Weight {
			maxWeights = append(maxWeights, volumeWeight)
			usedVolumeWeights = true
			continue
		}

		maxWeights = append(maxWeights, place.Weight)
	}

	return maxWeights, usedVolumeWeights, nil
}

func RoundUpWeights(weights *[]float64) {
	for i := range *weights {
		if (*weights)[i] < 10 {
			(*weights)[i] = math.Round((*weights)[i]*2) / 2
		} else {
			(*weights)[i] = math.Round((*weights)[i])
		}
	}
}

func addReminderToPrice(price *int, reminder float64, regionID int, packageTypeID int) error {
	if reminder > 0 {
		p_reminderFromDB, err := weights_helper.GetWeightFromDB(reminder)
		if err != nil {
			return err
		}

		//Finding price for reminder weight in db
		reminderPriceFromDB, err := price_helper.GetPriceFromDB(regionID, packageTypeID, p_reminderFromDB.ID)
		if err != nil {
			return err
		}

		*price += reminderPriceFromDB.Price
	}

	return nil
}

func CalculateVolumeWeight(length float64, width float64, height float64) float64 {
	return length * width * height / 5000
}
