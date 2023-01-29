const getData = (selector) => $(selector).val()

export const getDataFromInputs = () => {
    let data = {
        sender:{
            "full-name": getData("#new-shipment-sender-name-input"),
            "full-address": getData("#new-shipment-sender-address-input"),
            "phone-number": getData("#new-shipment-sender-phone-number"),
            "email": getData("#new-shipment-sender-email"),
            "receive-office": getData("#new-shipment-receiving-office"),
            "ikamet-id": getData("#new-shipment-ikamet-id"),
            "country": {
                "name": getData("#new-shipment-sender-country")
            },
            "city": {
                "name": getData("#new-shipment-sender-city")
            }
        },
        "receiver": {
            "company": getData("#new-shipment-receiver-company"),
            "full-name": getData("#new-shipment-receiver-name"),
            "full-address": getData("#new-shipment-receiver-address"),
            "phone-number": getData("#new-shipment-receiver-phone-number"),
            "email": getData("#new-shipment-receiver-email"),
            "description": getData("#new-shipment-description"),
            "country": {
                "name": getData("#new-shipment-receiver-country")
            },
            "city": {
                "name": getData("#new-shipment-receiver-city")
            }
        }
    }

    return data
}