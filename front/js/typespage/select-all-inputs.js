import $ from 'jquery'

export const selectAllTableRows = () => {
    $("#table-select-button").click(function() {
        const selected = $(this).data("selected")
        const $INPUTS = $(`.table input[type="checkbox"]`)

        if (selected == true) {
            $(this).data("selected", false)
            $INPUTS.prop("checked", false)
        } else {
            $(this).data("selected", true)
            $INPUTS.prop("checked", true)
        }
    })
}