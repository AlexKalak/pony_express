export let types

export const uploadTypesForDataList = () => {
    const $DATALIST = $(".item-datalist")
    let typeError = false;

    (async function fetchTypes() {
        types = await fetch("/api/product-types").then(response => response.json())
        if(!types) typeError = true 

        console.log(types)
        for(let type of types) {
            $DATALIST.each(function() {
                $(this).append(`<option value="${type["tr-name"]}"></option>`)
            })
        }
    })()
}