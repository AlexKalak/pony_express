import { getPageShipmentID } from "../get-page-shipment-id"

export const uploadingData = async () => {
    let shipmentID = getPageShipmentID()
    let resp = await fetch(`/api/shipments/${shipmentID}/events`)
    if (!resp.ok) {
        return
    }
    
    let body = await resp.json()
    if(!body.ok) {
        return
    }

    let events = body.events
    return events
}