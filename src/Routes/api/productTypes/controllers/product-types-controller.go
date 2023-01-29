package controllers

import (
	"errors"
	"net/http"

	productTypeErrors "github.com/alexkalak/pony_express/src/Routes/api/productTypes/errors"
	"github.com/alexkalak/pony_express/src/Routes/api/productTypes/services"
	"github.com/gofiber/fiber/v2"
)

var TypesService = services.New()

func ProductTypesController(router fiber.Router) {
	router.Get("/", GetAllTypesHandler)
	router.Post("/", SaveType)
	router.Delete("/:id<int>", DeleteType)
}

func GetAllTypesHandler(c *fiber.Ctx) error {
	productTypes, err := TypesService.GetAllProductTypes()
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}
	return c.JSON(productTypes)
}

func SaveType(c *fiber.Ctx) error {
	productType, validationErrors, err := TypesService.SaveProductType(c)
	if err != nil {
		c.SendStatus(http.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"ok":    "false",
			"error": "An internal server error occured",
		})
	}

	if len(validationErrors) > 0 {
		c.SendStatus(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"ok":              "false",
			"validationErros": validationErrors,
		})
	}

	return c.JSON(fiber.Map{
		"ok":           true,
		"product-type": productType,
	})
}

func DeleteType(c *fiber.Ctx) error {
	id, err := TypesService.DeleteProductType(c)
	if err != nil {
		switch {
		case errors.Is(err, productTypeErrors.ErrProductTypeNotFound):
			c.SendStatus(http.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"ok":    "false",
				"error": "Product type not found",
			})

		default:
			c.SendStatus(http.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"ok":    "false",
				"error": "An internal server error occured",
			})
		}

	}

	return c.JSON(fiber.Map{
		"ok": true,
		"id": id,
	})
}
