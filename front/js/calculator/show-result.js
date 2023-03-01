export const showResult = (price, usedVolumeWeights) => {
    $(".price-section .volume-weight").removeClass("active")
    if(usedVolumeWeights){
        $(".price-section .volume-weight").addClass("active")
    }
    
    console.log(price)
    $(".price-section").addClass("active")
    $(".price-section #price").text(price + "$")
}