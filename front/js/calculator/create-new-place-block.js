import $ from 'jquery'
import { packageType } from './change-package-type'
import { addNewPackageDocumentsSelectors, addNewPackageStandartSelectors } from './validation'

export let blocksNum = 2
export const blockSelectorStart = "#place-block-"

export const handleNewPlaceButtonClick = () => {
    $("#new-place-button").on('click', function() {
        
        if (packageType === 'standart') { 
            createNewStadartPackagePlaceBlock()
            let newSelectors = {
                width: `#place-block-${blocksNum} .width`,
                length: `#place-block-${blocksNum} .length`,
                height: `#place-block-${blocksNum} .height`,
                weight: `#place-block-${blocksNum} .weight`,
            }
            addNewPackageStandartSelectors(newSelectors)
        } 
        else if (packageType === 'documents') {
            createNewDocumentsPackagePlaceBlock()
            let newSelectors = {
                weight: `#place-block-${blocksNum} .weight`,
            }
            addNewPackageDocumentsSelectors(newSelectors)
        }

        blocksNum++
        console.log(blocksNum)
    })
}

export const createNewStadartPackagePlaceBlock = () => {
    $(".places-block").append(`
        <div class="place-block added-place-block" id="place-block-${blocksNum}">
            <div class="place-grid standart">
                <div class="weight-size">
                    <input placeholder="Вес" class="weight" type="text">
                </div>
                <div class="package-sizes">
                    <div class="size" >
                        <input placeholder="Длина" class="length" type="text">
                    </div>
                    <div class="size" >
                        <input placeholder="Ширина" class="width" type="text">
                    </div>
                    <div class="size" >
                        <input placeholder="Высота" class="height" type="text">
                    </div>
                </div>
            </div>
            <button class="delete-place-button btn btn-danger">удалить место</button>
        </div>
    `)
}

export const createNewDocumentsPackagePlaceBlock = () => {
    $(".places-block").append(`
        <div class="place-block added-place-block" id="place-block-${blocksNum}">
            <div class="place-grid document">
                <div class="weight-size">
                    <input placeholder="Вес" class="weight" type="text">
                </div>
            </div>
            <button class="delete-place-button btn btn-danger">удалить место</button>
        </div>
    `)
}