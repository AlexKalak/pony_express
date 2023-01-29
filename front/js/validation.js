import { showError, deleteError } from "./errorHelper"

export const AddValidationForInput  = (inputObj, validators) => {
    if (!inputObj.validators) inputObj.validators = []
    inputObj.validators.push(...validators)
}

export function LengthValidator(min, max) {
    if (!this || !this.selector) 
        return null

    let value = $(this.selector).val()
    if(value.length < min)
        return `min: ${min} symbols`
        
    if(value.length > max)
        return `max: ${max} symbols`
    return null
}

export function NotEmptyValidator() {
    if (!this || !this.selector) return null

    let value = $(this.selector).val()
    if(!value) 
        return "This field is required"

    return null 
}

export function IsNumericValidator() {
    if (!this || !this.selector) return null

    let value = $(this.selector).val()

    if(!value || isNaN(value))
        return "This field must be a number"

    return null 
}

export function IsURLValidator() {
    if (!this || !this.selector) return null

    let value = $(this.selector).val()
    try{
        new URL(value)
    } catch(_) {
        return "This field must be an URL"
    }

    return null 
}

export function HasOnlyLettersAndSpacesValidator() {    
    if (!this || !this.selector) return null

    //Regex contains only lettes and spaces
    const NameRegex = /^[A-Za-z\s]*$/
    let value = $(this.selector).val()

    if(!NameRegex.test(value))
        return "Field must contain only letters and spaces"

    return null 
}

export function HasOnlyDigitsAndSpacesValidator() {    
    if (!this || !this.selector) return null

    //Regex contains only lettes and spaces
    const NameRegex = /^[0-9\s]*$/
    let value = $(this.selector).val()

    if(!NameRegex.test(value))
        return "Field must contain only letters and spaces"

    return null 
}

export function IsEmailValidator() {    
    if (!this || !this.selector) return null

    //Regex for validation email
    const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let value = $(this.selector).val()

    if(!EmailRegex.test(value))
        return "Field must contain email address"

    return null 
}

export const validate = (inputs) => {
    let valid = true
    let offset = null
    let scrollSetted = false

    for(let key in inputs){
        let selector = inputs[key].selector 
        deleteError(selector)
        for (let validator of inputs[key].validators ?? []) {
            let error = validator()
            if(error) {
                valid = false
                showError($(selector).parent(), error)
                
                if(!scrollSetted) {
                    offset = $(selector).offset()
                    scrollSetted = true
                }
                break
            }
        }
    }
    return [valid, offset]
}