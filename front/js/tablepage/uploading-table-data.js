import { SELECTORS } from "./selectors"

const getRowTemplate = (shipment) => {
    let row = 
        `<tr>
            <td class="table-column">
                <div class="shipment-id" class="table-id" href="#">${shipment.id}</span>
                <div class="shipment-sender-name" class="secondary">${shipment.sender["full-name"]}</span>
            </td>
            <td class="table-column">
                <a class="shipment-trc link" href="/shipments/${shipment.id}" class="link" style="width: fit-content;">${shipment.trc}</a>
                <div class="shipment-dleivery-type">${shipment["delivery-type"]["name"] ?? "hello"}</span>
            </td>
            <td class="table-column">
                <div class="shipment-price-usd">${shipment["price-usd"]}</span>
                <div class="shipment-price-tl">${shipment["price-tl"]}</span>
            </td>
            <td class="table-column">
                <div class="shipment-receiver-coutry-code">${shipment.receiver.country.name}</span>
                <div class="shipment-receiver-city">${shipment.receiver.city.name}</span>
                <div class="shipment-receiver-name">${shipment.receiver["full-name"]}</span>
            </td>
            <td class="table-column hiddenable">
                <div class="shipment-created-time">${shipment.CreatedAt}</span>
                <div class="shipment-updated-time" class="secondary">${shipment.UpdatedAt}</span>
            </td>
            <td class="table-column">
                <input class="table-checkbox" type="checkbox">
            </td>
        </tr>`

    return row
}

export const uploadData = () => {
    (async function() {
        console.log("SENDING REQUEST")
        let data = await fetch("http://localhost:9999/api/shipments")
                        .then(response => {
                            if(!response.ok)
                                return {}
                            return response.json()
                        })
        let $TABLE_BODY = $("")
        console.log(data)
        for(let shipment of data.shipments) {
            $(SELECTORS.tableBody).append(getRowTemplate(shipment))
        }
    })()
} 