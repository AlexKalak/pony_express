import $ from 'jquery'

import { getValue } from "../get-value-functions"
import { SELECTORS } from "./selectors"

import { blocksNum, blockSelectorStart } from "./create-new-place-block"
import { cities } from '../countriesUploading/cities-datalist'

export const getValues = () => {
    let receiverInf = getReceiverInf()
    let data = {
        "sender-city": getValue(SELECTORS.senderCity),
        "receiver-city": receiverInf.city,
        "receiver-district": receiverInf.district,
        "receiver-area": receiverInf.area, 
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

function getReceiverInf() {
    let selectedCity = getValue(SELECTORS.receiverCity)
    console.log(selectedCity)
    let cityFromDB = cities.find(city => city.value === selectedCity)
    if(cityFromDB.length < 1) {
        return false
    }
    return {
        city: cityFromDB.city,
        district: cityFromDB.district,
        area: cityFromDB.area,
    }
}