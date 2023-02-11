package services

import (
	"fmt"
	"strconv"

	"github.com/alexkalak/pony_express/src/Routes/api/productTypes/errors"
	"github.com/alexkalak/pony_express/src/Routes/validation"
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
	"github.com/alexkalak/pony_express/src/types"
	"github.com/gofiber/fiber/v2"
)

type TypesService interface {
	GetAllProductTypes() (*[]models.ProductType, error)
	SaveProductType(c *fiber.Ctx) (*models.ProductType, []*types.ErrorResponse, error)
	UpdateProductType(c *fiber.Ctx) (*models.ProductType, []*types.ErrorResponse, error)
	DeleteProductType(c *fiber.Ctx) (int, error)
}

type typesService struct {
}

func New() TypesService {
	return &typesService{}
}

func (t *typesService) GetAllProductTypes() (*[]models.ProductType, error) {
	database := db.GetDB()
	productTypes := []models.ProductType{}
	database.Find(&productTypes)
	return &productTypes, nil
}

func (t *typesService) SaveProductType(c *fiber.Ctx) (*models.ProductType, []*types.ErrorResponse, error) {

	database := db.GetDB()

	var NewType models.ProductType
	err := c.BodyParser(&NewType)
	if err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	fmt.Println(NewType)
	validationErrors := validation.Validate(&NewType)
	fmt.Println(validationErrors)
	if len(validationErrors) > 0 {
		return nil, validationErrors, nil
	}

	fmt.Println(validationErrors)

	res := database.Create(&NewType)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	if res.RowsAffected < 1 {
		return nil, nil, res.Error
	}

	return &NewType, nil, nil
}

func (t *typesService) UpdateProductType(c *fiber.Ctx) (*models.ProductType, []*types.ErrorResponse, error) {

	database := db.GetDB()

	typeId, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return nil, nil, err
	}

	p_TypeFromDB, err := GetTypeFromDb(typeId)
	if err != nil {
		return nil, nil, err
	}

	err = c.BodyParser(p_TypeFromDB)
	if err != nil {
		return nil, nil, err
	}

	validationErrors := validation.Validate(p_TypeFromDB)
	if len(validationErrors) > 0 {
		return nil, validationErrors, nil
	}

	res := database.Save(p_TypeFromDB)
	if res.Error != nil {
		return nil, nil, res.Error
	}

	if res.RowsAffected < 1 {
		return nil, nil, res.Error
	}

	return p_TypeFromDB, nil, nil
}

func (t *typesService) DeleteProductType(c *fiber.Ctx) (int, error) {
	database := db.GetDB()

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return 0, err
	}

	var productType = models.ProductType{ID: id}
	res := database.Delete(&productType)
	if res.Error != nil {
		return 0, res.Error
	}

	if res.RowsAffected < 1 {
		return 0, errors.ErrProductTypeNotFound
	}

	return productType.ID, nil
}
