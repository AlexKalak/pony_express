import { SELECTORS } from "./selectors"
import { types } from "../datalist"

export const editDatalistChangeHandling = () => {
    console.log("asdf")
    $(".edit-item-datalist-input").change(function (e) {
        let type = types.find(type => type["tr-name"] === e.target.value)
        $(SELECTORS.trName).val(type["tr-name"])
        $(SELECTORS.roName).val(type["ro-name"])
        $(SELECTORS.enName).val(type["en-name"])
        $(SELECTORS.gtipCode).val(type["gtip-code"])
        $(SELECTORS.itemCode).val(type["item-code"])
        $(SELECTORS.weight).val(type["weight"])
        $(SELECTORS.warning).prop("checked", type["warning"])
    })
}