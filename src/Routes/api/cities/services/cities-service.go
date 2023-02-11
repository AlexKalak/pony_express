package services

import (
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
	"github.com/gofiber/fiber/v2"
)

type CitiesService interface {
	GetAllCities(c *fiber.Ctx) (*[]models.City, error)
}

type citiesService struct {
}

func New() CitiesService {
	return &citiesService{}
}

func (cs *citiesService) GetAllCities(c *fiber.Ctx) (*[]models.City, error) {
	database := db.GetDB()

	p_cities := new([]models.City)
	res := database.Find(p_cities)
	if res.Error != nil {
		return nil, res.Error
	}

	return p_cities, nil
}
