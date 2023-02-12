import $ from 'jquery'
import { addNewSelectors } from './validation'

export let blocksNum = 1
export const blockSelectorStart = "#place-block-"

export const handleNewPlaceButtonClick = () => {
    $("#new-place-button").click(function() {
        createNewPlaceBlock()

        let newSelectors = {
            width: `#place-block-${blocksNum} .width`,
            length: `#place-block-${blocksNum} .length`,
            height: `#place-block-${blocksNum} .height`,
            weight: `#place-block-${blocksNum} .weight`,
        }
        addNewSelectors(newSelectors)

        blocksNum++
    })
}

export const createNewPlaceBlock = () => {
    $(".places-block").append(`
        <div class="place-block" id="place-block-${blocksNum}">
            <div class="input-block-column">
                <span class="input-label">Вес</span>
                <input class="weight" type="text">
            </div>
            <div class="input-block-column">
                <span class="input-label">Длина</span>
                <input class="length" type="text">
            </div>
            <div class="input-block-column">
                <span class="input-label">Ширина</span>
                <input class="width" type="text">
            </div>
            <div class="input-block-column">
                <span class="input-label">Высота</span>
                <input class="height" type="text">
            </div>
            <button class="delete-place-button btn btn-danger">удалить место</button>
        </div>
    `)
}