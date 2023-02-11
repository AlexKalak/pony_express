import { AddValidationForInput, IsNumericValidator, IsURLValidator, LengthValidator, NotEmptyValidator, validate } from "../../../validation"
import { SELECTORS } from "./selectors"

const NewPackageInputs = {
    "tr-name": {
        selector: SELECTORS.trName,
    },
    "en-name": {
        selector: SELECTORS.enName,
    },
    "ro-name": {
        selector: SELECTORS.roName,
    },
    "gtip-code": {
        selector: SELECTORS.gtipCode,
    },
    "item-code": {
        selector: SELECTORS.itemCode,
    },
    "weight": {
        selector: SELECTORS.weight,
    },
    "link": {
        selector: SELECTORS.link,
    },
    "value": {
        selector: SELECTORS.valueForOne,
    },
    "count": {
        selector: SELECTORS.count,
    },
    "country-code": {
        selector: SELECTORS.countryCode,
    },
    "warning": {
        selector: SELECTORS.warning,
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

    AddValidationForInput(NewPackageInputs["country-code"], 
        [
            LengthValidator.bind(NewPackageInputs["country-code"], 2, Infinity),
            NotEmptyValidator.bind(NewPackageInputs["country-code"])
        ]
    )
}