import $ from 'jquery'

import { AddErrorDeletingOnInputOnKeyUp } from "../../errorHelper";
import { scrollSmoothly } from "../../smoothlyScroll";
import { getPageShipmentID } from "../get-page-shipment-id";
import { getEditShipmentInputValues } from "./get-values";
import { addValidations, getValidationResults } from "./order-editing-validation";
import { SELECTORS } from './selectors';

const sendRequest = async () => {
    let data = JSON.stringify(getEditShipmentInputValues())
    let id = getPageShipmentID()
    let resp = await fetch(`/api/shipments/${id}`, {
        method: 'PUT',
        body: data,
        headers: {
            'Content-type': "application/json"
        },
        redirect: 'follow',
    })

    if(resp.redirected) {
        window.location.reload()
    }
}

const orderEditingScript = () => {
    addValidations()
    AddErrorDeletingOnInputOnKeyUp()

    const saveEditingText = "Сохранить изменения";
    const startEditingText = "Редактировать данный пост";

    const $EDIT_BUTTON = $("#edit-shipment-button");
    const $ORDER_INPUTS = $(".order-input");

    const disableInputs = () => $ORDER_INPUTS.attr("disabled", true);
    const enableInputs = () => $ORDER_INPUTS.attr("disabled", false);

    const disableEditButton = () => {
        console.log("disable")
        $EDIT_BUTTON.data("enabled", false);
        $EDIT_BUTTON.attr("data-enabled", "false");
        $EDIT_BUTTON.text(startEditingText);
    };
    const enableEditButton = () => {
        console.log("enable")
        $EDIT_BUTTON.data("enabled", true);
        $EDIT_BUTTON.attr("data-enabled", "true");
        $EDIT_BUTTON.text(saveEditingText);
    };

    disableInputs();

    $EDIT_BUTTON.click(async function () {
        let enabled = $(this).data("enabled");
        if (!enabled) {
            enableEditButton();
            enableInputs();
            return;
        }

        const [valid, scroll] = getValidationResults()
        if(!valid) {
            scrollSmoothly("html", scroll.top-100)
            return
        }
        
        sendRequest();
        disableEditButton();
        disableInputs();

        return;
    });
}

export default orderEditingScript;