import { getCheckBoxValue, getValue } from "../../get-value-functions"
import { SELECTORS } from "./selectors"

export const getValues = () => {
    let data = {
        "en-name": getValue(SELECTORS.enName),
        "tr-name": getValue(SELECTORS.trName),
        "ro-name": getValue(SELECTORS.roName),
        "gtip-code": getValue(SELECTORS.gtipCode),
        "item-code": getValue(SELECTORS.itemCode),
        "weight": +getValue(SELECTORS.weight),
        "warning": getCheckBoxValue(SELECTORS.warning),
    }

    return data
}