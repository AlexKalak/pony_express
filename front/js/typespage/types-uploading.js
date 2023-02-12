import $ from 'jquery'

export let types

export const typesPageTableDataUploading = () => {
    types = null;
    (async function() {
        types = await fetch("/api/product-types").then(response => response.json())
        console.log(types)
        let $tbody = $(".table tbody")
        if(types){
            for(let type of types) {
                $tbody.append(
                    `<tr data-id="${type["id"]}">
                        <td prefix="Tr-name">
                            <span class="link type-link">${type["tr-name"]}</span>
                        </td>
                        <td prefix="En-name">${type["en-name"]}</td>
                        <td prefix="Ro-name">${type["ro-name"]}</td>
                        <td prefix="Gtip code">${type["gtip-code"]}</td>
                        <td prefix="Item code">${type["item-code"]}</td>
                        <td prefix="Near wieght">${type["weight"]}</td>
                        <td prefix="">
                            <div>
                                <input type="checkbox" name="" id="">
                            </div>
                        </td>
                    </tr>`
                )
            }
        } 
    })()
}