import $ from 'jquery'

import { getValues } from "./get-values"
import { addValidations, getValidationResults } from "./validation"

export const handleCalcButtonClick = () => {
    addValidations()

    $(".calculate-button").on('click', function() {
        let [valid] = getValidationResults()
        if(!valid) {
            return
        }
        let data = getValues()
        console.log(data)
    })
}