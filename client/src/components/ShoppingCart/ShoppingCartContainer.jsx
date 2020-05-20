import React, {Component} from "react";
import ShoppingCartList from "./ShopingCartList";
import Total from "./Total";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingView from "../StoreManager/LoadingView/LoadingView";

export default class ShoppingCartContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shoppingCart : null,
            isShowBackDrop : false,
            productList : null,
            isCartEmpty : false,
            isLoading : true
        }
    }

    ShowMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    checkLoginState = () => {
        //localStorage.clear();
        let User;
        if (localStorage.getItem("user") !== null) {
            User = JSON.parse(localStorage.getItem("user"));
            axios.defaults.headers.common["auth-token"] = JSON.parse(
                localStorage.getItem("user")
            ).userToken;
        }
        if (User) {
            return true
        } else {
            return false
        }

    }

    componentDidMount() {

        let status = this.checkLoginState();
        if(status){
            let shoppingCart, productList;
            this.setState({
                isShowBackDrop : true,
            })
            axios.get("http://localhost:8080/api/shoppingcarts/getShoppingCartByUserID")
                .then(res => {
                    shoppingCart = res.data;

                    if(shoppingCart){
                        axios.get('http://localhost:8080/api/products/')
                            .then(response => {
                                productList = response.data
                                this.setState({
                                    shoppingCart :shoppingCart,
                                    productList : productList,
                                    isShowBackDrop : false,
                                    isLoading : false
                                })
                            })
                            .catch(err => {
                                this.setState({
                                    isShowBackDrop : false,
                                })
                                this.ShowMsg('error', "Error Occurred", err)
                            })
                    }
                    else {
                        this.setState({
                            isShowBackDrop : false,
                            isLoading : false,
                            isCartEmpty : true
                        })
                    }

                })
                .catch(err => {
                    this.setState({
                        isShowBackDrop : false,
                    })
                    this.ShowMsg('error', "Error Occurred", err)
                })
        }else{
            this.ShowMsg('error', "Unauthorized User", "Please Log In to the System to continue!")
        }
    }



    render() {
        let cart, total = <React.Fragment></React.Fragment>
        if(this.state.shoppingCart !== null){
            cart = <ShoppingCartList />
            total = <Total/>
        }
        return (
            <React.Fragment>
                <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {(this.state.isLoading)
                    ? <LoadingView/>
                    :(this.state.isCartEmpty)? <h1>Your cart Is empty</h1>
                        : <React.Fragment>
                            {cart}
                            {total}
                        </React.Fragment>
                }


            </React.Fragment>
        );
    }
}
