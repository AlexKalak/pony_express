import { SELECTORS } from "./selectors"
import { types } from "../types-uploading"
import { openPopup } from "../../popup"

export const addHandlingTypeLinkPress = (e) => {
    $(".table").click(function(event) {
        if(!event.target.closest('.type-link')) {
            return
        }

        const $LinkBtn = $(event.target.closest('.type-link'))

        let strId = $LinkBtn.parents("tr").data("id")
        let id = +strId
        if(isNaN(+id)) 
            return
        let type = types.find(type => type.id === id) 
        fillPopup(type)

        openPopup($("#edit-type-popup"));
    })
}

function fillPopup(data) {
    const $FORM = $("#edit-type-form")
    $FORM.data("id", data["id"])

    $(SELECTORS.trName).val(data["tr-name"])
    $(SELECTORS.roName).val(data["ro-name"])
    $(SELECTORS.enName).val(data["en-name"])
    $(SELECTORS.gtipCode).val(data["gtip-code"])
    $(SELECTORS.itemCode).val(data["item-code"])
    $(SELECTORS.weight).val(data["weight"])
    $(SELECTORS.warning).prop("checked", data["warning"])
}