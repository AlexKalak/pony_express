import $ from 'jquery'

export const getValue = (selector) => $(selector).val() ?? ""
export const getCheckBoxValue = (selector) => $(selector).prop("checked") ? true : false