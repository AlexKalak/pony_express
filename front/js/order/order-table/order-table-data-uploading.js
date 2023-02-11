import { openPopup } from "../../popup";
import { selectPropOfSelectElement } from "../../select-prop-of-select-element";
import { getPageShipmentID } from "../get-page-shipment-id";

export const tableDataUploading = () => {
    let tableData = null
    const $TABLE_BODY = $(".table-first tbody");

    (async function() {
        let id = getPageShipmentID()
        tableData = await fetch(`/api/shipments/${id}/items`).then(response => response.json())
        console.log(id)
        console.log(tableData)
        let shipmentItems = tableData.shipmentItems
        console.log(shipmentItems)

        if (!shipmentItems) {
            return
        }

        for(let i in shipmentItems) {
            $TABLE_BODY.append(`
                <tr data-rownum=${i}>
                    <td prefix="Name">
                        <span class="link table-id" href="#">${shipmentItems[i]["tr-name"]}</span>
                    </td>
                    <td prefix="Value">
                        <span class="breakable">${shipmentItems[i]["value-for-one"]}</span>
                    </td>
                    <td prefix="Count">
                        <span>${shipmentItems[i]["count"]}</span>
                    </td>
                    <td prefix="Weight">
                        <span>${shipmentItems[i]["weight"]}</span>
                    </td>
                    <td prefix="link" class="" prefix="key">
                        <a target="_blank" class="link" href="${shipmentItems[i]["link"]}">${shipmentItems[i]["link"]}</a>
                    </td>
                    <td prefix="requiere msds" class="" prefix="key">
                        <span>${shipmentItems[i]["warning"] ? "❗" : ""}</span>
                    </td>
                </tr>
            `)
        }

        $(".table-first").click(function(event) {
            if(!event.target.closest('.table-id')) {
                return
            }

            const $LinkBtn = $(event.target.closest('.table-id'))

            let rowNum = $LinkBtn.parents("tr").data("rownum")
            console.log(rowNum)
            if(isNaN(+rowNum)) 
                return
            console.log("not none")
            fillPopup(tableData.shipmentItems[+rowNum])

            openPopup($("#edit-item-modal-window"));
        })
    })()

    function fillPopup(data) {
        const $FORM = $("#edit-item-form")
        $FORM.data("id", data["id"])
        
        let select = document.querySelector("#edit-item-country-code")
        $(select).children('.deletable').remove()


        $("#edit-item-tr-name").val(data["tr-name"])
        $("#edit-item-ro-name").val(data["ro-name"])
        $("#edit-item-en-name").val(data["en-name"])
        $("#edit-item-gtip-code").val(data["gtip-code"])
        $("#edit-item-code").val(data["item-code"])
        $("#edit-item-weight").val(data["weight"])
        $("#edit-item-link").val(data["link"])
        $("#edit-item-value").val(data["value-for-one"])
        $("#edit-item-count").val(data["count"])
        selectPropOfSelectElement("#edit-item-country-code", data["country-code"]["code"])
        $("#edit-item-warning").prop("checked", data["warning"])
    }
}