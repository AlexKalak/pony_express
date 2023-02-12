import $ from 'jquery'

export const openPopup = ($popup) => {
    $("content").addClass("dark");
    $("darking").show();
    $popup.slideDown(200);
};

export const closePopup = ($popup) => {
    $popup.slideUp(200);
    $("darking").hide();
    $("content").removeClass("dark");
};

export const addCrossDownHandling = () => {
    $(".cross").click(function (event) {
        closePopup($(event.target.closest("modal-window")));
    });
}