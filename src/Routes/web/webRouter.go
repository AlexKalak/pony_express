package web

import (
	"github.com/gofiber/fiber/v2"
)

func WebRouter(router fiber.Router) {
	router.Get("/shipments", func(c *fiber.Ctx) error {
		return c.Render("dist/templates/tablepage.html", fiber.Map{})
	})
	router.Get("/shipments/:id<int>", func(c *fiber.Ctx) error {
		return c.Render("dist/templates/index.html", fiber.Map{})
	})
}
