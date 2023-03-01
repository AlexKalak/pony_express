import $ from 'jquery'

export const selectPropOfSelectElement = (selector, value) => {
    let option = null

    $(selector).children().each(function() {
        if($(this).attr("value") == value) {
            option = $(this)
        }
    })

    if(option != null) {
        option.attr("selected", "selected")
        return
    }

    const newOption = document.createElement('option');
    const optionText = document.createTextNode(value)
    
    newOption.appendChild(optionText);
    newOption.setAttribute('value', value)

    $(selector).append(newOption)
    $(newOption).attr('selected', 'selected')
}