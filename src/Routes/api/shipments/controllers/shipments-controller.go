package controllers

import (
	"errors"
	"fmt"
	"net/http"

	l_custom_errors "github.com/alexkalak/pony_express/src/Routes/api/shipments/errors"
	"github.com/alexkalak/pony_express/src/Routes/api/shipments/services"
	"github.com/alexkalak/pony_express/src/models"
	"github.com/gofiber/fiber/v2"
)

var shipmentService = services.New()

func ShipmentController(router fiber.Router) {
	router.Get("/", GetAllShipments)
	router.Post("/", CreateShipment)
	router.Get("/:id<int>", GetShipmentById)
	router.Put("/:id<int>", UpdateShipment)

	router.Get("/:id<int>/items", GetShipmentItems)
	router.Post("/:shipmentId<int>/items", CreateShipmentItem)
	router.Put("/:shipmentId<int>/items/:shipmentItemId<int>", UpdateShipmentItem)
}

func GetAllShipments(c *fiber.Ctx) error {
	shipments, err := shipmentService.GetAllShipments(c)
	if err != nil {
		c.SendStatus(http.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"ok":    false,
			"error": "Server error",
		})
	}

	serializedShipments := make([]*models.SerializedShipment, 0, len(*shipments))

	for _, shipment := range *shipments {
		serializedShipments = append(serializedShipments, shipment.Serialize())
	}

	return c.JSON(fiber.Map{
		"ok":        true,
		"shipments": serializedShipments,
	})
}

func GetShipmentById(c *fiber.Ctx) error {
	fmt.Println("In contr")
	shipment, err := shipmentService.GetShipmentById(c)
	if err != nil {
		switch {
		case errors.Is(err, l_custom_errors.ErrShipmentNotFound):
			c.SendStatus(http.StatusNotFound)
			return c.JSON(fiber.Map{
				"ok":    false,
				"error": "Shipment not found",
			})
		default:
			c.SendStatus(http.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"ok":    false,
				"error": "Server error",
			})
		}
	}

	return c.JSON(fiber.Map{
		"ok":       true,
		"shipment": shipment.Serialize(),
	})
}

func CreateShipment(c *fiber.Ctx) error {
	shipment, validationErrors, err := shipmentService.CreateShipment(c)
	if err != nil {
		c.SendStatus(http.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"ok":    "false",
			"error": "An internal server error occured",
		})
	}

	if len(validationErrors) > 0 {
		c.SendStatus(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"ok":               "false",
			"validationErrors": validationErrors,
		})
	}

	url := fmt.Sprintf("/web/shipments/%d", shipment.ID)
	return c.Redirect(url)
}

func UpdateShipment(c *fiber.Ctx) error {
	shipment, validationErrors, err := shipmentService.UpdateShipment(c)
	if err != nil {
		c.SendStatus(http.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"ok":    "false",
			"error": "An internal server error occured",
		})
	}

	if len(validationErrors) > 0 {
		c.SendStatus(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"ok":               "false",
			"validationErrors": validationErrors,
		})
	}

	url := fmt.Sprintf("/web/shipments/%d", shipment.ID)
	return c.Redirect(url)
}

func GetShipmentItems(c *fiber.Ctx) error {
	shipmentItems, err := shipmentService.GetShipmentItems(c)
	if err != nil {
		c.SendStatus(http.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"ok":  false,
			"msg": "internal server error",
		})
	}

	serializedShipmentItems := make([]*models.SerializedShipmentItem, 0, len(*shipmentItems))

	for _, shipmentItem := range *shipmentItems {
		serializedShipmentItems = append(serializedShipmentItems, shipmentItem.Serialize())
	}

	return c.JSON(fiber.Map{
		"ok":            true,
		"shipmentItems": serializedShipmentItems,
	})
}

func CreateShipmentItem(c *fiber.Ctx) error {
	_, validationErrors, err := shipmentService.CreateShipmentItem(c)
	if err != nil {
		fmt.Println(err)
		c.SendStatus(http.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"ok":    "false",
			"error": "An internal server error occured",
		})
	}

	if len(validationErrors) > 0 {
		fmt.Println("val errors")
		c.SendStatus(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"ok":               "false",
			"validationErrors": validationErrors,
		})
	}

	return c.Redirect(c.Request().URI().String())
}

func UpdateShipmentItem(c *fiber.Ctx) error {
	fmt.Println("In controllers")
	_, validationErrors, err := shipmentService.UpdateShipmentItem(c)
	if err != nil {
		fmt.Println(err)
		c.SendStatus(http.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"ok":    "false",
			"error": "An internal server error occured",
		})
	}

	if len(validationErrors) > 0 {
		fmt.Println("val errors")
		c.SendStatus(http.StatusBadRequest)
		return c.JSON(fiber.Map{
			"ok":               "false",
			"validationErrors": validationErrors,
		})
	}

	shipmentId := c.Params("shipmentId")
	url := fmt.Sprintf("/web/shipment/%s", shipmentId)

	return c.Redirect(url)
}
