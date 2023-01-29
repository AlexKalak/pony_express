const resizeInputs = () => {
    $(".resizable-input").each(function() {
        let height = $(this)[0].scrollHeight
        $(this).css({"height": height})
    })
}
resizeInputs()

$(window).resize(function() {
    resizeInputs()
})


$(".resizable-input").keyup(function() {
    let textarea = $(this)[0]
    textarea.style.height = "auto"
    textarea.style.height = textarea.scrollHeight + "px"
})