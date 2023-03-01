import $ from 'jquery'

import { scrollSmoothly } from "../../../smoothlyScroll"
import { getPageShipmentID } from "../../get-page-shipment-id"
import { getEditTableValues } from "./get-values"
import { getValidationResult } from "./order-table-edt-popup-validation"

const sendingEditPopupForm = () => {
    $("#edit-item-send-form-button").click(async function() {        
        const [valid, scroll] = getValidationResult()
        console.log(scroll)
        console.log(valid)
        if(!valid) {
            scrollSmoothly("#edit-item-modal-window", scroll.top-100)
            return
        }
        
        let data = getEditTableValues()
        let shipmentId = getPageShipmentID()
        let shipmentItemId = $("#edit-item-form").data("id")

        let resp = await fetch(
            `/api/shipments/${shipmentId}/items/${shipmentItemId}`, 
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )

        if (resp.redirected) {
            window.location.reload()
        }
        console.log(resp)
    })
}

export default sendingEditPopupForm