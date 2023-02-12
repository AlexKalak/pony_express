package services

import (
	"github.com/alexkalak/pony_express/src/Routes/validation"
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
type calculateRequestBody struct {
	senderCity   models.City `json:"sender-city" validate:"required"`
	receiverCity models.City `json:"receiver-city" validate:"required"`
	Places       []Place     `json:"places" validate:"required"`
}

func (cs *calculatorService) Calculate(c *fiber.Ctx) (float64, []*types.ErrorResponse, error) {
	var reqBody calculateRequestBody
	err := c.BodyParser(&reqBody)
	if err != nil {
		return 0, nil, err
	}

	validationErrors := validation.Validate(&reqBody)
	if len(validationErrors) > 0 {
		return 0, validationErrors, nil
	}
	return 201, nil, nil
}
