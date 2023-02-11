import { addValidations, validateSection } from "./new-shipment-validation";
import addPopupOpening from "./add-popup-opening";
import { addCrossDownHandling } from "../popup";
import { getDataFromInputs } from "./get-input-values";
import { getErrorFromTagAndValue, showError } from "../errorHelper";
import { SELECTORS } from "./selectors";
import { scrollSmoothly } from "../smoothlyScroll";

const FORM_SECTIONS_NUM = $(
    ".create-new-post-modal-window .form-section"
).length;
const $POPUP = $(".create-new-post-modal-window")
const $FROM_SECTIONS = $(".create-new-post-modal-window .form-section");
const $NEXT_BUTTON = $(".create-new-post-modal-window .form-button.next");
const $CREATE_BUTTON = $(
    ".create-new-post-modal-window .form-button.create"
);
const $PREV_BUTTON = $(".create-new-post-modal-window .form-button.prev");
let currentSectionNum = 1;

const renderSection = (sectionNum) => {
    $FROM_SECTIONS.each(function () {
        let thisSectionNum = parseInt($(this).attr("section-num"));

        if (thisSectionNum !== sectionNum) $(this).hide();
        else $(this).show();
    });
    scrollSmoothly($POPUP, 0)
};
const changeButtons = (sectionNum) => {
    if (sectionNum === FORM_SECTIONS_NUM) {
        $NEXT_BUTTON.hide();
        $CREATE_BUTTON.show();
    } else {
        $NEXT_BUTTON.show();
        $CREATE_BUTTON.hide();
    }

    if (currentSectionNum <= 1) $PREV_BUTTON.removeClass("active");
    else $PREV_BUTTON.addClass("active");
};

async function sendRequest() {
    let data = getDataFromInputs()
    console.log(data)
    let resp = await fetch("/api/shipments", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if(!resp.ok && resp.status === 400) {
        data = await resp.json()
        console.log("status 400")
        console.log(data)
        if(!data.validationErrors) {
            return
        }

        console.log("handling error")
        handleValidationErrors(data.validationErrors)
    }

    if(resp.redirected) {
        window.location.href = resp.url;
    }
}

const VALIDATION_ERROR_SELECTORS =  {
    "Shipment.Receiver.Company": SELECTORS.receiverCompany,
    "Shipment.Receiver.FullName": SELECTORS.receiverName,
    "Shipment.Receiver.FullAddress": SELECTORS.receiverAddress,
    "Shipment.Receiver.PhoneNumber": SELECTORS.receiverPhoneNumber,
    "Shipment.Receiver.Email": SELECTORS.receiverEmail,
    "Shipment.Receiver.Country": SELECTORS.receiverCountry,
    "Shipment.Receiver.City": SELECTORS.receiverCity,

    "Shipment.Sender.FullName": SELECTORS.senderName,
    "Shipment.Sender.FullAddress": SELECTORS.senderAddress,
    "Shipment.Sender.PhoneNumber": SELECTORS.senderPhoneNumber,
    "Shipment.Sender.Email": SELECTORS.senderEmail,
    "Shipment.Sender.ReceiveOffice": SELECTORS.senderReceivingOffice,
    "Shipment.Sender.IkametID": SELECTORS.senderIkametId,
    "Shipment.Sender.Country": SELECTORS.receiverCountry,
    "Shipment.Sender.City": SELECTORS.City,
}

const handleValidationErrors = (validErrors) => {
    let page = null
    let selector = null

    for(let i in validErrors) {
        let err = getErrorFromTagAndValue(validErrors[i].tag, validErrors[i].value)
        let field = validErrors[i].field
        
        
        console.log(VALIDATION_ERROR_SELECTORS[field])
        let $INPUTBLOCK = $(VALIDATION_ERROR_SELECTORS[field]).parent()

        if(field.includes("Receiver") && (page === null || page > 2))
        {
            page = 2
            selector = VALIDATION_ERROR_SELECTORS[field]
        }

        if(field.includes("Sender") && (page === null || page > 1)){
            page = 1
            selector = VALIDATION_ERROR_SELECTORS[field]
        }

        showError($INPUTBLOCK, err)
    }

    if(selector === null)
        return

    currentSectionNum = page
    renderSection(currentSectionNum)
    changeButtons(currentSectionNum)
    let scrollTop = $(selector).scrollTop() 
    scrollSmoothly($POPUP, scrollTop - 100)
}

//////////////////////////////////////////
export const newShipmentPopupScript = () => {
    addPopupOpening()
    addCrossDownHandling()
    
    addValidations()
    renderSection(1);
    
    $(".create-new-post-modal-window .form-buttons").click(async function (event) {
        if (event.target.closest(".create-new-post-modal-window .form-button.create")){
            let valid = validateSection(currentSectionNum)
            
            if(valid){
                sendRequest()
            } else {
                return
            }
        }
    
        if (event.target.closest(".create-new-post-modal-window .form-button.next")){
            let valid = validateSection(currentSectionNum)
            if(valid){
                currentSectionNum++
            } else {
                return
            }
        }
    
        if (event.target.closest(".create-new-post-modal-window .form-button.prev.active")){
            currentSectionNum--;
        }

        renderSection(currentSectionNum);
        changeButtons(currentSectionNum);
    });
}