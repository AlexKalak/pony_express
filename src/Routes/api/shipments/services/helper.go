package services

import (
	"crypto/rand"
	"errors"
	"fmt"
	"math/big"
	"strconv"

	l_custom_errors "github.com/alexkalak/pony_express/src/Routes/api/shipments/errors"
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
	"gorm.io/gorm/clause"
)

func GetCountryId(countryName string) (int, error) {
	database := db.GetDB()

	var country models.Country
	res := database.Model(&models.Country{}).Select("id").Where("name = ?", countryName).Find(&country)
	if res.Error != nil {
		return 0, res.Error
	}

	if country.ID == 0 {
		return 0, errors.New("country not found")
	}
	return country.ID, nil
}

func GetCityId(cityName string) (int, error) {
	database := db.GetDB()

	var city models.City
	res := database.Model(&models.City{}).Select("id").Where("name = ?", cityName).Find(&city)
	if res.Error != nil {
		return 0, res.Error
	}

	if city.ID == 0 {
		fmt.Println(cityName)
		return 0, errors.New("city not found")
	}
	return city.ID, nil
}

func GetCoutryCodeId(countryCode string) (int, error) {
	database := db.GetDB()

	var countryId models.CountryCode
	res := database.Model(&models.CountryCode{}).Select("id").Where("code = ?", countryCode).Find(&countryId)
	if res.Error != nil {
		return 0, res.Error
	}

	if countryId.ID == 0 {
		return 0, errors.New("countryId not found")
	}
	return countryId.ID, nil
}

func GetShipmentFromDB(id int) (*models.Shipment, error) {
	database := db.GetDB()

	shipmentFromDB := models.Shipment{ID: id}
	// res := database.Preload("Sender").Preload("Receiver").Find(&shipmentFromDB)
	res := database.Preload("DeliveryType." + clause.Associations).Preload("Sender." + clause.Associations).Preload("Receiver." + clause.Associations).Find(&shipmentFromDB)
	if res.Error != nil {
		return nil, res.Error
	}
	if res.RowsAffected < 1 {
		return nil, l_custom_errors.ErrShipmentNotFound
	}

	return &shipmentFromDB, nil
}

func GetShipmentItemFromDB(id int) (*models.ShipmentItem, error) {
	database := db.GetDB()

	shipmentItemFromDB := models.ShipmentItem{ID: id}
	// res := database.Preload("Sender").Preload("Receiver").Find(&shipmentFromDB)
	res := database.Preload("CountryCode").Find(&shipmentItemFromDB)
	if res.Error != nil {
		return nil, res.Error
	}
	if res.RowsAffected < 1 {
		return nil, l_custom_errors.ErrShipmentItemNotFound
	}

	return &shipmentItemFromDB, nil
}

func GetDeliveryTypeID(deliveryTypeName string) (int, error) {
	database := db.GetDB()

	fmt.Println(deliveryTypeName)
	deliveryType := models.DeliveryType{Name: deliveryTypeName}
	res := database.Model(&models.DeliveryType{}).Where("name = ?", deliveryTypeName).Find(&deliveryType)
	if res.Error != nil {
		return 0, res.Error
	}
	if res.RowsAffected < 1 {
		return 0, l_custom_errors.ErrDeliveryTypeNotFound
	}

	return deliveryType.ID, nil
}

func CreateTRC() (string, error) {
	number, err := rand.Int(rand.Reader, big.NewInt(1_000_000))
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	return "TRC" + strconv.Itoa(int(number.Int64())), nil
}

func UpdateShipmentPrice(shipmentId int) (int, int, error) {
	database := db.GetDB()

	shipment, err := GetShipmentFromDB(shipmentId)
	if err != nil {
		return 0, 0, err
	}

	price := struct {
		TRY int
		USD int
	}{}

	database.Model(&models.ShipmentItem{}).Select("sum(total_price_try) as try, sum(total_price_usd) as usd").Where("shipment_id = ?", shipmentId).Find(&price)

	fmt.Println(price)

	shipment.PriceUSD = price.USD
	shipment.PriceTRY = price.TRY

	res := database.Save(shipment)
	if res.Error != nil {
		return 0, 0, res.Error
	}

	return price.TRY, price.USD, nil
}
