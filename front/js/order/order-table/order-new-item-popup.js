//Create new post popup logic

import { openPopup } from "../../popup";
import { scrollSmoothly } from "../../smoothlyScroll";
import { getPageShipmentID } from "../get-page-shipment-id";
import { getNewItemInputValues } from "./get-new-item-input-values";
import { addValidations, getValidationResults } from "./order-new-item-validation";

// Create new package popup logic
const newItemPopupScript = () => {
    addValidations()

    $(".create-new-item-btn").click(function () {
        openPopup($(".create-new-item-modal-window"));
    });

    $("#new-item-send-form-button").click(async function() {
        const [valid, scroll] = getValidationResults()
        if(!valid) {
            scrollSmoothly(".create-new-item-modal-window", scroll.top-100)
            return
        }
        
        let data = getNewItemInputValues()

        let shipmentId = getPageShipmentID()

        let resp = await fetch(`http://localhost:9999/api/shipments/${shipmentId}/items`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if(resp.ok) {
            window.location.reload();
        }
    })
}

export default newItemPopupScript