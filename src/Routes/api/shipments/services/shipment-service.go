package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"

	l_custom_errors "github.com/alexkalak/pony_express/src/Routes/api/shipments/errors"
	"github.com/alexkalak/pony_express/src/Routes/validation"
	currencyhelper "github.com/alexkalak/pony_express/src/currencyHelper"
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
	"github.com/alexkalak/pony_express/src/types"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm/clause"
)

type ShipmentsService interface {
	GetAllShipments(c *fiber.Ctx) (*[]models.Shipment, error)
	GetShipmentById(c *fiber.Ctx) (*models.Shipment, error)
	CreateShipment(c *fiber.Ctx) (*models.Shipment, []*types.ErrorResponse, error)
	UpdateShipment(c *fiber.Ctx) (*models.Shipment, []*types.ErrorResponse, error)

	GetShipmentItems(c *fiber.Ctx) (*[]models.ShipmentItem, error)
	CreateShipmentItem(c *fiber.Ctx) (*models.ShipmentItem, []*types.ErrorResponse, error)
	UpdateShipmentItem(c *fiber.Ctx) (*models.ShipmentItem, []*types.ErrorResponse, error)
}

type shipmentsService struct {
}

func New() ShipmentsService {
	return &shipmentsService{}
}

func (t *shipmentsService) GetAllShipments(c *fiber.Ctx) (*[]models.Shipment, error) {
	database := db.GetDB()

	shipments := []models.Shipment{}
	res := database.Preload("DeliveryType." + clause.Associations).Preload("Sender." + clause.Associations).Preload("Receiver." + clause.Associations).Find(&shipments)
	if res.Error != nil {
		return nil, res.Error
	}

	if res.RowsAffected < 1 {
		return nil, l_custom_errors.ErrShipmentNotFound
	}
	//Printing in console shipment struct
	str, _ := json.MarshalIndent(shipments, "", "\t")
	fmt.Println(string(str))

	return &shipments, nil
}

func (t *shipmentsService) GetShipmentById(c *fiber.Ctx) (*models.Shipment, error) {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return nil, err
	}

	shipment, err := GetShipmentFromDB(id)
	if err != nil {
		return nil, err
	}
	//Printing in console shipment struct
	str, _ := json.MarshalIndent(shipment, "", "\t")
	fmt.Println(string(str))

	return shipment, nil
}
func (t *shipmentsService) CreateShipment(c *fiber.Ctx) (*models.Shipment, []*types.ErrorResponse, error) {
	database := db.GetDB()

	var NewShipment models.Shipment

	//Parsing Sender
	err := c.BodyParser(&NewShipment)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	validationErros := validation.Validate(&NewShipment)
	if len(validationErros) > 0 {
		return nil, validationErros, nil
	}

	NewShipment.Trc, err = CreateTRC()
	if err != nil {
		return nil, nil, err
	}
	NewShipment.DeliveryType.ID, err = GetDeliveryTypeName(NewShipment.DeliveryType.Name)
	if err != nil {
		if errors.Is(err, l_custom_errors.ErrDeliveryTypeNotFound) {
			valError := types.ErrorResponse{
				FailedField: "DeliveryType.Name",
				Tag:         "Not found",
				Value:       "",
			}

			validationErros = append(validationErros, &valError)
			return nil, validationErros, nil
		}

		return nil, nil, err
	}

	NewShipment.Receiver.Country.ID, err = GetCountryId(NewShipment.Receiver.Country.Name)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}
	NewShipment.Sender.Country.ID, err = GetCountryId(NewShipment.Sender.Country.Name)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}
	NewShipment.Receiver.City.ID, err = GetCityId(NewShipment.Receiver.City.Name)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}
	NewShipment.Sender.City.ID, err = GetCityId(NewShipment.Sender.City.Name)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	NewShipment.PriceUSD = 0
	NewShipment.PriceTL = 0

	res := database.Create(&NewShipment)
	if res.Error != nil {
		fmt.Println(err)
		return nil, nil, res.Error
	}

	if res.RowsAffected < 1 {
		fmt.Println(err)
		return nil, nil, res.Error
	}

	return &NewShipment, nil, nil
}

func (t *shipmentsService) UpdateShipment(c *fiber.Ctx) (*models.Shipment, []*types.ErrorResponse, error) {
	database := db.GetDB()

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return nil, nil, err
	}

	NewShipment, err := GetShipmentFromDB(id)
	if err != nil {
		return nil, nil, err
	}

	//Parsing Sender
	err = c.BodyParser(&NewShipment)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	validationErros := validation.Validate(NewShipment)
	if len(validationErros) > 0 {
		return nil, validationErros, nil
	}

	Sender := &NewShipment.Sender
	Receiver := &NewShipment.Receiver

	//Saving sender
	res := database.Save(&Sender)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	//Saving receiver
	res = database.Save(&Receiver)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	return NewShipment, nil, nil
}

func (t *shipmentsService) GetShipmentItems(c *fiber.Ctx) (*[]models.ShipmentItem, error) {
	database := db.GetDB()

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return nil, err
	}

	fmt.Println(id)

	shipmentItems := []models.ShipmentItem{}
	res := database.Preload("CountryCode").Where("shipment_id = ?", id).Find(&shipmentItems)
	if res.Error != nil {
		fmt.Println("RES error")
		fmt.Println(res.Error)
		return nil, res.Error
	}

	if res.RowsAffected < 1 {
		fmt.Println("No rows affected")
		return nil, l_custom_errors.ErrShipmentNotFound
	}
	//Printing in console shipment struct
	// str, _ := json.MarshalIndent(shipmentItems, "", "\t")
	// fmt.Println(string(str))

	return &shipmentItems, nil
}

func (t *shipmentsService) CreateShipmentItem(c *fiber.Ctx) (*models.ShipmentItem, []*types.ErrorResponse, error) {
	database := db.GetDB()

	shipmentId, err := strconv.Atoi(c.Params("shipmentId"))
	if err != nil {
		return nil, nil, err
	}

	var NewShipmentItem models.ShipmentItem

	//Parsing Sender
	err = c.BodyParser(&NewShipmentItem)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	validationErros := validation.Validate(&NewShipmentItem)
	if len(validationErros) > 0 {
		return nil, validationErros, nil
	}

	countryCodeId, err := GetCoutryCodeId(NewShipmentItem.CountryCode.Code)
	if err != nil {
		return nil, nil, err
	}

	NewShipmentItem.ShipmentID = shipmentId
	NewShipmentItem.CountryCode.ID = countryCodeId

	NewShipmentItem.ValueForOne *= 100
	NewShipmentItem.TotalPriceTL = NewShipmentItem.ValueForOne * NewShipmentItem.Count
	NewShipmentItem.TotalPriceUSD = currencyhelper.ConvertTRYtoUSD(NewShipmentItem.TotalPriceTL)

	res := database.Create(&NewShipmentItem)
	if res.Error != nil {
		fmt.Println(err)
		return nil, nil, res.Error
	}

	if res.RowsAffected < 1 {
		fmt.Println(err)
		return nil, nil, res.Error
	}

	_, _, err = UpdateShipmentPrice(shipmentId)
	if err != nil {
		return nil, nil, err
	}

	return &NewShipmentItem, nil, nil
}

func (t *shipmentsService) UpdateShipmentItem(c *fiber.Ctx) (*models.ShipmentItem, []*types.ErrorResponse, error) {
	database := db.GetDB()

	shipmentItemId, err := strconv.Atoi(c.Params("shipmentItemId"))
	if err != nil {
		return nil, nil, err
	}

	// shipmentId, err := strconv.Atoi(c.Params("shipmentId"))
	// if err != nil {
	// 	return nil, nil, err
	// }

	ShipmentItem, err := GetShipmentItemFromDB(shipmentItemId)
	if err != nil {
		return nil, nil, err
	}
	fmt.Printf("Shipment: %#v", ShipmentItem)

	c.BodyParser(ShipmentItem)

	validationErros := validation.Validate(ShipmentItem)
	if len(validationErros) > 0 {
		return nil, validationErros, nil
	}

	res := database.Save(ShipmentItem)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	return ShipmentItem, nil, nil
}
