import { AddValidationForInput, HasOnlyLettersAndSpacesValidator, IsNumericValidator, LengthValidator, validate } from "../validation"
import { SELECTORS } from "./selectors"

let counter = 0
let Inputs = {
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
    console.log(Inputs)
    return validate(Inputs)
}


export function addStandartValidations() {
    //Sender-Name
    AddValidationForInput(Inputs.senderCountry, 
        [
            LengthValidator.bind(Inputs.senderCountry, 3, Infinity),
        ]
    )
    
    AddValidationForInput(Inputs.receiverCountry, 
        [
            LengthValidator.bind(Inputs.receiverCountry, 3, Infinity), 
        ]
    )
    AddValidationForInput(Inputs.cost, 
        [
            IsNumericValidator.bind(Inputs.cost)
        ]
    )   
}
export function addPackageStandartValidations() {
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
}
export function addPackageDocumentsValidations() {
    AddValidationForInput(Inputs.weight, 
        [
            IsNumericValidator.bind(Inputs.weight)
        ]
    )
}


export function addNewPackageStandartSelectors(selectorsObj) {
    let newInputValues = {}
    let widthName = 'width'+counter
    let lengthName = 'length'+counter
    let heightName = 'height'+counter
    let weightName = 'weight'+counter

    newInputValues[widthName] = {
        selector: selectorsObj.width
    }

    newInputValues[lengthName] = {
        selector: selectorsObj.length
    }
    newInputValues[heightName] = {
        selector: selectorsObj.height
    }
    newInputValues[weightName] = {
        selector: selectorsObj.weight
    }

    Inputs = {
        ...Inputs,
        ...newInputValues
    }
    console.log(Inputs)

    addNewPackageStandartValidations(widthName, lengthName, heightName, weightName)
    counter++
}
export function addNewPackageDocumentsSelectors(selectorsObj) {
    let newInputValues = {}
    let weightName = 'weight'+counter

    newInputValues[weightName] = {
        selector: selectorsObj.weight
    }

    Inputs = {
        ...Inputs,
        ...newInputValues
    }
    console.log(Inputs)

    addNewPackageDocumentsValidations(weightName)
    counter++
}


export function addNewPackageStandartValidations(width, length, height, weight) {
    AddValidationForInput(Inputs[width], 
        [
            IsNumericValidator.bind(Inputs[width]) 
        ]
    )

    AddValidationForInput(Inputs[length], 
        [
            IsNumericValidator.bind(Inputs[length])
        ]
    )
    AddValidationForInput(Inputs[height], 
        [
            IsNumericValidator.bind(Inputs[height])
        ]
    )
    
    AddValidationForInput(Inputs[weight], 
        [
            IsNumericValidator.bind(Inputs[weight])
        ]
    )
}
export function addNewPackageDocumentsValidations(weight) {
    AddValidationForInput(Inputs[weight], 
        [
            IsNumericValidator.bind(Inputs[weight])
        ]
    )
}


export function setToDefaultAllValidationsPackageStandart() {
    Inputs = {
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
    addStandartValidations()
    addPackageStandartValidations()
}
export function setToDefaultAllValidationsPackageDocuments() {
    Inputs = {
        senderCountry: {
            selector: SELECTORS.senderCountry
        },
        receiverCountry: {
            selector: SELECTORS.receiverCountry
        },
        weight: {
            selector: SELECTORS.weight
        },
        cost: {
            selector: SELECTORS.cost
        },
    }
    addStandartValidations()
    addPackageDocumentsValidations()
} 


export function deleteNotExistingInputs() {
    for(let key in Inputs) {
        if($(Inputs[key].selector).length == 0) {
            delete Inputs[key]
        }
    }
}