import { getEditTypeInputsValues } from "./get-values"

const sendRequest = async () =>{
    let id = parseInt($("#edit-type-form").data("id"))
    let data = getEditTypeInputsValues()
    console.log(data)
    let resp = await fetch(`/api/product-types/${id}`, {
        method: 'PUT',
        redirect: 'follow',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    
    if(resp.redirected) {
        window.location.reload()
    }

    if (!resp.ok) {
        return
    }
}

export const handleSaveButtonClick = () => {
    $("#edit-type-submit").click(function() {
        console.log("clc")
        sendRequest()
    })
}
