package city_helper

import (
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func GetCityByName(name string) (*models.City, error) {
	database := db.GetDB()
	var city models.City
	res := database.Model(&models.City{}).Where("name = ?", name).First(&city)
	if res.Error != nil {
		return nil, res.Error
	}

	return &city, nil
}
