import axios from "axios"
import {hostUrl} from "../Constannts/Constants"
import Swal from "sweetalert2";

const showPopUp = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

const getDetailsBySize = (latestProduct, SelectedSize) => {
    let details = [];
    latestProduct.detailsWithSize.map((size) => {
        if (size.productSize == SelectedSize) {
            details = size
        }
    });
    return details;
};

const getQuantityByColor = (details, selectedColor) => {
    let quantity = 0;
    details.productDetails.map((color) => {
        if (color.productColour == selectedColor) {
            quantity = color.productQuantity;
        }
    });
    return quantity;
};

export const getRemainingQuantity = (latestProduct, product) => {
    let size = product.productSize;
    let color = product.productColor;
    let details;
    details = getDetailsBySize(latestProduct, size);
    if (details.length !== 0){
        let availableQuantity;
        availableQuantity = getQuantityByColor(details, color);
        return availableQuantity;
    }else {
        return 0;
    }

}




