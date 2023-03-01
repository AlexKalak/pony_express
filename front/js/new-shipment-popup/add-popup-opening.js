import $ from 'jquery'

import { openPopup } from "../popup";

const addPopupOpening = () => {
    $(".create-new-post-btn").click(function () {
        openPopup($(".create-new-post-modal-window"));
    });
}

export default addPopupOpening