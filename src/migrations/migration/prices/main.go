package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"

	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func main() {
	database := db.GetDB()
	database.Migrator().DropTable("prices")
	database.Migrator().DropTable("weights")
	database.Migrator().DropTable("`price_over_max_weights`")
	database.Migrator().AutoMigrate(&models.Price{})
	database.Migrator().AutoMigrate(&models.Weight{})
	database.Migrator().AutoMigrate(&models.PriceOverMaxWeight{})

	MigrateWeights()
	//Global regions
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/prices-for-documents.csv", "documents", 1)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/prices-for-standart-packages.csv", "standart", 1)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/prices-for-b2b.csv", "B2B", 1)

	//Russia
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/russia/prices-documents-russia.csv", "documents", 15)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/russia/prices-standart-russia.csv", "standart", 15)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/russia/russia-b2b.csv", "B2B", 15)

	AddPricesOverMaxWeights("/home/alexkalak/Desktop/pony_express/csvtables/russia/russia-documents-over-price.csv", "documents", 15)
	AddPricesOverMaxWeights("/home/alexkalak/Desktop/pony_express/csvtables/russia/russia-standart-packages-over-price.csv", "standart", 15)

	//Moldova
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/moldova/moldova-documents.csv", "documents", 18)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/moldova/moldova-standart-packages.csv", "standart", 18)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/moldova/moldova-b2b.csv", "B2B", 18)

	AddPricesOverMaxWeights("/home/alexkalak/Desktop/pony_express/csvtables/moldova/moldova-documents-over-price.csv", "documents", 15)

	//Ukraine
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/ukraine/ukraine-standart-packages.csv", "standart", 22)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/ukraine/ukraine-documents.csv", "documents", 22)
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/ukraine/ukraine-b2b.csv", "B2B", 22)

	AddPricesOverMaxWeights("/home/alexkalak/Desktop/pony_express/csvtables/ukraine/ukraine-standart-packages-over-price.csv", "standart", 22)
	AddPricesOverMaxWeights("/home/alexkalak/Desktop/pony_express/csvtables/ukraine/ukraine-b2b-over-price.csv", "B2B", 22)

}

func AddPrices(path string, packageType string, startRegionIndex int) {
	database := db.GetDB()

	var packageTypeFromDB models.PackageType
	database.Model(&models.PackageType{}).Where("name = ?", packageType).Find(&packageTypeFromDB)

	records := ReadCSV(path)

	for _, record := range records {
		record[0] = strings.Replace(record[0], ",", ".", -1)
		weight, _ := strconv.ParseFloat(record[0], 64)

		var weightFromDB models.Weight
		database.Model(&models.Weight{}).Where("weight = ?", weight).Find(&weightFromDB)

		for i := 1; i < len(record); i++ {

			regID := i + startRegionIndex - 1
			var region models.Region
			database.Model(&models.Region{}).Where("id = ?", regID).Find(&region)

			record[i] = strings.Replace(record[i], ",", ".", -1)
			price, err := strconv.ParseFloat(record[i], 64)
			if err != nil {
				fmt.Println(err)
			}

			priceEntity := models.Price{
				WeightID:      weightFromDB.ID,
				PackageTypeID: packageTypeFromDB.ID,
				RegionID:      region.ID,
				Price:         int(math.Round(price * 100)),
			}

			str, _ := json.MarshalIndent(priceEntity, "", "\t")
			fmt.Println(string(str))

			exists := isPriceInDB(priceEntity.WeightID, priceEntity.PackageTypeID, priceEntity.RegionID)
			if exists {
				continue
			}

			database.Create(&priceEntity)
		}
	}
}

func AddPricesOverMaxWeights(path string, packageType string, startRegionIndex int) {
	database := db.GetDB()

	var packageTypeFromDB models.PackageType
	database.Model(&models.PackageType{}).Where("name = ?", packageType).Find(&packageTypeFromDB)

	records := ReadCSV(path)

	for _, record := range records {
		record[0] = strings.Replace(record[0], ",", ".", -1)
		weight, err := strconv.ParseFloat(record[0], 64)
		if err != nil {
			panic(err)
		}
		var weightFromDB models.Weight
		database.Model(&models.Weight{}).Where("weight = ?", weight).Find(&weightFromDB)
		fmt.Println("Weight: ", weight)
		fmt.Println("Record: ", record[0])
		fmt.Println("WeightFromDB: ", weightFromDB)

		for i := 1; i < len(record); i++ {

			regID := i + startRegionIndex - 1
			var region models.Region
			database.Model(&models.Region{}).Where("id = ?", regID).Find(&region)

			record[i] = strings.Replace(record[i], ",", ".", -1)
			price, err := strconv.ParseFloat(record[i], 64)
			if err != nil {
				fmt.Println(err)
			}

			priceEntity := models.PriceOverMaxWeight{
				WeightID:      weightFromDB.ID,
				PackageTypeID: packageTypeFromDB.ID,
				RegionID:      region.ID,
				Price:         int(math.Round(price * 100)),
			}

			str, _ := json.MarshalIndent(priceEntity, "", "\t")
			fmt.Println(string(str))

			exists := isOverPriceInDB(priceEntity.WeightID, priceEntity.PackageTypeID, priceEntity.RegionID)
			if exists {
				continue
			}

			database.Create(&priceEntity)
		}
	}
}

func isPriceInDB(weightID int, PackageTypeID int, regionID int) bool {
	database := db.GetDB()

	var price models.Price
	database.Model(&models.Price{}).Where("weight_id = ? AND package_type_id = ? AND region_id = ?", weightID, PackageTypeID, regionID).Find(&price)

	return price.ID != 0
}

func isOverPriceInDB(weightID int, PackageTypeID int, regionID int) bool {
	database := db.GetDB()

	var overPrice models.PriceOverMaxWeight
	database.Model(&models.PriceOverMaxWeight{}).Where("weight_id = ? AND package_type_id = ? AND region_id = ?", weightID, PackageTypeID, regionID).Find(&overPrice)

	return overPrice.ID != 0
}

func MigrateWeights() {
	database := db.GetDB()
	for i := 0; i < 80; i++ {
		weight := models.Weight{
			Weight: float64(i)/4 + 0.25,
		}
		database.Save(&weight)
	}
}

func ReadCSV(path string) [][]string {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	csvReader := csv.NewReader(file)
	records, err := csvReader.ReadAll()
	if err != nil {
		panic(err)
	}

	fmt.Println(records)
	return records
}
