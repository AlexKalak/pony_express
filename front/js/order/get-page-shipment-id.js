export const getPageShipmentID = () => {
    let url = window.location.href;
    let splitedURL = url.split("/")
    console.log(splitedURL)
    let id = splitedURL[splitedURL.length - 1]
    return id
}