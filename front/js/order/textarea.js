import $ from 'jquery'

export const resizeInputs = (...selectors) => {
    for(let selector of selectors) {
        $(selector).each(function() {
            let height = $(this)[0].scrollHeight
            $(this).css({"height": height})
        })
    }
}

export const textareaScript = (...selectors) => {
    resizeInputs(...selectors)

    $(window).resize(function() {
        resizeInputs(...selectors)
    })

    for(let selector of selectors) {
        $(selector).keyup(function() {
            let textarea = $(this)[0]
            textarea.style.height = "auto"
            textarea.style.height = textarea.scrollHeight + "px"
        })
    }
}