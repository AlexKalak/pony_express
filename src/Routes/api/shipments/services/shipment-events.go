package services

import (
	"strconv"

	custom_errors "github.com/alexkalak/pony_express/src/Routes/api/shipments/errors"
	"github.com/alexkalak/pony_express/src/Routes/validation"
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
	"github.com/alexkalak/pony_express/src/types"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm/clause"
)

type ShipmentEvents struct {
}

func (e *ShipmentEvents) GetAllEvents(c *fiber.Ctx) (*[]models.ShipmentEvent, error) {
	database := db.GetDB()

	shipmentID, err := strconv.Atoi(c.Params("shipmentId"))
	if err != nil {
		return nil, err
	}

	var events []models.ShipmentEvent
	res := database.Preload(clause.Associations).Find(&events, "shipment_id = ?", shipmentID)
	if res.Error != nil {
		return nil, res.Error
	}

	return &events, nil

}

func (e *ShipmentEvents) CreateEvent(c *fiber.Ctx) (*models.ShipmentEvent, []*types.ErrorResponse, error) {
	database := db.GetDB()

	shipmentID, err := strconv.Atoi(c.Params("shipmentID"))
	if err != nil {
		return nil, nil, custom_errors.ErrShipmentNotFound
	}
	shipmentFromDB, err := GetShipmentFromDB(shipmentID)
	if err != nil {
		return nil, nil, err
	}

	var newEventSerialized models.SerializedShipmentEvent
	err = c.BodyParser(&newEventSerialized)
	if err != nil {
		return nil, nil, err
	}

	newEvent := newEventSerialized.Deserialize()
	newEvent.SenderCity = shipmentFromDB.Sender.City
	newEvent.ReceiverCity = shipmentFromDB.Receiver.City
	newEvent.ShipmentID = shipmentID

	validationErrors := validation.Validate(&newEvent)
	if len(validationErrors) > 0 {
		return nil, validationErrors, nil
	}

	res := database.Create(&newEvent)
	if res.Error != nil {
		return nil, nil, err
	}
	return &newEvent, nil, nil
}
