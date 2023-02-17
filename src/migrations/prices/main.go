package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/alexkalak/pony_express/src/db"
	"github.com/alexkalak/pony_express/src/models"
)

func main() {
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/prices-for-documents.csv", "documents")
	AddPrices("/home/alexkalak/Desktop/pony_express/csvtables/prices-for-standart-packages.csv", "standart")
}

func AddPrices(path string, packageType string) {
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

			var region models.Region
			database.Model(&models.Region{}).Where("id = ?", i).Find(&region)

			record[i] = strings.Replace(record[i], ",", ".", -1)
			price, err := strconv.ParseFloat(record[i], 64)
			if err != nil {
				fmt.Println(err)
			}

			priceEntity := models.Price{
				WeightID:      weightFromDB.ID,
				PackageTypeID: packageTypeFromDB.ID,
				RegionID:      region.ID,
				Price:         int(price * 100),
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

func isPriceInDB(weightID int, PackageTypeID int, regionID int) bool {
	database := db.GetDB()

	var price models.Price
	database.Model(&models.Price{}).Where("weight_id = ? AND package_type_id = ? AND region_id = ?", weightID, PackageTypeID, regionID).Find(&price)

	return price.ID != 0
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
