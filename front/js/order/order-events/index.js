import { positionEvents } from "./position-events"
import { uploadingData } from "./uploading-data"

export const orderEventsScript = async () => {
    let events = await uploadingData()
    if(!events) {
        console.log("error uploading data")
        return
    } 
    console.log(events)
    positionEvents(events)
}