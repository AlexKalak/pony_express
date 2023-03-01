import { openPopup } from "../popup"

export const addPopupOpening = () => {
    console.log("click")
    $(".volume-weight-link.link").on('click', function() {
        openPopup($("#volume-weight-modal-window"))
    })
}