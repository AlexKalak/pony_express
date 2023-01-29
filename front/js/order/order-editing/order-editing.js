import { AddErrorDeletingOnInputOnKeyUp } from "../../errorHelper";
import { scrollSmoothly } from "../../smoothlyScroll";
import { addValidations, getValidationResults } from "./order-editing-validation";

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
        
        // let data = {}
        // $(".order input").each(function() {
        //     let name = $(this).attr("name")
        //     let value = $(this).val()
        //     if(name) {
        //         data[name] = value
        //     }
        // })
        // console.log(data)
        
        disableEditButton();
        disableInputs();

        // let body = new URLSearchParams(Object.entries(data))

        // let a = await fetch("http://localhost:9999/ponyexpress/create-new-item", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: body.toString(),
        // })

        return;
    });
}

export default orderEditingScript;