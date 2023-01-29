package models

import "gorm.io/gorm"

type Shipment struct {
	gorm.Model
	ID int `gorm:"type:BIGINT" json:"id"`

	Trc            string       `json:"trc"`
	DeliveryTypeId int          `gorm:"type:BIGINT"`
	DeliveryType   DeliveryType `json:"delivery-type"`

	PriceUSD int `json:"price-USD"`
	PriceTL  int `json:"price-TL"`

	SenderID   int      `gorm:"type:BIGINT" json:"-"`
	Sender     Sender   `json:"sender" validate:"required"`
	ReceiverID int      `gorm:"type:BIGINT" json:"-"`
	Receiver   Receiver `json:"receiver" validate:"required"`
}

func (s *Shipment) Serialize() *SerializedShipment {
	return &SerializedShipment{
		ID:           s.ID,
		Trc:          s.Trc,
		DeliveryType: s.DeliveryType,
		PriceUSD:     float64(s.PriceUSD) / 100,
		PriceTL:      float64(s.PriceTL) / 100,
		Sender:       s.Sender,
		Receiver:     s.Receiver,
	}
}

type SerializedShipment struct {
	ID           int          `json:"id"`
	Trc          string       `json:"trc"`
	DeliveryType DeliveryType `json:"delivery-type"`
	PriceUSD     float64      `json:"price-USD"`
	PriceTL      float64      `json:"price-TL"`
	Sender       Sender       `json:"sender"`
	Receiver     Receiver     `json:"receiver"`
}
