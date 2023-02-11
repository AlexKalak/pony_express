import { addCrossDownHandling, openPopup } from "../../popup"
import { scrollSmoothly } from "../../smoothlyScroll"
import { getValues } from "./get-values"
import { addValidations, getValidationResults } from "./new-item-validation"

export const typespageNewTypePopup = () => {
    $("#create-new-type-button").click(function() {
        openPopup($("#create-new-type-popup"))
    })
    addCrossDownHandling()
    addValidations()

    $("#new-type-submit").click(async function(e) {

        let [valid, scroll] = getValidationResults()
        if (!valid) {
            scrollSmoothly("#create-new-type-popup", scroll.top - 100)
            return
        }
        let data = getValues()

        let resp = await fetch("/api/product-types", {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-type': "application/json"
            }
        })

        if (resp.redirected) {
            window.location.reload()
        }
    })
}