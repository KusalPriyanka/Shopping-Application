import axios from "axios";
import {hostUrl} from "../../Constannts/Constants"
import Swal from "sweetalert2";

let User;
if (localStorage.getItem("user") !== null) {
    User = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["auth-token"] = JSON.parse(
        localStorage.getItem("user")
    ).userToken;
}

const ShowMsg = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

const addToCart = (cartItem, id, name) => {
    let cart = null;
    axios.get(`${hostUrl}shoppingcarts/getShoppingCartByUserID`)
        .then(res => {
            cart = res.data;
            if (cart.length === 0) {
                let url = `${hostUrl}shoppingcarts/AddToCart`

                axios.post(url, cartItem)
                    .then(response => {

                        ShowMsg('success',
                            "Success",
                            `${name} added to your cart successfully`)
                        return true

                    })
                    .catch(err => {
                        ShowMsg('error', "Error Occurred", err)
                        return false
                    })
            } else {
                let alreadyAddedToCart = false;
                cart.cartItems.map(product => {
                    if (product.productID === id) {
                        alreadyAddedToCart = true
                    }

                })
                if (alreadyAddedToCart) {
                    ShowMsg('error', "Error Occurred", "This product is already in your cart.Please select the quantity from the cart")
                    return true
                } else {
                    cart.cartItems.push(cartItem.cartItems[0])
                    let cartData = {
                        "cartItems": cart.cartItems
                    }

                    let url = "http://localhost:8080/api/shoppingcarts/UpdateCartItem"
                    axios.put(url, cartData)
                        .then(response => {

                                ShowMsg('success',
                                    "Success",
                                    `${name} added to your cart successfully`)
                                return true
                            }
                        )
                        .catch(err => {
                            ShowMsg('error', "Error Occurred", err)
                            return false
                        })
                }
            }

        })
        .catch(err => {
           ShowMsg('error', "Error Occurred", err)
            return false
        })
}

export default addToCart;
