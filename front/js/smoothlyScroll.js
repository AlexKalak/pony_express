
export const scrollSmoothly = (selector, scrollTop) => {
    $(selector).animate({
        scrollTop: scrollTop
    }, 500)
}