import { AddValidationForInput, IsNumericValidator, IsURLValidator, LengthValidator, NotEmptyValidator, validate } from "../../validation"

const NewPackageInputs = {
    "item-name": {
        selector: "#new-item-datalist-input",
    },
    "tr-name": {
        selector: "#new-item-tr-name",
    },
    "en-name": {
        selector: "#new-item-en-name",
    },
    "ro-name": {
        selector: "#new-item-ro-name",
    },
    "gtip-code": {
        selector: "#new-item-gtip",
    },
    "item-code": {
        selector: "#new-item-code",
    },
    "weight": {
        selector: "#new-item-weight",
    },
    "link": {
        selector: "#new-item-link",
    },
    "value": {
        selector: "#new-item-value",
    },
    "count": {
        selector: "#new-item-count",
    },
    "mensei": {
        selector: "#new-item-mensei",
    },
    "warning": {
        selector: "#new-item-warning",
    },
}

export function getValidationResults() {
    return validate(NewPackageInputs)
}

export function addValidations() {
    AddValidationForInput(NewPackageInputs["en-name"], 
        [
            LengthValidator.bind(NewPackageInputs["en-name"], 5, Infinity)
        ]
    )

    AddValidationForInput(NewPackageInputs["tr-name"], 
        [
            LengthValidator.bind(NewPackageInputs["tr-name"], 5, Infinity)
        ]
    )

    AddValidationForInput(NewPackageInputs["ro-name"], 
        [
            LengthValidator.bind(NewPackageInputs["ro-name"], 5, Infinity)
        ]
    )

    AddValidationForInput(NewPackageInputs["gtip-code"], 
        [
            LengthValidator.bind(NewPackageInputs["gtip-code"], 4, Infinity),
            IsNumericValidator.bind(NewPackageInputs["gtip-code"])
        ]
    )

    AddValidationForInput(NewPackageInputs["item-code"], 
        [
            IsNumericValidator.bind(NewPackageInputs["item-code"])
        ]
    )

    AddValidationForInput(NewPackageInputs["weight"], 
        [
            IsNumericValidator.bind(NewPackageInputs["weight"])
        ]
    )

    AddValidationForInput(NewPackageInputs["link"], 
        [
            IsURLValidator.bind(NewPackageInputs["link"])
        ]
    )

    AddValidationForInput(NewPackageInputs["value"], 
        [
            IsNumericValidator.bind(NewPackageInputs["value"])
        ]
    )

    AddValidationForInput(NewPackageInputs["count"], 
        [
            IsNumericValidator.bind(NewPackageInputs["count"])
        ]
    )

    AddValidationForInput(NewPackageInputs["count"], 
        [
            IsNumericValidator.bind(NewPackageInputs["count"])
        ]
    )

    AddValidationForInput(NewPackageInputs["mensei"], 
        [
            LengthValidator.bind(NewPackageInputs["mensei"], 2, Infinity),
            NotEmptyValidator.bind(NewPackageInputs["mensei"])
        ]
    )
}