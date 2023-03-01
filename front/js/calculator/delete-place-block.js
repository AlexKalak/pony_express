import { deleteNotExistingInputs } from "./validation"

export const handleDeletePlaceButtonClick = () => {
    $(".places-block").on('click', function(e) {
        let btn = e.target.closest(".delete-place-button") 
        if(!btn){
            return
        }

        $(btn).parent(".place-block").remove()
        deleteNotExistingInputs()
    })
}