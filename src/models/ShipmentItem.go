package models

import "gorm.io/gorm"

type ShipmentItem struct {
	gorm.Model
	ID int `gorm:"type:BIGINT" json:"id"`

	ShipmentID int `json:"-"`

	EnName      string  `gorm:"type:VARCHAR(255) NOT NULL" json:"en-name" validate:"required,min=2,max=30"`
	RoName      string  `gorm:"type:VARCHAR(255) NOT NULL" json:"ro-name" validate:"required,min=2,max=30"`
	TrName      string  `gorm:"type:VARCHAR(255) NOT NULL" json:"tr-name" validate:"required,min=2,max=30"`
	GtipCode    int     `gorm:"type:BIGINT NOT NULL" json:"gtip-code" validate:"required,min=4,numeric"`
	ItemCode    int     `gorm:"type:BIGINT NOT NULL" json:"item-code" validate:"required,numeric"`
	Weight      float32 `gorm:"type:DECIMAL(5,2) NOT NULL" json:"weight" validate:"lte=1000,gt=0"`
	Link        string  `gorm:"type:VARCHAR(255) NOT NULL" json:"link" validate:"required,min=15,max=1500"`
	ValueForOne int     `gorm:"type:INT NOT NULL" json:"value-for-one" validate:"required,numeric"`
	Count       int     `gorm:"type:INT NOT NULL" json:"count" validate:"required,gte=1"`
	Warning     bool    `gorm:"type:bool NOT NULL" json:"warning" validate:"boolean"`

	TotalPriceTL  int `json:"total-price-TL"`
	TotalPriceUSD int `json:"total-price-USD"`

	CountryCodeID int         `json:"-"`
	CountryCode   CountryCode `json:"country-code"`
}

func (s *ShipmentItem) Serialize() *SerializedShipmentItem {
	return &SerializedShipmentItem{
		ID:            s.ID,
		ShipmentID:    s.ShipmentID,
		EnName:        s.EnName,
		RoName:        s.RoName,
		TrName:        s.TrName,
		GtipCode:      s.GtipCode,
		ItemCode:      s.ItemCode,
		Weight:        s.Weight,
		Link:          s.Link,
		ValueForOne:   float64(s.ValueForOne) / 100,
		Count:         s.Count,
		Warning:       s.Warning,
		TotalPriceTL:  float64(s.TotalPriceTL) / 100,
		TotalPriceUSD: float64(s.TotalPriceUSD) / 100,
		CountryCode:   s.CountryCode,
	}
}

type SerializedShipmentItem struct {
	gorm.Model
	ID int `gorm:"type:BIGINT" json:"id"`

	ShipmentID int `json:"-"`

	EnName      string  `json:"en-name"`
	RoName      string  `json:"ro-name"`
	TrName      string  `json:"tr-name"`
	GtipCode    int     `json:"gtip-code"`
	ItemCode    int     `json:"item-code"`
	Weight      float32 `json:"weight"`
	Link        string  `json:"link"`
	ValueForOne float64 `json:"value-for-one"`
	Count       int     `json:"count"`
	Warning     bool    `json:"warning"`

	TotalPriceTL  float64 `json:"total-price-TL"`
	TotalPriceUSD float64 `json:"total-price-USD"`

	CountryCode CountryCode `json:"country-code"`
}
