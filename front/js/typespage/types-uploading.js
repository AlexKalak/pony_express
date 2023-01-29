{
    let types = null;
    (async function() {
        types = await fetch("/types.json").then(response => response.json())
        console.log(types)
        $tbody = $(".table tbody")
        if(types){
            for(let type of Object.values(types)) {
                $tbody.append(
                    `<tr>
                        <td prefix="Tr-name">${type["tr-name"]}</td>
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