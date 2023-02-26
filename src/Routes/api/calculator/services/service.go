package services

import (
	"encoding/json"
	"fmt"

	"github.com/alexkalak/pony_express/src/Routes/validation"
	currencyhelper "github.com/alexkalak/pony_express/src/currencyHelper"
	"github.com/alexkalak/pony_express/src/helpers/city_helper"
	"github.com/alexkalak/pony_express/src/helpers/package_types_helper"
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

// Get sum of weights of all places
