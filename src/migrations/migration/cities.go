package migration

import (
	"fmt"
	"strconv"

	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func MigrateCities() {
	database := db.GetDB()

	var RussiaFromDB models.Country
	var MoldovaFromDB models.Country
	var UkraineFromDB models.Country
	database.Find(&RussiaFromDB, "name = ?", "Rusya")
	database.Find(&MoldovaFromDB, "name = ?", "Moldova")
	database.Find(&UkraineFromDB, "name = ?", "Ukrayna")

	MigrateMoscowAndSPB(RussiaFromDB)
	MigrateBigCities(RussiaFromDB)
	MigrateSmallCities(RussiaFromDB)
	MigrateMoldovaCities(MoldovaFromDB)
	MigrateUkraineCities(UkraineFromDB)
}

func MigrateMoscowAndSPB(countryFromDB models.Country) {
	SaveIfNotExistCity("Москва", 15, countryFromDB)
	SaveIfNotExistCity("Санкт-Петербург", 15, countryFromDB)
}

func MigrateBigCities(countryFromDB models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/russia/russia-big-cities.csv")

	for _, entity := range arr {
		SaveIfNotExistCity(entity[0], 16, countryFromDB)
	}
}

func MigrateSmallCities(coutryFromDB models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/russia/city_places.csv")

	for _, entity := range arr {
		if entity[0] == "180" {
			SaveIfNotExistCity(entity[3], 17, coutryFromDB)
		}
	}
}

func MigrateMoldovaCities(countryFromDB models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/moldova/cities.csv")

	for _, entity := range arr {
		l_reg_id, _ := strconv.Atoi(entity[1])
		regionID := l_reg_id + 17
		SaveIfNotExistCity(entity[0], regionID, countryFromDB)
	}
}

func MigrateUkraineCities(countryFromDB models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/ukraine/cities.csv")

	for _, entity := range arr {
		l_reg_id, _ := strconv.Atoi(entity[1])
		regionID := l_reg_id + 21
		SaveIfNotExistCity(entity[0], regionID, countryFromDB)
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
