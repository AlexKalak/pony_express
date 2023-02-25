package migration

import (
	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func Migrate() {
	database := db.GetDB()
	database.Migrator().DropTable("regions")
	database.Migrator().DropTable("cities")
	database.Migrator().DropTable("delivery_places")
	database.Migrator().DropTable("countries")
	database.Migrator().DropTable("country_codes")
	database.Migrator().DropTable("districts")
	database.Migrator().AutoMigrate(
		&models.CountryCode{},
		&models.Country{},
		&models.City{},
		&models.Region{},
	)

	MigrateRegions()
	MigrateCountries()
	MigrateCities()
}
