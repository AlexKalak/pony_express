package models

import "gorm.io/gorm"

type ShipmentEvent struct {
	gorm.Model
	ID int `gorm:"type:BIGINT" json:"id"`

	ShipmentID int `json:"-"`

	SenderCityID   int `gorm:"type:BIGINT" json:"-"`
	SenderCity     City
	ReceiverCityID int `gorm:"type:BIGINT" json:"-"`
	ReceiverCity   City
	Place          string `gorm:"type:VARCHAR(1000) NOT NULL" json:"place" validate:"min=5,max=1000"`
	Event          string `gorm:"type: VARCHAR(1000) NOT NULL" json:"event" validate:"min=5,max=1000"`
}

func (s *ShipmentEvent) Serialize() SerializedShipmentEvent {
	return SerializedShipmentEvent{
		CreatedTime:  s.CreatedAt.Format("2006-01-02 15:04"),
		SenderCity:   s.SenderCity.Name,
		ReceiverCity: s.ReceiverCity.Name,
		Place:        s.Place,
		Event:        s.Event,
	}
}

type SerializedShipmentEvent struct {
	CreatedTime string `json:"created-time"`

	SenderCity   string `json:"sender-city"`
	ReceiverCity string `json:"receiver-city"`

	Place string `gorm:"type:VARCHAR(1000) NOT NULL" json:"place" validate:"min=5,max=1000"`
	Event string `gorm:"type: VARCHAR(1000) NOT NULL" json:"event" validate:"min=5,max=1000"`
}

func (s *SerializedShipmentEvent) Deserialize() ShipmentEvent {
	shipmentEvent := ShipmentEvent{
		Place: s.Place,
		Event: s.Event,
	}
	shipmentEvent.SenderCity.Name = s.SenderCity
	shipmentEvent.ReceiverCity.Name = s.ReceiverCity

	return shipmentEvent
}
