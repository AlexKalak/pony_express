import { AddValidationForInput, IsNumericValidator, IsURLValidator, LengthValidator, NotEmptyValidator, validate } from "../../../validation"

const EditPackageInputs = {
    "item-name": {
        selector: "#edit-item-datalist-input",
    },
    "tr-name": {
        selector: "#edit-item-tr-name",
    },
    "en-name": {
        selector: "#edit-item-en-name",
    },
    "ro-name": {
        selector: "#edit-item-ro-name",
    },
    "gtip-code": {
        selector: "#edit-item-gtip-code",
    },
    "item-code": {
        selector: "#edit-item-code",
    },
    "weight": {
        selector: "#edit-item-weight",
    },
    "link": {
        selector: "#edit-item-link",
    },
    "value": {
        selector: "#edit-item-value",
    },
    "count": {
        selector: "#edit-item-count",
    },
    "mensei": {
        selector: "#edit-item-mensei",
    },
    "warning": {
        selector: "#edit-item-warning",
    },
}

export const getValidationResult = () => {
    return validate(EditPackageInputs)
}

export const addEditItemValidations = () => {
    AddValidationForInput(EditPackageInputs["en-name"], 
        [
            LengthValidator.bind(EditPackageInputs["en-name"], 5, Infinity)
        ]
    )
    
    AddValidationForInput(EditPackageInputs["tr-name"], 
        [
            LengthValidator.bind(EditPackageInputs["tr-name"], 5, Infinity)
        ]
    )
    
    AddValidationForInput(EditPackageInputs["ro-name"], 
        [
            LengthValidator.bind(EditPackageInputs["ro-name"], 5, Infinity)
        ]
    )
    
    AddValidationForInput(EditPackageInputs["gtip-code"], 
        [
            LengthValidator.bind(EditPackageInputs["gtip-code"], 4, Infinity),
            IsNumericValidator.bind(EditPackageInputs["gtip-code"])
        ]
    )
    
    AddValidationForInput(EditPackageInputs["item-code"], 
        [
            IsNumericValidator.bind(EditPackageInputs["item-code"])
        ]
    )
    
    AddValidationForInput(EditPackageInputs["weight"], 
        [
            IsNumericValidator.bind(EditPackageInputs["weight"])
        ]
    )
    
    AddValidationForInput(EditPackageInputs["link"], 
        [
            IsURLValidator.bind(EditPackageInputs["link"])
        ]
    )
    
    AddValidationForInput(EditPackageInputs["value"], 
        [
            IsNumericValidator.bind(EditPackageInputs["value"])
        ]
    )
    
    AddValidationForInput(EditPackageInputs["count"], 
        [
            IsNumericValidator.bind(EditPackageInputs["count"])
        ]
    )
    
    AddValidationForInput(EditPackageInputs["count"], 
        [
            IsNumericValidator.bind(EditPackageInputs["count"])
        ]
    )
    
    AddValidationForInput(EditPackageInputs["mensei"], 
        [
            LengthValidator.bind(EditPackageInputs["mensei"], 2, Infinity),
            NotEmptyValidator.bind(EditPackageInputs["mensei"])
        ]
    )
}