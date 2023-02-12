import $ from 'jquery'

export const enableSelectingAllInputs = () => {
    $("#table-select-button").click(function() {
        console.log(123)
        const selected = $(this).data("selected")
        const $INPUTS = $(`.table input[type="checkbox"]`)
        console.log($INPUTS)
        if (selected == true) {
            $(this).data("selected", false)
            $INPUTS.prop("checked", false)
        } else {
            $(this).data("selected", true)
            $INPUTS.prop("checked", true)
        }
    })
}