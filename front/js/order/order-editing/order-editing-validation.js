import { AddValidationForInput, HasOnlyDigitsAndSpacesValidator, HasOnlyLettersAndSpacesValidator, IsEmailValidator, LengthValidator, NotEmptyValidator, validate } from "../../validation"
import { SELECTORS } from "./selectors"

const EditShipmentInputs = {
    "sender-name": {
        selector: SELECTORS.senderName,
    },
    "sender-address": {
        selector: SELECTORS.senderAddress,
    },
    "sender-phone-number": {
        selector: SELECTORS.senderPhoneNumber,
    },
    "sender-email": {
        selector: SELECTORS.senderEmail,
    },
    "sender-city": {
        selector: SELECTORS.senderCity,
    },
    "sender-receiving-office": {
        selector: SELECTORS.senderReceivingOffice,
    },
    "sender-ikamet-id": {
        selector: SELECTORS.senderIkametId,
    },
    "receiver-company": {
        selector: SELECTORS.receiverCompany,
    },
    "receiver-name": {
        selector: SELECTORS.receiverName,
    },
    "receiver-address": {
        selector: SELECTORS.receiverAddress,
    },
    "receiver-phone-number": {
        selector: SELECTORS.receiverPhoneNumber,
    },
    "receiver-email": {
        selector: SELECTORS.receiverEmail,
    },
    "receiver-country": {
        selector: SELECTORS.receiverCountry,
    },
    "receiver-city": {
        selector: SELECTORS.receiverCity,
    },
    "description": {
        selector: SELECTORS.receiverDescription,
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
            LengthValidator.bind(EditShipmentInputs["receiver-company"], 10, Infinity),
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


