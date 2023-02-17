package product_types_helper

import (
	"github.com/alexkalak/pony_express/src/Routes/api/productTypes/errors"
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func GetTypeFromDb(typeId int) (*models.ProductType, error) {
	database := db.GetDB()

	productType := models.ProductType{ID: typeId}

	res := database.Find(&productType)
	if res.Error != nil {
		return nil, res.Error
	}
	if res.RowsAffected < 1 {
		return nil, errors.ErrProductTypeNotFound
	}

	return &productType, nil
}
