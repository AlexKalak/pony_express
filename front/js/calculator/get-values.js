import { getValue } from "../get-value-functions"
import { SELECTORS } from "./selectors"

import { blocksNum, blockSelectorStart } from "./create-new-place-block"

export const getValues = () => {
    let data = {
        "sender-country": getValue(SELECTORS.senderCountry),
        "receiver-country": getValue(SELECTORS.receiverCountry),
        "weight": getValue(SELECTORS.weight),
        "length": getValue(SELECTORS.length),
        "width": getValue(SELECTORS.width),
        "height": getValue(SELECTORS.height),
        "delivery-type": getValue(SELECTORS.deliveryType),
        "cost": getValue(SELECTORS.cost),
        "places": getPlacesValues()
    }

    return data
}

function getPlacesValues() {
    let placesArray = []
    for(let i = 1; i <= blocksNum; i++) {
        let placeId = blockSelectorStart + i
        let width = getValue(`${placeId} input[name="width"]`)
        let length = getValue(`${placeId} input[name="length"]`)
        let height = getValue(`${placeId} input[name="height"]`)
        let weight = getValue(`${placeId} input[name="weight"]`)

        placesArray.push({
            width,
            length,
            height,
            weight
        })
    }

    return placesArray
}