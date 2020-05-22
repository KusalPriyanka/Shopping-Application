import Swal from "sweetalert2";

export const alertMsg = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

export const OfferValidations = (offer) => {
    if(offer.offerName === null || offer.offerName === ""){
        alertMsg("error", "Ooooooooooooopz!" , "Please Provide Offer Name.")
        return false
    }else if(offer.offerAmount === null || offer.offerAmount === "" || offer.offerAmount <= 0 || offer.offerAmount > 100 || Number.isNaN(offer.offerAmount) ){
        alertMsg("error", "Ooooooooooooopz!" , "Please Provide Valid Offer Amount.")
        return false
    }else if(offer.offerType === null || offer.offerType === ""){
        alertMsg("error", "Ooooooooooooopz!" , "Please Provide Offer Type.")
        return false
    }else if(offer.productCategory === null || offer.productCategory === ""){
        alertMsg("error", "Ooooooooooooopz!" , "Please Provide Product Category.")
        return false
    }else if(offer.offerType === null || offer.offerType === ""){
        alertMsg("error", "Ooooooooooooopz!" , "Please Provide Offer Type.")
        return false
    }else if(offer.products.length === 0){
        alertMsg("error", "Ooooooooooooopz!" , "Please Add Products to Offer.")
        return false
    }else if(offer.offerType === "Promo Code"){
        if (offer.offerCode === null  || offer.offerCode === ""){
            alertMsg("error", "Ooooooooooooopz!" , "Please Provide Promo Code.")
            return false
        }
    }else {
        return true
    }
}
