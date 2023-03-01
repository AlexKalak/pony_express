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

	MigrateSenderCities()

	MigrateAreas(&RussiaFromDB)
	MigrateDistricts(&RussiaFromDB)
	MigrateRussianCities(&RussiaFromDB)
	MigrateMoldovaCities(&MoldovaFromDB)
	MigrateUkraineCities(&UkraineFromDB)
}

func MigrateSenderRegions() {
	database := db.GetDB()
	var Istanbul models.SenderCity
	var Antalya models.SenderCity

	res := database.Find(&Istanbul, "name = ?", "Istanbul")
	if res.Error != nil {
		panic(res.Error)
	}
	res = database.Find(&Antalya, "name = ?", "Antalya")
	if res.Error != nil {
		panic(res.Error)
	}

	AsianIstanbulReg := models.SenderRegion{
		Name:       "Asian part of Istanbul",
		SenderCity: Istanbul,
	}
	EuropeIstanbulReg := models.SenderRegion{
		Name:       "Europe part of Istanbul",
		SenderCity: Istanbul,
	}
	AntalyaReg := models.SenderRegion{
		Name:       "Antalya",
		SenderCity: Antalya,
	}

	database.Create(&AsianIstanbulReg)
	database.Create(&EuropeIstanbulReg)
	database.Create(&AntalyaReg)
}

func MigrateSenderCities() {
	database := db.GetDB()
	Istanbul := models.SenderCity{
		Name: "Istanbul",
	}
	Antalya := models.SenderCity{
		Name: "Antalya",
	}

	database.Create(&Istanbul)
	database.Create(&Antalya)
}

// ///////////////////////////// CountryCities ///////////////////////////////////////////////////
func MigrateAreas(countryFromDB *models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/russia/cities/country_cities.csv")

	for _, entity := range arr {
		if entity[1] != "180" {
			continue
		}

		id, err := strconv.Atoi(entity[0])
		if err != nil {
			panic(err)
		}
		areaName := entity[2]

		SaveArea(id, areaName, countryFromDB)
	}
}

func SaveArea(id int, areaName string, countryFromDB *models.Country) {
	database := db.GetDB()
	area := models.Area{
		ID:      id,
		Name:    areaName,
		Country: *countryFromDB,
	}

	database.Save(&area)
}

// //////////////////////////// Cities and big and small ///////////////////////////////////////////
func MigrateDistricts(countryFromDB *models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/russia/cities/districts.csv")

	for _, entity := range arr {
		id, err := strconv.Atoi(entity[0])
		if err != nil {
			panic(err)
		}
		areaID, err := strconv.Atoi(entity[1])
		if err != nil {
			panic(err)
		}
		districtName := entity[2]

		SaveDistrict(id, districtName, areaID)
		// SaveDistrict(districtName, areaID)
	}
}

func SaveDistrict(id int, districtName string, areaID int) {
	// func SaveDistrict(districtName string, areaID int) {
	database := db.GetDB()
	area := models.District{
		ID:     id,
		Name:   districtName,
		AreaID: areaID,
	}

	database.Save(&area)
}

func MigrateRussianCities(countryFromDB *models.Country) {
	arrAllCities := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/russia/cities/city_places.csv")
	arrBigCities := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/russia/cities/russia-big-cities.csv")

	SaveIfNotExistCity("Москва", 15, countryFromDB, nil)
	SaveIfNotExistCity("Санкт-Петербург", 15, countryFromDB, nil)

	for _, entity := range arrAllCities {
		if entity[0] != "180" {
			continue
		}

		cityName := entity[3]

		regionID := 17
		if BigCityContains(arrBigCities, cityName) {
			regionID = 16
		}
		if cityName == "Москва" || cityName == "Санкт-Петербург" {
			regionID = 15
		}

		if entity[2] == "" {
			SaveIfNotExistCity(cityName, regionID, countryFromDB, nil)
			continue
		}

		areaID, err := strconv.Atoi(entity[2])
		if err != nil {
			panic(err)
		}

		SaveIfNotExistCity(cityName, regionID, countryFromDB, &areaID)
	}
}
func MigrateMoldovaCities(countryFromDB *models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/moldova/cities.csv")

	for _, entity := range arr {
		l_reg_id, _ := strconv.Atoi(entity[1])
		regionID := l_reg_id + 17
		SaveIfNotExistCity(entity[0], regionID, countryFromDB, nil)
	}
}

func MigrateUkraineCities(countryFromDB *models.Country) {
	arr := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/ukraine/cities.csv")

	for _, entity := range arr {
		l_reg_id, _ := strconv.Atoi(entity[1])
		regionID := l_reg_id + 21
		SaveIfNotExistCity(entity[0], regionID, countryFromDB, nil)
	}
}

func SaveIfNotExistCity(cityName string, regionID int, countryFromDB *models.Country, DistrictID *int) {
	fmt.Println(cityName)
	database := db.GetDB()
	var city models.City
	database.Find(&city, "name = ? and district_id = ?", cityName, DistrictID)
	if city.ID != 0 {
		return
	}

	city.Name = cityName
	city.Country = *countryFromDB
	city.Region.ID = regionID
	city.DistrictID = DistrictID
	database.Create(&city)
}

func BigCityContains(bigCityArr [][]string, cityName string) bool {
	for _, city := range bigCityArr {
		if city[0] == cityName {
			return true
		}
	}
	return false
}
