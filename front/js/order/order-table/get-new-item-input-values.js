const getData = (selector) => $(selector).val()

export const getNewItemInputValues = () => {
    let data = {
        "en-name": getData("#new-item-en-name"),
        "ro-name": getData("#new-item-ro-name"),
        "tr-name": getData("#new-item-tr-name"),
        "gtip-code": +getData("#new-item-gtip"),
        "item-code": +getData("#new-item-code"),
        "weight": +getData("#new-item-weight"),
        "link": getData("#new-item-link"),
        "value-for-one": +getData("#new-item-value"),
        "count": +getData("#new-item-count"),
        "warning": getData("#new-item-warning") == "on" ? true : false,
        "country-code": {
            "code": getData("#new-item-mensei")
        }
    }

    return data
}