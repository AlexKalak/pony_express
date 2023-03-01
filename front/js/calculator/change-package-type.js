import {    deleteNotExistingInputs, 
            setToDefaultAllValidationsPackageDocuments, 
            setToDefaultAllValidationsPackageStandart } from "./validation";

export let packageType = 'standart'

export const handlePackageTypeRadioButtonChange = () => {
    $('input[name="package-type"]').on('change', function(e) {
        let type = $(e.currentTarget).val()
        switch (type) {
            case 'standart': {
                packageType = 'standart'
                enableStandartPackageInputs()
                break;
            }
            case 'documents': {
                packageType = 'documents'
                enableDocumentsPackageInputs()
                break;
            }
            case 'B2B': {
                packageType = 'standart'
                enableStandartPackageInputs()
                break;
            }
        }
    })
}

function enableStandartPackageInputs() {
    deleteAllAddedPlaceBlocks()

    $("#place-block-1").html(`
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
    `)

    deleteNotExistingInputs()
    setToDefaultAllValidationsPackageStandart()

}
function enableDocumentsPackageInputs() {
    deleteAllAddedPlaceBlocks()
    $(".place-block").each(function() {
        $(this).find(".package-sizes").remove()
        $(this).find(".place-grid").removeClass("standart")
        $(this).find(".place-grid").addClass("document")
    })
    deleteNotExistingInputs()
    setToDefaultAllValidationsPackageDocuments()
}

export function deleteAllAddedPlaceBlocks() {
    $(".added-place-block").remove()
} 