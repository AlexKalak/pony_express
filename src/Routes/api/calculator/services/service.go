package services

import (
	"encoding/json"
	"fmt"

	"github.com/alexkalak/pony_express/src/Routes/validation"
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/helpers/city_helper"
	"github.com/alexkalak/pony_express/src/models"
	"github.com/alexkalak/pony_express/src/types"
	"github.com/gofiber/fiber/v2"
)

type CalculatorService interface {
	Calculate(c *fiber.Ctx) (float64, []*types.ErrorResponse, error)
}

type calculatorService struct {
}

func New() CalculatorService {
	return &calculatorService{}
}

type Place struct {
	Weight float64 `json:"weight" validate:"required"`
	Width  int     `json:"width" validate:"required"`
	Length int     `json:"length" validate:"required"`
	Height int     `json:"height" validate:"required"`
}
type CalculateRequestBody struct {
	SenderCity   string  `json:"sender-city" validate:"required"`
	ReceiverCity string  `json:"receiver-city" validate:"required"`
	Places       []Place `json:"places" validate:"required,dive"`
	DeliveryType string  `json:"delivery-type" validate:"required"`
	PackageType  string  `json:"package-type" validate:"required"`
}

func (cs *calculatorService) Calculate(c *fiber.Ctx) (float64, []*types.ErrorResponse, error) {
	database := db.GetDB()

	var reqBody CalculateRequestBody
	err := c.BodyParser(&reqBody)
	if err != nil {
		return 0, nil, err
	}

	fmt.Println("REQ BODY")
	str, _ := json.MarshalIndent(&reqBody, "", "\t")
	fmt.Println(string(str))

	validationErrors := validation.Validate(&reqBody)
	if len(reqBody.Places) < 1 {
		validationErrors = append(validationErrors, &types.ErrorResponse{
			FailedField: "places",
			Tag:         "min-length=1",
		})
	}

	if len(validationErrors) > 0 {
		return 0, validationErrors, nil
	}

	// senderCity, err := city_helper.GetCityByName()
	// if err != nil {
	// 	return 0, nil, err
	// }
	receiverCity, err := city_helper.GetCityByName(reqBody.ReceiverCity)
	if err != nil {
		return 0, nil, err
	}

	database.Model(&models.Price{}).Where("region_id = ? AND weight_id = ? AND package-type = ?", receiverCity.RegionID)

	return 201, nil, nil
}

func ClaculateVolumeWeight(length float64, width float64, height float64) float64 {
	return length * width * height / 5000
}
