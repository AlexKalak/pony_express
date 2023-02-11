import { getCheckBoxValue, getValue } from "../../../get-value-functions"

export const getNewItemInputValues = () => {
    let data = {
        "en-name": getValue("#new-item-en-name"),
        "ro-name": getValue("#new-item-ro-name"),
        "tr-name": getValue("#new-item-tr-name"),
        "gtip-code": +getValue("#new-item-gtip"),
        "item-code": +getValue("#new-item-code"),
        "weight": +getValue("#new-item-weight"),
        "link": getValue("#new-item-link"),
        "value-for-one": +getValue("#new-item-value"),
        "count": +getValue("#new-item-count"),
        "warning": getCheckBoxValue("new-item-count"),
        "country-code": {
            "code": getValue("#new-item-country-code")
        }
    }

    return data
}