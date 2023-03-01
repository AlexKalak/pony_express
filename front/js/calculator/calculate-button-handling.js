import $ from 'jquery'
import { scrollSmoothly } from '../smoothlyScroll'

import { getValues } from "./get-values"
import { showResult } from './show-result'
import { addPackageStandartValidations, addStandartValidations, getValidationResults } from "./validation"

export const handleCalcButtonClick = () => {
    addStandartValidations()
    addPackageStandartValidations()

    $(".calculate-button").on('click', async function() {
        let [valid, scroll] = getValidationResults()
        if(!valid) {
            scrollSmoothly("html", scroll.top - 100)
            return
        }
        let data = getValues()
        console.log(data)
        let resp = await fetch("/api/calculator", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
        })
        
        if (!resp.ok) {
            console.log("что-то пошло не так")
            return
        }

        let payload = await resp.json()
        if (!payload.ok){
            console.log("что-то пошло не так")
            return
        }

        showResult(payload.result, payload["used-volume-weights"])
        console.log(payload)
        console.log(resp)
    })
}