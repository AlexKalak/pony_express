import { SELECTORS } from "./selectors"
import {getValue, getCheckBoxValue} from '../../../get-value-functions'

export const getEditTableValues = () => {
    let data = {
        "en-name": getValue(SELECTORS.enName),
        "tr-name": getValue(SELECTORS.trName),
        "ro-name": getValue(SELECTORS.roName),
        "gtip-code": +getValue(SELECTORS.gtipCode),
        "item-code": +getValue(SELECTORS.itemCode),
        "weight": +getValue(SELECTORS.weight),
        "link": getValue(SELECTORS.link),
        "value-for-one": +getValue(SELECTORS.valueForOne),
        "count": +getValue(SELECTORS.count),
        "warning": getCheckBoxValue(SELECTORS.warning),
        "country-code": {
            "code": getValue(SELECTORS.countryCode)
        },
    }

    return data
}