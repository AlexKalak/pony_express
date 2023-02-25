import { countryData, registrateCallback } from "../countriesUploading/countriesUploading";

export const citiesDatalist = async () => {
    $("#cities-list").html("")

    let a = await registrateCallback(uploadDatalist)
    a.map(opt => {
            console.log(opt)
            $("<option>").val(opt.value).text(opt.value).attr("city", opt.city).appendTo("#cities-list")
        })
}

let uploadDatalist = (countryData) => {
    let list = []

    for(let country in countryData) {
        let cities = countryData[country].cities ?? []
        for(let city in cities) {
            let currentCountry = countryData[country].name
            let currentCity = cities[city].name
            list.push({
                city: currentCity,
                value: currentCity + ", " + currentCountry
            })
        }
    }

    return list
}