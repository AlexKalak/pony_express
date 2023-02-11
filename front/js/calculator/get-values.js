import { getValue } from "../get-value-functions"
import { SELECTORS } from "./selectors"

export const getValues = () => {
    let data = {
        "sender-country": getValue(SELECTORS.senderCountry),
        "receiver-country": getValue(SELECTORS.receiverCountry),
        "weight": getValue(SELECTORS.weight),
        "length": getValue(SELECTORS.length),
        "width": getValue(SELECTORS.width),
        "height": getValue(SELECTORS.height),
        "delivery-type": getValue(SELECTORS.deliveryType),
        "cost": getValue(SELECTORS.cost)
    }

    return data
}