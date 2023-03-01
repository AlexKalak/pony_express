import $ from 'jquery'

export const showError = (selector, msg) => {
    if (!selector) return
    
    $(selector).append(`<div class="err">${msg}</div>`)
} 

export const deleteError = (selector) => {
    $(selector).siblings(".err").remove()
    $(selector).find(".err").remove()
}

export const AddErrorDeletingOnInputOnKeyUp = () => {
    $(`input`).keyup(function() {
        deleteError($(this))
    })
    $(`input`).change(function() {
        deleteError($(this))
    })
}

export const getErrorFromTagAndValue = (tag, value) => {
    if(tag == "required")
        return 'This field is required'
}