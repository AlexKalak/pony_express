const uploadTypesForDataList = () => {
    const $DATALIST = $(".item-datalist")
    let types = null;
    let typeError = false;

    (async function fetchTypes() {
        types = await fetch("/types.json").then(response => response.json())
        if(!types) typeError = true 

        for(let type of Object.keys(types)) {
            $DATALIST.each(function() {
                $(this).append(`<option value="${type}"></option>`)
            })
        }
    })()

    $(".item-datalist-input").change(function (e) {
        let inputValue = e.target.value
        if (types && types[inputValue]) {
            const $CONTAINER = $(e.target.closest("form")) 
            console.log($CONTAINER)
            
            $CONTAINER.find("input[name=\"en-name\"]").val(types[inputValue]["en-name"])
            deleteError($CONTAINER.find("input[name=\"en-name\"]"))

            $CONTAINER.find("input[name=\"ro-name\"]").val(types[inputValue]["ro-name"])
            deleteError($CONTAINER.find("input[name=\"ro-name\"]"))

            $CONTAINER.find("input[name=\"tr-name\"]").val(types[inputValue]["tr-name"])
            deleteError($CONTAINER.find("input[name=\"tr-name\"]"))

            $CONTAINER.find("input[name=\"weight\"]").val(types[inputValue]["weight"])
            deleteError($CONTAINER.find("input[name=\"weight\"]"))

            $CONTAINER.find("input[name=\"gtip-code\"]").val(types[inputValue]["gtip-code"])
            deleteError($CONTAINER.find("input[name=\"gtip-code\"]"))

            $CONTAINER.find("input[name=\"item-code\"]").val(types[inputValue]["item-code"])
            deleteError($CONTAINER.find("input[name=\"item-code\"]"))
        }
    })
}

export default uploadTypesForDataList