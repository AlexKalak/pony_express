package models

import (
	"time"

	"gorm.io/gorm"
)

type Shipment struct {
	gorm.Model
	ID int `gorm:"type:BIGINT" json:"id"`

	Trc            string       `json:"trc"`
	DeliveryTypeId int          `gorm:"type:BIGINT"`
	DeliveryType   DeliveryType `json:"delivery-type"`

	PriceUSD int `json:"price-USD"`
	PriceTRY int `json:"price-TRY"`

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
		PriceTRY:     float64(s.PriceTRY) / 100,
		CreatedTime:  s.CreatedAt,
		UpdatedTime:  s.UpdatedAt,
		Sender:       s.Sender,
		Receiver:     s.Receiver,
	}
}

type SerializedShipment struct {
	ID           int          `json:"id"`
	CreatedTime  time.Time    `json:"created-time"`
	UpdatedTime  time.Time    `json:"updated-time"`
	Trc          string       `json:"trc"`
	DeliveryType DeliveryType `json:"delivery-type"`
	PriceUSD     float64      `json:"price-USD"`
	PriceTRY     float64      `json:"price-TRY"`
	Sender       Sender       `json:"sender"`
	Receiver     Receiver     `json:"receiver"`
}
