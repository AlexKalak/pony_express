import $ from 'jquery'
import { scrollSmoothly } from '../smoothlyScroll'

import { getValues } from "./get-values"
import { addPackageStandartValidations, addStandartValidations, getValidationResults } from "./validation"

export const handleCalcButtonClick = () => {
    addStandartValidations()
    addPackageStandartValidations()

    $(".calculate-button").on('click', function() {
        let [valid, scroll] = getValidationResults()
        if(!valid) {
            scrollSmoothly("html", scroll.top - 100)
            return
        }
        let data = getValues()
        console.log(data)
    })
}