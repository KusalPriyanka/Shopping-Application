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

const updateCart = (id, quantity) => {

}

export default updateCart;
