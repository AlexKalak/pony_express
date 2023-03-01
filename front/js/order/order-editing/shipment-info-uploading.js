import $ from 'jquery'

import { getPageShipmentID } from "../get-page-shipment-id"
import { SELECTORS } from "./selectors"
import { resizeInputs } from "../textarea"
import { selectPropOfSelectElement } from "../../select-prop-of-select-element"

export const shipmentInfoUploading = () => {
    (async function() {
        let id = getPageShipmentID()
        let response = await fetch(`/api/shipments/${id}`).then(response => response.json())
        if (!response.ok) {
            return
        }
        
        let shipmentInfo = response.shipment
        // console.log(shipmentInfo)
        if (!shipmentInfo) {
            return
        }

        $(SELECTORS.senderName).val(shipmentInfo.sender["full-name"])
        $(SELECTORS.senderAddress).val(shipmentInfo.sender["full-address"])
        $(SELECTORS.senderPhoneNumber).val(shipmentInfo.sender["phone-number"])
        $(SELECTORS.senderEmail).val(shipmentInfo.sender["email"])
        $(SELECTORS.senderReceivingOffice).val(shipmentInfo.sender["receive-office"])
        $(SELECTORS.senderIkametId).val(shipmentInfo.sender["ikamet-id"])
        selectPropOfSelectElement(SELECTORS.senderCountry, shipmentInfo.sender.country.name)
        selectPropOfSelectElement(SELECTORS.senderCity, shipmentInfo.sender.city.name)

        selectPropOfSelectElement(SELECTORS.deliveryType, shipmentInfo["delivery-type"]["name"])

        $(SELECTORS.receiverCompany).val(shipmentInfo.receiver.company)
        $(SELECTORS.receiverName).val(shipmentInfo.receiver["full-name"])
        $(SELECTORS.receiverAddress).val(shipmentInfo.receiver["full-address"])
        $(SELECTORS.receiverPhoneNumber).val(shipmentInfo.receiver["phone-number"])
        $(SELECTORS.receiverEmail).val(shipmentInfo.receiver.email)
        $(SELECTORS.receiverDescription).text(shipmentInfo.receiver.description)
        selectPropOfSelectElement(SELECTORS.receiverCountry, shipmentInfo.receiver.country.name)
        selectPropOfSelectElement(SELECTORS.receiverCity, shipmentInfo.receiver.city.name)

        
        resizeInputs(SELECTORS.receiverDescription)
    })()
}