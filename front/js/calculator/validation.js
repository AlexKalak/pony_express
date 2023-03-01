import { AddValidationForInput, HasOnlyLettersAndSpacesValidator, IsNumericValidator, LengthValidator, validate } from "../validation"
import { SELECTORS } from "./selectors"

let counter = 0
let Inputs = {
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

//adding receiver-city and cost validation
export function addStandartValidations() {
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
//adding weight, width, height and length to validations
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
//adding only weight to validations
export function addPackageDocumentsValidations() {
    AddValidationForInput(Inputs.weight, 
        [
            IsNumericValidator.bind(Inputs.weight)
        ]
    )
}

//add selectors of new place to standart package(weight, width, length, height)
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
//add selectors of new place to documents package(only weight)
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

//adding validations to new place (weight, width, length, height)
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
//adding validations to new place (only weight)
export function addNewPackageDocumentsValidations(weight) {
    AddValidationForInput(Inputs[weight], 
        [
            IsNumericValidator.bind(Inputs[weight])
        ]
    )
}

//clear all places and makes standart package inputs for standart package
export function setToDefaultAllValidationsPackageStandart() {
    Inputs = {
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
//clear all places and makes documents package inputs for standart package
export function setToDefaultAllValidationsPackageDocuments() {
    Inputs = {
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

//deleting validation for not existing inputs(if is not find in dom)
export function deleteNotExistingInputs() {
    for(let key in Inputs) {
        if($(Inputs[key].selector).length == 0) {
            delete Inputs[key]
        }
    }
}