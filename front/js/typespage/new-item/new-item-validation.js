import { AddValidationForInput, IsNumericValidator, LengthValidator, validate } from "../../validation"
import { SELECTORS } from "./selectors"


const NewTypeInputs = {
    "en-name": {
        selector: SELECTORS.enName
    },
    "tr-name": {
        selector: SELECTORS.trName
    },
    "ro-name": {
        selector: SELECTORS.roName
    },
    "gtip-code": {
        selector: SELECTORS.gtipCode
    },
    "item-code": {
        selector: SELECTORS.itemCode
    },
    "weight": {
        selector: SELECTORS.weight
    },
    "warning": {
        selector: SELECTORS.warning
    }
}

export const getValidationResults = () => {
    return validate(NewTypeInputs)
}

export function addValidations() {
    //Sender-Name
    AddValidationForInput(NewTypeInputs["en-name"], 
        [
            LengthValidator.bind(NewTypeInputs["en-name"], 5, Infinity), 
        ]
    )
    AddValidationForInput(NewTypeInputs["tr-name"], 
        [
            LengthValidator.bind(NewTypeInputs["tr-name"], 5, Infinity),  
        ]
    )
    AddValidationForInput(NewTypeInputs["ro-name"], 
        [
            LengthValidator.bind(NewTypeInputs["ro-name"], 5, Infinity),   
        ]
    )
    AddValidationForInput(NewTypeInputs["gtip-code"], 
        [
            LengthValidator.bind(NewTypeInputs["gtip-code"], 4, Infinity),  
            IsNumericValidator.bind(NewTypeInputs["gtip-code"])
        ]
    )
    AddValidationForInput(NewTypeInputs["item-code"], 
        [
            LengthValidator.bind(NewTypeInputs["item-code"], 4, Infinity),   
            IsNumericValidator.bind(NewTypeInputs["item-code"])
        ]
    )
    AddValidationForInput(NewTypeInputs["weight"],
        [
            IsNumericValidator.bind(NewTypeInputs["weight"])  
        ]
    )
}