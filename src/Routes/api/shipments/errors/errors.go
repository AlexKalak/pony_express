package custom_errors

import "errors"

var ErrShipmentNotFound = errors.New("shipment not found")
var ErrShipmentItemNotFound = errors.New("shipment not found")
var ErrDeliveryTypeNotFound = errors.New("delivery type not found")
