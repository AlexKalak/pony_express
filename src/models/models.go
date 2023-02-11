package models

type ProductType struct {
	// gorm.Model
	ID int `json:"id"`

	EnName   string  `gorm:"type:VARCHAR(255) NOT NULL" json:"en-name" validate:"required,min=2,max=30"`
	RoName   string  `gorm:"type:VARCHAR(255) NOT NULL" json:"ro-name" validate:"required,min=2,max=30"`
	TrName   string  `gorm:"type:VARCHAR(255) NOT NULL" json:"tr-name" validate:"required,min=2,max=30"`
	GtipCode string  `gorm:"type:BIGINT NOT NULL" json:"gtip-code" validate:"required,min=4,numeric"`
	ItemCode string  `gorm:"type:BIGINT NOT NULL" json:"item-code" validate:"required,numeric"`
	Weight   float32 `gorm:"type:DECIMAL(5,2) NOT NULL" json:"weight" validate:"lte=1000,gt=0"`
	Warning  bool    `gorm:"type:bool NOT NULL" json:"warning" validate:"boolean"`
}

type CountryCode struct {
	// gorm.Model
	ID   int    `gorm:"type:BIGINT NOT NULL" json:"-"`
	Code string `gorm:"type:VARCHAR(3) NOT NULL" json:"code"`
}

type Country struct {
	ID            int         `gorm:"type:BIGINT" json:"-"`
	Name          string      `gorm:"type:VARCHAR(255) NOT NULL" json:"name"`
	CountryCodeID int         `gorm:"type:BIGINT NOT NULL" json:"-"`
	CountryCode   CountryCode `json:"-"`
}

type City struct {
	ID        int     `gorm:"type:BIGINT" json:"-"`
	Name      string  `gorm:"type:VARCHAR(255) NOT NULL" json:"name"`
	CountryID int     `gorm:"type:BIGINT NOT NULL" json:"-"`
	Country   Country `json:"-"`
}

type DeliveryType struct {
	ID   int    `gorm:"type:BIGINT" json:"-"`
	Name string `json:"name" validate:"required,min=3"`
}

type Sender struct {
	ID            int     `gorm:"type:BIGINT" json:"-"`
	FullName      string  `gorm:"type:VARCHAR(255) NOT NULL" json:"full-name" validate:"required,min=10,only-letters-and-spaces"`
	FullAddress   string  `gorm:"type:VARCHAR(255) NOT NULL" json:"full-address" validate:"required"`
	PhoneNumber   string  `gorm:"type:VARCHAR(255) NOT NULL" json:"phone-number" validate:"required"`
	Email         string  `gorm:"type:VARCHAR(255) NOT NULL" json:"email" validate:"required,email"`
	ReceiveOffice string  `gorm:"type:VARCHAR(255) NOT NULL" json:"receive-office" validate:"required"`
	IkametID      string  `gorm:"type:VARCHAR(20) NOT NULL" json:"ikamet-id" validate:"required,numeric"`
	CountryID     int     `gorm:"type:BIGINT" json:"-"`
	Country       Country `json:"country" validate:"required"`
	CityID        int     `gorm:"type:BIGINT" json:"-"`
	City          City    `json:"city" validate:"required,number"`
}

type Receiver struct {
	ID          int     `gorm:"type:BIGINT" json:"-"`
	Company     string  `gorm:"type:VARCHAR(255) NOT NULL" json:"company" validate:"required,min=10"`
	FullName    string  `gorm:"type:VARCHAR(255) NOT NULL" json:"full-name" validate:"required,min=10,only-letters-and-spaces"`
	FullAddress string  `gorm:"type:VARCHAR(255) NOT NULL" json:"full-address" validate:"required"`
	PhoneNumber string  `gorm:"type:VARCHAR(255) NOT NULL" json:"phone-number" validate:"required"`
	Email       string  `gorm:"type:VARCHAR(255) NOT NULL" json:"email" validate:"required,email"`
	Description string  `gorm:"type:TEXT NOT NULL" json:"description"`
	CountryID   int     `gorm:"type:BIGINT" json:"-"`
	Country     Country `json:"country" validate:"required"`
	CityID      int     `gorm:"type:BIGINT" json:"-"`
	City        City    `json:"city" validate:"required"`
}