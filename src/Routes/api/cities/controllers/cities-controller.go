package controllers

import (
	"net/http"

	"github.com/alexkalak/pony_express/src/Routes/api/cities/services"
	"github.com/gofiber/fiber/v2"
)

var CitiesService = services.New()

func CitiesController(router fiber.Router) {
	router.Get("/", getCities)
}

func getCities(c *fiber.Ctx) error {
	cities, err := CitiesService.GetAllCities(c)
	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{
		"ok":     true,
		"cities": cities,
	})
}
