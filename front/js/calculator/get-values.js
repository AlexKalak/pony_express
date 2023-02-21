import $ from 'jquery'

import { getValue } from "../get-value-functions"
import { SELECTORS } from "./selectors"

import { blocksNum, blockSelectorStart } from "./create-new-place-block"

export const getValues = () => {
    let receiverCityInputValue = getValue(SELECTORS.receiverCountry)
    let selectedCity = $(`${SELECTORS.datalist} option[value="${receiverCityInputValue}"]`).attr("city")

    let data = {
        "receiver-city": selectedCity,
        "delivery-type": getValue(SELECTORS.deliveryType),
        "package-type": getValue(SELECTORS.packageType),
        "cost": +getValue(SELECTORS.cost),
        "places": getPlacesValues()
    }

    return data
}

function getPlacesValues() {
    let placesArray = []
    $(".place-block").each(function() {
        let width = +getValue($(this).find(".width"))
        let length = +getValue($(this).find(".length"))
        let height = +getValue($(this).find(".height"))
        let weight = +getValue($(this).find(".weight"))
        
        placesArray.push({
            width,
            length,
            height,
            weight
        })
    })
    return placesArray
}