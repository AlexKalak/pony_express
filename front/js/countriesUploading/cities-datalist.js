import { countryData, registrateCallback } from "./countriesUploading";

export let cities = null

export const handleInputKeyUp = () => {
    console.log("smthng")
    console.log($(".cities-input"))
    let deb = debounce(AddCitiesByValue, 200)
         
    $(".cities-input").on('keyup', function() {
        deb(this)
    })
}

function AddCitiesByValue() {
    console.log("in adding")
    let value = $(this).val()
    let $datalist = $(this).parent(".datalist-input") 

    if (value.length < 3){
        writeInDatalist([], $datalist)
        closeDatalist($datalist)
        return
    }

    let validCities = findInCities(value)
    if(!validCities) return
    writeInDatalist(validCities, $datalist)
    openDatalist($datalist)
}

const writeInDatalist = (validCities, $datalist) => {
    console.log("appending")
    $datalist.find(".datalist-block").html("")
    for(let i in validCities) {
        $datalist.find(".datalist-block").append(`
            <div class="datalist-option" city="${validCities[i].city}">${validCities[i].value}</div>
        `)
    }
} 

const findInCities = (value) => {
    if(!cities || value.length < 3) return

    let allCitiesThatContainsValue = cities.filter(city => city.value.toLowerCase().indexOf(value.toLowerCase()) >= 0)
    return allCitiesThatContainsValue
}

const closeDatalist = ($datalist) => {
    $datalist.attr("active", "false")
}
const openDatalist = ($datalist) => {
    $datalist.attr("active", "true")
}

export const uploadCitiesDatalist = async () => {
    if (cities) {
        return
    }
    console.log("nope")
    cities = await registrateCallback(handleCountriesResponse)
}

let handleCountriesResponse = (countryData) => {
    let list = []

    for(let country in countryData) {
        let cities = countryData[country].cities ?? []

        for(let city in cities) {
            let currentCountry = countryData[country].name
            let currentCity = cities[city].name
            let district = cities[city].district?.name
            let area = cities[city].district?.area?.name

            let value = currentCity
            if (district) value += `, ${district} район`
            if (area) value += `, ${area} обл.`
            value += `, ${currentCountry}`

            list.push({
                area: area, 
                district: district,
                city: currentCity,
                value: value
            })
        }
    }

    return list
}

function debounce(func, timeout = 300){
    let timer;
    return (context) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(context) }, timeout);
    };
}
