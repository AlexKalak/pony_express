package city_helper

import (
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func GetCityByName(name string) (*models.City, error) {
	database := db.GetDB()
	var city models.City
	res := database.Model(&models.City{}).Preload("District.Area").Where("name = ?", name).First(&city)
	if res.Error != nil {
		return nil, res.Error
	}

	return &city, nil
}

func GetCityByCityNameCountryAndDistrict(name string, countryName, districtName string) (*models.City, error) {
	database := db.GetDB()

	districtFromDB, err := GetDistrictByName(districtName)
	if err != nil {
		return nil, err
	}

	countryFromDB, err := GetCountryByName(districtName)
	if err != nil {
		return nil, err
	}

	var city models.City
	res := database.
		Model(&models.City{}).
		Preload("District.Area").
		Where("name = ? AND district_id = ? AND county_id", name, districtFromDB.ID, countryFromDB.ID).
		First(&city)

	if res.Error != nil {
		return nil, res.Error
	}

	return &city, nil
}
func GetCityByCityNameAndCountry(name string, countryName string) (*models.City, error) {
	database := db.GetDB()

	countryFromDB, err := GetCountryByName(countryName)
	if err != nil {
		return nil, err
	}

	var City models.City
	res := database.First(&City, "name = ? and country_id = ?", name, countryFromDB.ID)
	if res.Error != nil {
		return nil, res.Error
	}

	return &City, nil
}

func GetSenderCityByName(name string) (*models.SenderCity, error) {
	database := db.GetDB()
	var senderCity models.SenderCity
	res := database.First(&senderCity, "name = ?", name)
	if res.Error != nil {
		return nil, res.Error
	}

	return &senderCity, nil
}

func GetDistrictByName(name string) (*models.District, error) {
	database := db.GetDB()
	var district models.District
	res := database.First(&district, "name = ?", name)
	if res.Error != nil {
		return nil, res.Error
	}

	return &district, nil
}

func GetCountryByName(name string) (*models.Country, error) {
	database := db.GetDB()
	var country models.Country
	res := database.First(&country, "name = ?", name)
	if res.Error != nil {
		return nil, res.Error
	}

	return &country, nil
}
