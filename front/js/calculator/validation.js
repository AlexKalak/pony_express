import { AddValidationForInput, HasOnlyLettersAndSpacesValidator, IsNumericValidator, LengthValidator, validate } from "../validation"
import { SELECTORS } from "./selectors"

const Inputs = {
    senderCountry: {
        selector: SELECTORS.senderCountry
    },
    receiverCountry: {
        selector: SELECTORS.receiverCountry
    },
    width: {
        selector: SELECTORS.width
    },
    length: {
        selector: SELECTORS.length
    },
    height: {
        selector: SELECTORS.height
    },
    weight: {
        selector: SELECTORS.weight
    },
    cost: {
        selector: SELECTORS.cost
    },
}

export const getValidationResults = () => {
    return validate(Inputs)
}

export function addValidations() {
    //Sender-Name
    AddValidationForInput(Inputs.senderCountry, 
        [
            LengthValidator.bind(Inputs.senderCountry, 3, Infinity),
            HasOnlyLettersAndSpacesValidator.bind(Inputs.senderCountry)
        ]
    )
    
    AddValidationForInput(Inputs.receiverCountry, 
        [
            LengthValidator.bind(Inputs.receiverCountry, 3, Infinity),
            HasOnlyLettersAndSpacesValidator.bind(Inputs.receiverCountry)    
        ]
    )

    AddValidationForInput(Inputs.width, 
        [
            IsNumericValidator.bind(Inputs.width) 
        ]
    )

    AddValidationForInput(Inputs.length, 
        [
            IsNumericValidator.bind(Inputs.length)
        ]
    )
    AddValidationForInput(Inputs.height, 
        [
            IsNumericValidator.bind(Inputs.height)
        ]
    )
    
    AddValidationForInput(Inputs.weight, 
        [
            IsNumericValidator.bind(Inputs.weight)
        ]
    )

    
    AddValidationForInput(Inputs.cost, 
        [
            IsNumericValidator.bind(Inputs.cost)
        ]
    )
    
}