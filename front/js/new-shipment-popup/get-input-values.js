import { getValue } from "../get-value-functions"
import { SELECTORS } from "./selectors"


export const getDataFromInputs = () => {
    let data = {
        sender:{
            "full-name": getValue(SELECTORS.senderName),
            "full-address": getValue(SELECTORS.senderAddress),
            "phone-number": getValue(SELECTORS.senderPhoneNumber),
            "email": getValue(SELECTORS.senderEmail),
            "receive-office": getValue(SELECTORS.senderReceivingOffice),
            "ikamet-id": getValue(SELECTORS.senderIkametId),
            "country": {
                "name": getValue(SELECTORS.senderCountry)
            },
            "city": {
                "name": getValue(SELECTORS.senderCity)
            },
        },
        "delivery-type": {
            "name": getValue(SELECTORS.deliveryType)
        },
        "receiver": {
            "company": getValue(SELECTORS.receiverCompany),
            "full-name": getValue(SELECTORS.receiverName),
            "full-address": getValue(SELECTORS.receiverAddress),
            "phone-number": getValue(SELECTORS.receiverPhoneNumber),
            "email": getValue(SELECTORS.receiverEmail),
            "description": getValue(SELECTORS.receiverDescription),
            "country": {
                "name": getValue(SELECTORS.receiverCountry)
            },
            "city": {
                "name": getValue(SELECTORS.receiverCity)
            }
        }
    }

    return data
}