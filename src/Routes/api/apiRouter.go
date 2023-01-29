package api

import (
	productTypesController "github.com/alexkalak/pony_express/src/Routes/api/productTypes/controllers"
	shipmentsController "github.com/alexkalak/pony_express/src/Routes/api/shipments/controllers"
	"github.com/gofiber/fiber/v2"
)

func ApiRouter(router fiber.Router) {
	router.Route("/product-types", productTypesController.ProductTypesController)
	router.Route("/shipments", shipmentsController.ShipmentController)
}
