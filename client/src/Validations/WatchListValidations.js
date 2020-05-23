export const validateWishList = (wishList) => {
    if (wishList.productSize === null) {
        return {
            state: false,
            icon: "error",
            title: "Please Select a size",
            text: "You can not add product to wish list without a size!"
        }
    }
    if (wishList.productColor === null) {
        return {
            state: false,
            icon: "error",
            title: "Please Select a color",
            text: "You can not add product to wish list without a color!"
        }
    } else {
        return {
            state: true,
        }
    }
}
