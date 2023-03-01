import $ from 'jquery'

const delay = (dl) => {
    return new Promise(res => {
        setTimeout(res, dl)
    })
}

export const openPopup = async ($popup) => {
    // $("content").addClass("dark");
    $popup.show()
    $popup.children("darking").show()
    $popup.children("content").css({transform: "scale(1)"});
};

export const closePopup = async ($popup) => {
    $popup.children("content").css({transform: "scale(0)"});
    
    await delay(500) 
    $popup.children("darking").hide();
    $popup.hide()

    // $("content").removeClass("dark");
};

export const addCrossDownHandling = () => {
    $(".cross").click(function (event) {
        closePopup($(event.target.closest("modal-window")));
    });
}