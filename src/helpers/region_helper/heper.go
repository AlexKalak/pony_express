package region_helper

import (
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/errors/region_errors"
	"github.com/alexkalak/pony_express/src/models"
)

func GetRegionByID(id int) (*models.Region, error) {
	database := db.GetDB()
	var region models.Region
	res := database.First(&region, "id = ?", id)
	if res.Error != nil {
		return nil, res.Error
	}
	if res.RowsAffected < 1 {
		return nil, region_errors.ErrRegionNotFound
	}

	return &region, nil
}
