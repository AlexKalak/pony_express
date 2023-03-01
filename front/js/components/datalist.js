$(".datalist-input input").on('click', function() {
    if($(this).parent(".datalist-input").attr("active") === "false") {
        $(".datalist-input").attr("active", "false")
        $(this).parent(".datalist-input").attr("active", "true")
        return
    }
})

$(".datalist-input").on('click', function(e) {
    if(!e.target.closest(".datalist-option")) {
        return
    }

    let value = e.target.closest(".datalist-option").textContent
    let input = $(this).find("input")
    input.val(value)
    $(this).attr("active", "false")
})

$("body").on('click', (e) => {
    if(!e.target.closest(".datalist-input")){
        $(".datalist-input").attr("active", "false")
    }
})
