import { scrollSmoothly } from "../../smoothlyScroll"
import { getValidationResult } from "./order-table-edt-popup-validation"

const sendingEditPopupForm = () => {
    $("#edit-item-send-form-button").click(async function() {        
        const [valid, scroll] = getValidationResult(EditPackageInputs)
        console.log(scroll)
        console.log(valid)
        if(!valid) {
            scrollSmoothly("#edit-item-modal-window", scroll.top-100)
            return
        }
        
        let data = {}
        $(".create-new-item-modal-window .input-block input").each(function() {
            let name = $(this).attr("name")
            let value = $(this).val()
            if(name) {
                data[name] = value
            }
        })

        console.log(data)

        // let body = new URLSearchParams(Object.entries(data))

        // let a = await fetch("http://localhost:9999/ponyexpress/create-new-item", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: body.toString(),
        // })
        // console.log(a)
    })
}

export default sendingEditPopupForm