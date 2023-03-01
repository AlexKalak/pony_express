import $ from 'jquery'

import { SELECTORS } from "./selectors";
import { resizeInputs } from "../textarea";

const orderInfoPositioning = () => {
    if (window.innerWidth >= 768) {
        $(".order-part main").data("opened", true);
        $(".order-part main").show();
        $(".order-part-title").find("img").addClass("opened");
    } else {
        $(".order-part main").data("opened", false);
        $(".order-part main").hide();
    }
    
    $(".order-part header").click(function () {
        let orderPartMain = $(this).siblings("main");
        let opened = orderPartMain.data("opened");
        
        if (opened) {
            orderPartMain.slideUp(300);
            orderPartMain.data("opened", false);
            
            $(this).find("img").removeClass("opened");
        } else {
            orderPartMain.slideDown(300);
            orderPartMain.data("opened", true);
            $(this).find("img").addClass("opened");
        }
        
        resizeInputs(SELECTORS.receiverDescription)
    });
}
export default orderInfoPositioning 