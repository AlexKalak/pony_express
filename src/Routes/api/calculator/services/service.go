package services

import (
	"encoding/json"
	"fmt"

	"github.com/alexkalak/pony_express/src/Routes/validation"
	currencyhelper "github.com/alexkalak/pony_express/src/currencyHelper"
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/helpers/city_helper"
	"github.com/alexkalak/pony_express/src/helpers/package_types_helper"
	"github.com/alexkalak/pony_express/src/models"
	"github.com/alexkalak/pony_express/src/types"
	"github.com/gofiber/fiber/v2"
)

type CalculatorService interface {
	Calculate(c *fiber.Ctx) (*ResponsePrices, bool, []*types.ErrorResponse, error)
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
	ReceiverCity     string  `json:"receiver-city" validate:"required"`
	ReceiverDistrict string  `json:"receiver-distrtice"`
	SenderRegion     string  `json:"sender-city" validate:"required"`
	Places           []Place `json:"places" validate:"required,dive"`
	PackageType      string  `json:"package-type" validate:"required"`
}

type ResponsePrices struct {
	DoorDoor     float64 `json:"door-door"`
	DoorOffice   float64 `json:"door-office"`
	OfficeDoor   float64 `json:"office-door"`
	OfficeOffice float64 `json:"office-office"`
}

func (cs *calculatorService) Calculate(c *fiber.Ctx) (*ResponsePrices, bool, []*types.ErrorResponse, error) {
	database := db.GetDB()
	reqBody, validationErrors, err := handleRequest(c)
	if err != nil {
		return nil, false, nil, err
	}
	if validationErrors != nil {
		return nil, false, validationErrors, nil
	}

	//Finding sender region and city
	var senderRegionFromDB models.SenderRegion
	res := database.Preload("SenderCity").First(&senderRegionFromDB, "name = ?", reqBody.SenderRegion)
	if res.Error != nil {
		return nil, false, nil, fmt.Errorf("sender-city not found")
	}
	senderCityFromDB := senderRegionFromDB.SenderCity

	//Getting from database receiver city
	var receiverCityFromDB *models.City
	if reqBody.ReceiverDistrict != "" {
		receiverCityFromDB, err = city_helper.GetCityByNameAndDistrict(reqBody.ReceiverCity, reqBody.ReceiverDistrict)
	} else {
		receiverCityFromDB, err = city_helper.GetCityByName(reqBody.ReceiverCity)
	}
	if err != nil {
		return nil, false, nil, fmt.Errorf("receiver-city not found")
	}

	//Checking if receiver area is Moscow of Saint_Petersburg
	switch receiverCityFromDB.District.Area.Name {
	case "Московская":
		receiverCityFromDB, err = city_helper.GetCityByName("Москва")
	case "Санкт-Петербург":
		receiverCityFromDB, err = city_helper.GetCityByName("Санкт-Петербург")
	}
	if err != nil {
		return nil, false, nil, err
	}

	//Getitng package type from db
	packageTypeFromDB, err := package_types_helper.GetPackageTypeFromDB(reqBody.PackageType)
	if err != nil {
		return nil, false, nil, err
	}

	//Getting total weight
	weight, usedVolumeWeights, err := GetWeight(reqBody.Places, packageTypeFromDB.Name)
	if err != nil {
		return nil, false, nil, err
	}

	price, err := GetPrice(weight, receiverCityFromDB.RegionID, packageTypeFromDB.ID, packageTypeFromDB.Name, senderCityFromDB.ID)
	if err != nil {
		return nil, false, nil, err
	}

	floatedOfficePrice := currencyhelper.ConvertIntValueToFloat(price)
	floatedDoorPrice := currencyhelper.ConvertIntValueToFloat(senderRegionFromDB.PriceForDoor)

	ResponsePrices := ResponsePrices{
		OfficeOffice: floatedOfficePrice,
		OfficeDoor:   floatedOfficePrice,
		DoorDoor:     floatedOfficePrice + floatedDoorPrice,
		DoorOffice:   floatedOfficePrice + floatedDoorPrice,
	}

	return &ResponsePrices, usedVolumeWeights, nil, nil
}

func handleRequest(c *fiber.Ctx) (*CalculateRequestBody, []*types.ErrorResponse, error) {
	var reqBody CalculateRequestBody
	//parsing user request
	err := c.BodyParser(&reqBody)
	if err != nil {
		return nil, nil, err
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
		return nil, validationErrors, nil
	}

	return &reqBody, nil, nil
}
