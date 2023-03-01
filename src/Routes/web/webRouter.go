package web

import (
	"github.com/gofiber/fiber/v2"
)

func WebRouter(router fiber.Router) {
	router.Get("/shipments", func(c *fiber.Ctx) error {
		return c.Render("dist/templates/tablepage.html", fiber.Map{})
	})
	router.Get("/shipments/:id<int>", func(c *fiber.Ctx) error {
		return c.Render("dist/templates/order.html", fiber.Map{})
	})
	router.Get("/types/", func(c *fiber.Ctx) error {
		return c.Render("dist/templates/typespage.html", fiber.Map{})
	})
	router.Get("/calculator/", func(c *fiber.Ctx) error {
		return c.Render("dist/templates/calculator.html", fiber.Map{})
	})
}
