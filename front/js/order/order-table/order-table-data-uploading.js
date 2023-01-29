import { openPopup } from "../../popup";
import { getPageShipmentID } from "../get-page-shipment-id";

const tableDataUploading = () => {
    let tableData = null
    const $TABLE_BODY = $(".table-first tbody");

    (async function() {
        let id = getPageShipmentID()
        tableData = await fetch(`/api/shipments/${id}/items`).then(response => response.json())
        console.log(id)
        console.log(tableData)
        let rowNum = 0
        for(let i in tableData) {
            $TABLE_BODY.append(`
                <tr data-rownum=${rowNum}>
                    <td prefix="Name">
                        <span class="link table-id" href="#">${tableData[i]["tr-name"]}</span>
                    </td>
                    <td prefix="Value">
                        <span class="breakable">${tableData[i]["value-for-one"]}</span>
                    </td>
                    <td prefix="Count">
                        <span>${tableData[i]["count"]}</span>
                    </td>
                    <td prefix="Weight">
                        <span>${tableData[i]["weight"]}</span>
                    </td>
                    <td prefix="link" class="" prefix="key">
                        <a target="_blank" class="link" href="${tableData[i]["link"]}">${tableData[i]["link"]}</a>
                    </td>
                    <td prefix="requiere msds" class="" prefix="key">
                        <span>${tableData[i]["warning"] ? "❗" : ""}</span>
                    </td>
                </tr>
            `)
            rowNum++
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
            fillPopup(tableData[+rowNum])

            openPopup($("#edit-item-modal-window"));
        })
    })()

    function fillPopup(data) {
        
        let select = document.querySelector("#edit-item-mensei")
        $(select).children('.deletable').remove()

        const $POPUP = $("#edit-item-modal-window")
        $("#edit-item-tr-name").val(data["tr-name"])
        $("#edit-item-ro-name").val(data["ro-name"])
        $("#edit-item-en-name").val(data["en-name"])
        $("#edit-item-gtip-code").val(data["gtip-code"])
        $("#edit-item-code").val(data["item-code"])
        $("#edit-item-weight").val(data["weight"])
        $("#edit-item-link").val(data["link"])
        $("#edit-item-value").val(data["value-for-one"])
        $("#edit-item-count").val(data["count"])
        // $("#edit-item-mensei").val(data["country-code"]["code"])
        
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(data["country-code"]["code"])
        newOption.appendChild(optionText);
        newOption.setAttribute('value', data["country-code"]["code"])
        newOption.setAttribute('class', 'deletable')

        select.appendChild(newOption)
        $(newOption).attr('selected', 'selected')

        $("#edit-item-warning").prop("checked", data["warning"])
    }
}

export default tableDataUploading