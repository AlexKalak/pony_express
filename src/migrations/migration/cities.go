package migration

import (
	"fmt"

	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func MigrateCities() {
	database := db.GetDB()

	var RussiaFromDB models.Country
	var MoldovaFromDB models.Country
	database.Find(&RussiaFromDB, "name = ?", "Rusya")
	database.Find(&MoldovaFromDB, "name = ?", "Moldova")

	MigrateMoscowAndSPB(RussiaFromDB)
	MigrateBigCities(RussiaFromDB)
	MigrateSmallCities(RussiaFromDB)
}

func MigrateMoscowAndSPB(countryFromDB models.Country) {
	SaveIfNotExistCity("Москва", 15, countryFromDB)
	SaveIfNotExistCity("Санкт-Петербург", 15, countryFromDB)
}

func MigrateBigCities(countryFromDB models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/big-countries.csv")

	for _, entity := range arr {
		SaveIfNotExistCity(entity[0], 16, countryFromDB)
	}
}

func MigrateSmallCities(coutryFromDB models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/city_places.csv")

	for _, entity := range arr {
		if entity[0] == "180" {
			SaveIfNotExistCity(entity[3], 17, coutryFromDB)
		}
	}
}

func SaveIfNotExistCity(cityName string, regionID int, countryFromDB models.Country) {
	fmt.Println(cityName)
	database := db.GetDB()
	var city models.City
	database.Find(&city, "name = ?", cityName)
	if city.ID != 0 {
		return
	}

	city.Name = cityName
	city.Country = countryFromDB
	city.Region.ID = regionID
	database.Create(&city)
}
