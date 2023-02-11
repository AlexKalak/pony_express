import { getValues } from "./get-values"
import { addValidations, getValidationResults } from "./validation"

export const handleCalcButtonClick = () => {
    addValidations()

    $(".calculate-button").click(function() {
        let [valid] = getValidationResults()
        console.log(valid)
        if(!valid) {
        }
        let data = getValues()
        console.log(data)
    })
}