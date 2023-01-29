import { AddValidationForInput, HasOnlyDigitsAndSpacesValidator, HasOnlyLettersAndSpacesValidator, IsEmailValidator, LengthValidator, NotEmptyValidator, validate } from "../../validation"

const EditShipmentInputs = {
    "sender-name": {
        selector: "#edit-shipment-sender-name-input",
    },
    "sender-address": {
        selector: "#edit-shipment-sender-address-input",
    },
    "sender-phone-number": {
        selector: "#edit-shipment-sender-phone-number",
    },
    "sender-email": {
        selector: "#edit-shipment-sender-email",
    },
    "sender-country": {
        selector: "#edit-shipment-sender-country",
    },
    "sender-city": {
        selector: "#edit-shipment-sender-city",
    },
    "sender-receiving-office": {
        selector: "#edit-shipment-receiving-office",
    },
    "sender-ikamet-id": {
        selector: "#edit-shipment-ikamet-id",
    },
    "receiver-company": {
        selector: "#edit-shipment-receiver-company",
    },
    "receiver-name": {
        selector: "#edit-shipment-receiver-name",
    },
    "receiver-address": {
        selector: "#edit-shipment-receiver-address",
    },
    "receiver-phone-number": {
        selector: "#edit-shipment-receiver-phone-number",
    },
    "receiver-email": {
        selector: "#edit-shipment-receiver-email",
    },
    "receiver-country": {
        selector: "#edit-shipment-receiver-country",
    },
    "receiver-city": {
        selector: "#edit-shipment-receiver-city",
    },
    "description": {
        selector: "#edit-shipment-description",
    },
}

export const getValidationResults = () => {
    return validate(EditShipmentInputs)
}

export function addValidations() {
    //Sender-Name
    AddValidationForInput(EditShipmentInputs["sender-name"], 
        [
            LengthValidator.bind(EditShipmentInputs["sender-name"], 10, Infinity),
            HasOnlyLettersAndSpacesValidator.bind(EditShipmentInputs["sender-name"])    
        ]
    )
    //Sender-Address
    AddValidationForInput(EditShipmentInputs["sender-address"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["sender-address"])
        ]
    )
    //Sender-Phone number
    AddValidationForInput(EditShipmentInputs["sender-phone-number"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["sender-phone-number"])
        ]
    )
    //Sender-Email
    AddValidationForInput(EditShipmentInputs["sender-email"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["sender-email"]),
            IsEmailValidator.bind(EditShipmentInputs["sender-email"])
        ]
    )
    //Sender-Country
    AddValidationForInput(EditShipmentInputs["sender-country"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["sender-country"])
        ]
    )
    //Sender-city
    AddValidationForInput(EditShipmentInputs["sender-city"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["sender-city"])
        ]
    )
    //Sender-Receiving office
    AddValidationForInput(EditShipmentInputs["sender-receiving-office"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["sender-receiving-office"])
        ]
    )
    //Sender-Ikamet id        
    AddValidationForInput(EditShipmentInputs["sender-ikamet-id"], 
        [
            LengthValidator.bind(EditShipmentInputs["sender-ikamet-id"], 13, 17),
            HasOnlyDigitsAndSpacesValidator.bind(EditShipmentInputs["sender-ikamet-id"])
        ]
    )

    //RECEIVER

    //Receiver-Company
    AddValidationForInput(EditShipmentInputs["receiver-company"], 
        [
            LengthValidator.bind(EditShipmentInputs["sender-name"], 10, Infinity),
        ]
    )
    //Receiver-Name
    AddValidationForInput(EditShipmentInputs["receiver-name"], 
        [
            LengthValidator.bind(EditShipmentInputs["receiver-name"], 10, Infinity),
        ]
    )
    //Receiver-Address
    AddValidationForInput(EditShipmentInputs["receiver-address"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["receiver-address"]),
        ]
    )
    //Receiver-Phone Number
    AddValidationForInput(EditShipmentInputs["receiver-phone-number"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["receiver-phone-number"]),
        ]
    )
    //Receiver-Email
    AddValidationForInput(EditShipmentInputs["receiver-email"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["receiver-email"]),
            IsEmailValidator.bind(EditShipmentInputs["receiver-email"]),
        ]
    )
    //Receiver-Country
    AddValidationForInput(EditShipmentInputs["receiver-country"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["receiver-country"]),
        ]
    )
    //Receiver-City
    AddValidationForInput(EditShipmentInputs["receiver-city"], 
        [
            NotEmptyValidator.bind(EditShipmentInputs["receiver-city"]),
        ]
    )
}


