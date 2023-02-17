package main

import (
	"encoding/csv"
	"fmt"
	"os"

	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func main() {
	// database := db.GetDB()
	database := db.GetDB()
	array := ReadCSV("/home/alexkalak/Desktop/pony_express/csvtables/coutries.csv")

	var regions []models.Region
	database.Find(&regions)
	for i := 0; i < 14-len(regions); i++ {
		database.Create(&models.Region{})
	}

	for _, entity := range array {
		SaveIfNotExistsCountryCode(entity[1])
		SaveIfNotExistsCountry(entity[0], entity[1])
	}
}

func SaveIfNotExistsCountryCode(code string) {
	database := db.GetDB()

	countryCode := models.CountryCode{}

	database.Model(&models.CountryCode{}).Where("code = ?", code).Find(&countryCode)
	if countryCode.ID == 0 {
		database.Create(&models.CountryCode{Code: code})
	}
}

func SaveIfNotExistsCountry(countryName string, code string) {
	database := db.GetDB()

	countryCode := models.CountryCode{}
	database.Model(&models.CountryCode{}).Where("code = ?", code).Find(&countryCode)

	country := models.Country{}
	database.Model(&models.Country{}).Where("name = ?", countryName).Find(&country)
	if country.ID != 0 {
		return
	}

	country.CountryCode = countryCode
	country.Name = countryName
	database.Create(&country)

}

func ReadCSV(path string) [][]string {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	csvReader := csv.NewReader(file)
	records, err := csvReader.ReadAll()
	if err != nil {
		panic(err)
	}

	fmt.Println(records)
	return records
}
