export const getPageShipmentID = () => {
    let url = window.location.href;
    let splitedURL = url.split("/")
    let id = splitedURL[splitedURL.length - 1]
    return id
}