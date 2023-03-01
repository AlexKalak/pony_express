package db

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/alexkalak/pony_express/src/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var database *gorm.DB

func Init() *gorm.DB {
	dbUser := os.Getenv("DB_USR")
	dbPass := os.Getenv("DB_PASS")
	dbServ := os.Getenv("DB_SERV")

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/pony_express_dev?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPass, dbServ)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(
		&models.ProductType{},
		&models.CountryCode{},
		&models.Country{},
		&models.City{},
		&models.Receiver{},
		&models.Sender{},
		&models.Shipment{},
		&models.ShipmentItem{},
		&models.ShipmentEvent{},
		&models.DeliveryType{},
		&models.Region{},
		&models.PackageType{},
		&models.Weight{},
		&models.Price{},
		&models.PriceOverMaxWeight{},
		&models.SenderCity{},
		&models.SenderRegion{},
	)
	return db
}

func GetDB() *gorm.DB {
	if database == nil {
		database = Init()
		for database == nil {
			var sleep = time.Second
			sleep = sleep * 2
			fmt.Printf("database id unvaliable. Wait for %s seconds \n", sleep.String())

			time.Sleep(sleep)
		}
	}
	return database
}
