package db

import (
	"fmt"
	"log"
	"time"

	"github.com/alexkalak/pony_express/src/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var database *gorm.DB

func Init() *gorm.DB {
	dsn := "root:root@tcp(127.0.0.1:3306)/pony_express-dev?charset=utf8mb4&parseTime=True&loc=Local"
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
		&models.DeliveryType{},
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