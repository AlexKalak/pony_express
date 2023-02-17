export let countryData = {}

let registratedPromises = []
let uploaded = false

const upload = async function() {
    let resp = await fetch("/api/countries")
    console.log("resp: ", resp)
    if(!resp.ok) {
        return
    }
    let body = await resp.json()

    if(!body.ok) {
        return
    }

    countryData = body.countries
    console.log(countryData)
    uploaded = true
    registratedPromises.map(resolve => resolve())
}


export const registrateCallback = async (cb) => {
    if (uploaded) {
        cb(countryData)
        return
    }

    let resolve
    let prom = new Promise((res) => {
        resolve = res
    })

    registratedPromises.push(resolve)
    await prom
    return cb(countryData)
}

upload()

