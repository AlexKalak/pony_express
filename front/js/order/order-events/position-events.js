export const positionEvents = (events) => {
    for(let i = 0; i < events.length; i++) {
        addRow(events[i], i+1)
    }
}

function addRow(event, rowNum) {
    $(".table-second tbody").append(`
        <tr>
            <td><span>${rowNum}</span></td>
            <td><span>${event["created-time"]}</span></td>
            <td class="hiddenable"><span>${event["sender-city"]}/${event["receiver-city"]}</span></td>
            <td><span>${event["event"]}</span></td>
            <td><span>${event["place"]}</span></td>
        </tr>
    `)
}