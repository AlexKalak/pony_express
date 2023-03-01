import { scrollSmoothly } from "../smoothlyScroll"
import { AddValidationForInput, HasOnlyDigitsAndSpacesValidator, HasOnlyLettersAndSpacesValidator, IsEmailValidator, LengthValidator, NotEmptyValidator, validate } from "../validation"
import { SELECTORS } from "./selectors"

const NewShipmentInputs = {
    1: {
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
        "sender-country": {
            selector: SELECTORS.senderCountry,
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
    },
    2: {
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
}

export function validateSection(sectionNum) {
    const [valid, scroll] = validate(NewShipmentInputs[sectionNum])
    if(!valid) {
        scrollSmoothly(".create-new-post-modal-window", scroll.top-200)
        return false
    }
    return true
}

export function addValidations() {
    //Sender-Name
    AddValidationForInput(NewShipmentInputs[1]["sender-name"], 
        [
            LengthValidator.bind(NewShipmentInputs[1]["sender-name"], 10, Infinity),
            HasOnlyLettersAndSpacesValidator.bind(NewShipmentInputs[1]["sender-name"])    
        ]
    )
    //Sender-Address
    AddValidationForInput(NewShipmentInputs[1]["sender-address"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[1]["sender-address"])
        ]
    )
    //Sender-Phone number
    AddValidationForInput(NewShipmentInputs[1]["sender-phone-number"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[1]["sender-phone-number"])
        ]
    )
    //Sender-Email
    AddValidationForInput(NewShipmentInputs[1]["sender-email"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[1]["sender-email"]),
            IsEmailValidator.bind(NewShipmentInputs[1]["sender-email"])
        ]
    )
    //Sender-Country
    AddValidationForInput(NewShipmentInputs[1]["sender-country"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[1]["sender-country"])
        ]
    )
    //Sender-city
    AddValidationForInput(NewShipmentInputs[1]["sender-city"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[1]["sender-city"])
        ]
    )
    //Sender-Receiving office
    AddValidationForInput(NewShipmentInputs[1]["sender-receiving-office"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[1]["sender-receiving-office"])
        ]
    )
    //Sender-Ikamet id
    AddValidationForInput(NewShipmentInputs[1]["sender-ikamet-id"], 
        [
            LengthValidator.bind(NewShipmentInputs[1]["sender-ikamet-id"], 13, 17),
            HasOnlyDigitsAndSpacesValidator.bind(NewShipmentInputs[1]["sender-ikamet-id"])
        ]
    )

    //RECEIVER

    //Receiver-Company
    AddValidationForInput(NewShipmentInputs[2]["receiver-company"], 
        [
            LengthValidator.bind(NewShipmentInputs[2]["sender-name"], 10, Infinity),
        ]
    )
    //Receiver-Name
    AddValidationForInput(NewShipmentInputs[2]["receiver-name"], 
        [
            LengthValidator.bind(NewShipmentInputs[2]["receiver-name"], 10, Infinity),
        ]
    )
    //Receiver-Address
    AddValidationForInput(NewShipmentInputs[2]["receiver-address"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[2]["receiver-address"]),
        ]
    )
    //Receiver-Phone Number
    AddValidationForInput(NewShipmentInputs[2]["receiver-phone-number"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[2]["receiver-phone-number"]),
        ]
    )
    //Receiver-Email
    AddValidationForInput(NewShipmentInputs[2]["receiver-email"], 
        [
            IsEmailValidator.bind(NewShipmentInputs[2]["receiver-email"]),
        ]
    )
    //Receiver-Country
    AddValidationForInput(NewShipmentInputs[2]["receiver-country"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[2]["receiver-country"]),
        ]
    )
    //Receiver-City
    AddValidationForInput(NewShipmentInputs[2]["receiver-city"], 
        [
            NotEmptyValidator.bind(NewShipmentInputs[2]["receiver-city"]),
        ]
    )
}