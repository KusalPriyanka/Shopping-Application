import React, {Component} from "react";
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Divider from "@material-ui/core/Divider";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import HeightIcon from '@material-ui/icons/Height';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import Chip from "@material-ui/core/Chip";
import {hostUrl} from "../../Constannts/Constants";
import {getRemainingQuantity} from "../../Validations/CartItemValidation";
import addToCart from "./AddToCart";


class WatchListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wID: this.props.wId,
            wItem: this.props.wItem,
            product: null,
            isShowBackDrop: false
        }
        this.addrProductToCart = this.addrProductToCart.bind(this)
    }

    componentDidMount() {
        this.props.productList.map(product => {
            if (product._id === this.props.watchItemId) {
                this.setState({
                    product: product
                })
            }
        })
    }
/*Sweet alert*/
    ShowMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }
/*Checking the log in status*/
    checkLoginState = () => {
        /*localStorage.clear();*/
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
/*Remove an item from the watchlist*/
    removeWatchListItem = () => {
        let status = this.checkLoginState();
        if (status) {
            this.setState({
                isShowBackDrop: true
            })
            let userWishList = null;
            const getwishlistuserbyID = process.env.apiURL || "http://localhost:8080/" + "api/wishlists/getWishListByUserID";
            axios.get(getwishlistuserbyID)
                .then(res => {
                    userWishList = res.data
                    console.log(userWishList)
                    if (res.data.watchingProducts.length === 1) {
                        const getshoppingcartbyuserId = process.env.apiURL || `http://localhost:8080/` + `api/wishlists/DeleteWishListItem/${this.state.wID}`;

                        axios.delete(getshoppingcartbyuserId)
                            .then(res => {
                                    this.setState({
                                        isShowBackDrop: false
                                    })
                                    this.ShowMsg('success',
                                        "Success",
                                        `${this.state.product.productName} deleted from your watch list successfully`)

                                    this.props.updateState()
                                }
                            )
                            .catch(err => {
                                this.setState({
                                    isShowBackDrop: false
                                })
                                this.ShowMsg('error', "Error Occurred", err)
                            })
                    } else {
                        console.log(userWishList.watchingProducts)
                        userWishList.watchingProducts = userWishList.watchingProducts.filter(wItem =>
                            wItem.productID !== this.state.product._id
                        )
                        console.log(userWishList.watchingProducts)
                        let url = "http://localhost:8080/" + "api/wishlists/UpdateWishList/"
                        let updateWishList = {
                            "watchingProducts": userWishList.watchingProducts
                        }

                        axios.put(url, updateWishList)
                            .then(res => {
                                    this.setState({
                                        isShowBackDrop: false
                                    })
                                    this.ShowMsg('success',
                                        "Success",
                                        `${this.state.product.productName} deleted from your watch list successfully`)
                                    this.props.updateState()
                                }
                            )
                            .catch(err => {
                                this.setState({
                                    isShowBackDrop: false
                                })
                                this.ShowMsg('error', "Error Occurred", err)
                            })
                    }

                })
                .catch(err => {
                    this.ShowMsg('error', "Error Occurred", err)
                })

        } else {
            this.ShowMsg('error', "Unauthorized User", "Please Log In to the System to continue!")
        }
    }

/*Function to Adding the products to cart from wish list*/
    addrProductToCart = () => {
        this.setState({
            isShowBackDrop: true
        })
        let cItem = {
            productSize: this.state.wItem.productSize,
            productColor: this.state.wItem.productColor,
            productQuantity: 1,
        }

        let url =  process.env.apiURL || `http://localhost:8080/` +`api/products/${this.state.product._id}`
        let latestProduct;
        axios.get(url).then(res => {
            latestProduct = res.data
            let quantity = getRemainingQuantity(latestProduct, cItem)
            if (quantity !== 0) {
                let cartItem = {
                    "cartItems": [
                        {
                            "productID": this.state.product._id,
                            "productSize": this.state.wItem.productSize,
                            "productColor": this.state.wItem.productColor,
                            "quantity": 1,
                            "offerID": "NOT"
                        }
                    ]
                }
                addToCart(cartItem, this.state.product._id, this.state.product.productName )
                this.setState({
                    isShowBackDrop: false
                })
            } else {
                this.setState({
                    isShowBackDrop: false
                })
                this.ShowMsg('error', "You Are Too late.", "Sorry, This Product Is Out Of Stock Now!")
            }
        }).catch(err => {
            this.setState({
                isShowBackDrop: false
            })
            this.ShowMsg("error", "Something Went Wrong!", err)
        })

    }

    render() {
        return (
            <React.Fragment>
                {(this.state.product != null)
                    ? <React.Fragment>
                        <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <Container>
                            <Paper className={'hoverable'} elevation={3} style={{marginTop: '40px', padding: "20px"}}>
                                <Grid container item>
                                    <Grid item xs={12} sm={3} container alignItems={"center"} justify={"center"}>
                                        <img style={{maxWidth: "100%"}} width={'130px'}
                                             src={this.state.product.productImageURLS[0].imageURL}/>
                                    </Grid>
                                    <Grid item justify={"left"} xs={12} sm={6} style={{padding: "10px"}}>
                                        <Grid>
                                            <Typography variant={'h6'} color={"primary"}>
                                                {this.state.product.productName}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography variant={'body1'}>
                                                {this.state.product.productBrand}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography variant={'subtitle2'}>
                                                {this.state.product.productDescription}
                                            </Typography>
                                        </Grid>
                                        <Divider style={{margin: "10px", marginLeft: "0px"}}/>
                                        <Chip style={{marginLeft: "10px"}}
                                              size={"small"} icon={<HeightIcon/>} color="primary"
                                              label={this.state.wItem.productSize}/>
                                        <Chip style={{marginLeft: "10px"}}
                                              size={"small"} icon={<ColorLensIcon/>} color="secondary"
                                              label={this.state.wItem.productColor}/>
                                        <Grid>
                                            <Typography variant={'h6'} color={"error"} align={"right"}
                                                        style={{marginRight: "20px"}}>
                                                RS - {this.state.product.productPrice} /-
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={3} container alignItems={"flex-end"} justify={"center"}>

                                        <Grid xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                size={"large"}
                                                startIcon={<AddShoppingCartIcon/>}
                                                style={{marginTop: "10px"}}
                                                onClick={this.addrProductToCart}
                                            >
                                                Add To Cart
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="secondary"
                                                size={"large"}
                                                startIcon={<VisibilityOffIcon/>}
                                                style={{marginTop: "10px"}}
                                                onClick={() => this.removeWatchListItem()}
                                            >
                                                Remove from List
                                            </Button>
                                            <Divider light style={{marginTop: '10px'}}/>


                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Container>
                    </React.Fragment>

                    : <React.Fragment></React.Fragment>

                }
            </React.Fragment>
        );
    }
}

export default WatchListItem;
