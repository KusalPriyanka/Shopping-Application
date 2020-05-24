import Swal from "sweetalert2";
import joi from "joi"

export const showMassage = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

export const checkoutDetailsValidation = (details) => {
    const schema = {
            Name: joi.string().required(),
            Address: joi.string().required(),
            Email: joi.string().email().required(),
            MobileNumber: joi.number().required(),

        }
    const result = joi.validate(details, schema)
    if (result.error === null) {
        return true
    } else {
        showMassage("error", "Please Fill The Details!", result.error.details[0].message)
        return false
    }
}

export const checkoutCardValidation = (details) => {
    const schema = {
        CardName: joi.string().required(),
        CardNumber: joi.string().required(),
        ExpDate: joi.string().email().required(),
        cvv: joi.number().positive().required(),

    };
    const result = joi.validate(details, schema)
    if (result.error === null) {
        return true
    } else {
        showMassage("error", "Please Fill The Details!", result.error.details[0].message)
        return false
    }
}
