import React, {Component} from "react";
import ShoppingCartList from "./ShopingCartList";
import Total from "./Total";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingView from "../StoreManager/LoadingView/LoadingView";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SimplePaperempty from "../EmptyPage/DisplayEmpty";
import SingleLineGridListcart from "./GridListCart";
import HomeNavigator from "../Shared/HomeNavigator";




export default class ShoppingCartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCart: null,
            isShowBackDrop: false,
            productList: null,
            offers : null,
            isCartEmpty: false,
            isLoading: true,
            quantity : 0,
            total : 0
        }
    }
/*Sweet alert*/
    ShowMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }
/*Check the log in status of the user*/
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
/*Updating*/
    forceUpdateByChild = () => {
        this.updateValues()
    }
/*Update the values*/
    updateValues = () => {
        let status = this.checkLoginState();
        if (status) {
            let shoppingCart, productList;
            this.setState({
                isShowBackDrop: true,
            })
            const getshoppingcartbyuserId = `https://ishoppingplaza.herokuapp.com/api/shoppingcarts/getShoppingCartByUserID`;

            axios.get(getshoppingcartbyuserId)
                .then(res => {
                    shoppingCart = res.data;

                    if (shoppingCart) {
                        const productsurl = "https://ishoppingplaza.herokuapp.com/api/products/";

                        axios.get(productsurl)
                            .then(response => {
                                productList = response.data
                                const offersurl = "https://ishoppingplaza.herokuapp.com/api/offers/";

                                axios.get(offersurl)
                                    .then(response => {
                                        this.setState({
                                            shoppingCart: shoppingCart,
                                            productList: productList,
                                            isShowBackDrop: false,
                                            isLoading: false,
                                            offers : response.data
                                        })
                                    }).catch(err => {
                                    this.ShowMsg('error', "Error Occurred", err)
                                })

                            })
                            .catch(err => {
                                this.setState({
                                    isShowBackDrop: false,
                                })
                                this.ShowMsg('error', "Error Occurred", err)
                            })
                    } else {
                        this.setState({
                            isShowBackDrop: false,
                            isLoading: false,
                            isCartEmpty: true
                        })
                    }

                })
                .catch(err => {
                    this.setState({
                        isShowBackDrop: false,
                    })
                    this.ShowMsg('error', "Error Occurred", err)
                })
        } else {
            this.ShowMsg('error', "Unauthorized User", "Please Log In to the System to continue!")
        }
    }

    componentDidMount() {
        this.updateValues()
    }
/*Get the particular product*/
    getProduct = (id, productList) => {
        let product = null
        productList.map(p => {
            if(id === p._id){
                product = p
            }
        })
        return product;
    }
/*Get the particular offer ID*/
    getOffer = (id, offers) => {
        let offer = null
        offers.map(o => {
            if (id === o._id){
                offer = o
            }
        })
        return offer;
    }
/*Calculating the total bill with quantity and price*/
    getTotal = (quantity, productId, offerId) => {
        let total = 0;
        let product = null
        let offer = null
        product = this.getProduct(productId, this.state.productList)
        offer = this.getOffer(offerId, this.state.offers)
        let offerAmount = 0;
        if(offer !== null){
            offerAmount = offer.offerAmount;
        }

        let discount = product.productPrice * offerAmount / 100
        total = (product.productPrice * quantity) - discount

        return total;

    }
/*Getting the quantity*/
    getQuantity = () => {
        let q = 0
        let t = 0
        this.state.shoppingCart.cartItems.map(item =>{
            q += item.quantity;
            t +=  this.getTotal(item.quantity, item.productID, item.offerID)

        })
        return {
            q : q,
            t : parseFloat(t.toFixed(2))
        };
    }



    render() {
        let cart, total = <React.Fragment></React.Fragment>
        if (this.state.shoppingCart !== null) {
            cart = <ShoppingCartList
                shoppingCart={this.state.shoppingCart}
                productList={this.state.productList}
                offers={this.state.offers}
                forceUpdateByChild={this.forceUpdateByChild}

            />
            let quantity = this.getQuantity().q
            let tot = this.getQuantity().t
            total = <Total
                total={tot}
                quantity={quantity}
            />
        }
        return (
            <React.Fragment>
                <h1 style={{marginLeft:"60px",color:"#283593"}}>Your Shopping Cart for your dreams...</h1>
                <SingleLineGridListcart/>
                <HomeNavigator/>
                <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {(this.state.isLoading)
                    ? <LoadingView/>
                    : (this.state.isCartEmpty) ?
                        <SimplePaperempty/>
                        : <React.Fragment>
                            <Container>
                                <Paper className={'hoverable'} elevation={3} style={{marginTop: '40px'}}>
                                    <Container style={{padding: "30px"}}>
                                        <Grid container item>
                                            <Grid item xs={12} sm={9} container alignItems={"center"}
                                                  justify={"center"}>
                                                {cart}
                                            </Grid>
                                            <Grid item xs={12} sm={3} container>
                                                <Grid item xs={12} >
                                                    <Paper elevation={6} variant="elevation" square
                                                           style={{marginTop:"20px" ,padding : "5px", borderColor: "#e7d2bd", borderWidth :"1px"}}>
                                                        {total}
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </Paper>
                            </Container>
                        </React.Fragment>
                }


            </React.Fragment>
        );
    }
}
