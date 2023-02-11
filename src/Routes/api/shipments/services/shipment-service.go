package services

import (
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
	// str, _ := json.MarshalIndent(shipments, "", "\t")
	// fmt.Println(string(str))

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
	// str, _ := json.MarshalIndent(shipment, "", "\t")
	// fmt.Println(string(str))

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
	NewShipment.PriceTRY = 0

	res := database.Create(&NewShipment)
	if res.Error != nil {
		fmt.Println(err)
		return nil, nil, res.Error
	}

	if res.RowsAffected < 1 {
		return nil, nil, errors.New("error no rows affected")
	}

	return &NewShipment, nil, nil
}

func (t *shipmentsService) UpdateShipment(c *fiber.Ctx) (*models.Shipment, []*types.ErrorResponse, error) {
	database := db.GetDB()

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return nil, nil, err
	}

	p_Shipment, err := GetShipmentFromDB(id)

	if err != nil {
		return nil, nil, err
	}

	//Parsing Sender

	err = c.BodyParser(p_Shipment)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	// str, _ := json.MarshalIndent(p_Shipment, "", "\t")
	// fmt.Println(string(str))

	validationErros := validation.Validate(p_Shipment)
	if len(validationErros) > 0 {
		return nil, validationErros, nil
	}

	p_Shipment.DeliveryType.ID, err = GetDeliveryTypeName(p_Shipment.DeliveryType.Name)
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

	Sender := p_Shipment.Sender
	Receiver := p_Shipment.Receiver

	// str, _ := json.MarshalIndent(p_Shipment, "", "\t")
	// fmt.Println(string(str))

	res := database.Save(&p_Shipment)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	// Saving sender
	res = database.Save(&Sender)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	//Saving receiver
	res = database.Save(&Receiver)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	return p_Shipment, nil, nil
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

	var NewShipmentItemInput models.SerializedShipmentItem

	err = c.BodyParser(&NewShipmentItemInput)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	p_NewShipmentItem := NewShipmentItemInput.Deserialize()

	validationErros := validation.Validate(&NewShipmentItemInput)
	if len(validationErros) > 0 {
		return nil, validationErros, nil
	}

	countryCodeId, err := GetCoutryCodeId(NewShipmentItemInput.CountryCode.Code)
	if err != nil {
		return nil, nil, err
	}

	//Deserializing input in ShipmentInput

	p_NewShipmentItem.ShipmentID = shipmentId
	p_NewShipmentItem.CountryCode.ID = countryCodeId

	p_NewShipmentItem.TotalPriceTRY = p_NewShipmentItem.ValueForOne * p_NewShipmentItem.Count
	p_NewShipmentItem.TotalPriceUSD = currencyhelper.ConvertTRYtoUSD(p_NewShipmentItem.TotalPriceTRY)

	res := database.Create(p_NewShipmentItem)
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

	return p_NewShipmentItem, nil, nil
}

func (t *shipmentsService) UpdateShipmentItem(c *fiber.Ctx) (*models.ShipmentItem, []*types.ErrorResponse, error) {
	database := db.GetDB()

	shipmentId, err := strconv.Atoi(c.Params("shipmentId"))
	if err != nil {
		return nil, nil, err
	}

	shipmentItemId, err := strconv.Atoi(c.Params("shipmentItemId"))
	if err != nil {
		return nil, nil, err
	}

	p_ShipmentItem, err := GetShipmentItemFromDB(shipmentItemId)
	if err != nil {
		return nil, nil, err
	}

	p_SerializedShipmentItem := p_ShipmentItem.Serialize()

	err = c.BodyParser(p_SerializedShipmentItem)
	if err != nil {
		return nil, nil, err
	}

	validationErros := validation.Validate(p_SerializedShipmentItem)
	if len(validationErros) > 0 {
		return nil, validationErros, nil
	}

	p_ShipmentItem = p_SerializedShipmentItem.Deserialize()

	countryCodeId, err := GetCoutryCodeId(p_SerializedShipmentItem.CountryCode.Code)
	if err != nil {
		return nil, nil, err
	}

	//Deserializing input in ShipmentInput
	p_ShipmentItem.ShipmentID = shipmentId
	p_ShipmentItem.CountryCode.ID = countryCodeId

	p_ShipmentItem.TotalPriceTRY = p_ShipmentItem.ValueForOne * p_ShipmentItem.Count
	p_ShipmentItem.TotalPriceUSD = currencyhelper.ConvertTRYtoUSD(p_ShipmentItem.TotalPriceTRY)

	res := database.Save(p_ShipmentItem)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	return p_ShipmentItem, nil, nil
}
