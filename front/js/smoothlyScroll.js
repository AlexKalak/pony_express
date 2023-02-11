export function scrollSmoothly (selector, scrollTop) {
    $(selector).animate({
        scrollTop: scrollTop
    }, 400)
}