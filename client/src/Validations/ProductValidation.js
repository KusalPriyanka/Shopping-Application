import Swal from "sweetalert2";
import joi from "joi"

export const alertMsg = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

export const productDetailsValidation = (productDetails) => {
    const schema = {
        ProductName: joi.string().min(6).max(255).required(),
        BrandName: joi.string().min(3).max(255).required(),
        Category: joi.string().min(3).max(255).required(),
        ProductPrice: joi.number().positive().required(),
        Description: joi.string().min(6).max(255).required(),

    };
    const result = joi.validate(productDetails, schema)
    console.log(result)
    if(result.error === null){
        return true
    }else {
        alertMsg("error", "Ooooooooooooopz!" , result.error.details[0].message)
        return false
    }
}

export const productSizeValidation = (sizes) => {
    const schema = {
        productSize: joi.string().min(3).max(255).required(),
        productColour: joi.string().min(3).max(255).required(),
        productQuantity: joi.number().integer().positive().min(5).required(),


    };
    const result = joi.validate(sizes, schema)
    console.log(result)
    if(result.error === null){
        return true
    }else {
        alertMsg("error", "Ooooooooooooopz!" , result.error.details[0].message)
        return false
    }
}



