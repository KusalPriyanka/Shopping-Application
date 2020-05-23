import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Swal from "sweetalert2";
import Chip from "@material-ui/core/Chip";
import HeightIcon from "@material-ui/icons/Height";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {hostUrl} from "../../Constannts/Constants";


export default class ShoppingCartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItem: this.props.cartItem,
            product: this.props.product,
            offer: this.props.offer,
            totalQuantity: this.props.totalQuantity,
            quantity: this.props.cartItem.quantity,
            isShowBackDrop: false

        }
    }

    updateForm = (e) => {
        this.setState({
            isShowBackDrop: true
        })
        let quantity = e.target.value
        let cart = null;
        axios.get(`${hostUrl}shoppingcarts/getShoppingCartByUserID`)
            .then(res => {
                cart = res.data;
                cart.cartItems.map(item => {
                    if (item._id === this.state.cartItem._id) {
                        item.quantity = quantity
                    }
                })
                let cartData = {
                    "cartItems": cart.cartItems
                }

                let url = "http://localhost:8080/api/shoppingcarts/UpdateCartItem"
                axios.put(url, cartData)
                    .then(response => {
                            this.setState({
                                quantity : quantity,
                                isShowBackDrop: false

                            })
                            this.ShowMsg('success',
                                "Success",
                                `Quantity Changed successfully`)
                            this.updateCart()
                        }
                    )
                    .catch(err => {
                        this.setState({
                            isShowBackDrop: false
                        })
                        this.ShowMsg('error', "Error Occurred", err)
                    })

            })
            .catch(err => {
                this.setState({
                    isShowBackDrop: false
                })
                this.ShowMsg('error', "Error Occurred", err)
            })
    }

    updateCart = () => {
        this.props.forceUpdateByChild()
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

    removeShoppingCartItem = () => {
        let status = this.checkLoginState();
        if (status) {
            this.setState({
                isShowBackDrop: true
            })
            let cart = null;
            axios.get("http://localhost:8080/api/shoppingcarts/getShoppingCartByUserID")
                .then(res => {
                    cart = res.data
                    if (cart.cartItems.length === 1) {
                        axios.delete(`http://localhost:8080/api/shoppingcarts/DeleteCartItem/${this.props.id}`)
                            .then(res => {
                                    this.setState({
                                        isShowBackDrop: false
                                    })
                                    this.ShowMsg('success',
                                        "Success",
                                        `${this.state.product.productName} deleted from your cart successfully`)
                                    this.updateCart();
                                }
                            )
                            .catch(err => {
                                this.setState({
                                    isShowBackDrop: false
                                })
                                this.ShowMsg('error', "Error Occurred", err)
                            })
                    } else {
                        console.log(cart.cartItems)
                        cart.cartItems = cart.cartItems.filter(cItem =>
                            cItem.productID !== this.state.cartItem.productID
                        )
                        console.log(cart.cartItems)
                        let url = "http://localhost:8080/api/shoppingcarts/UpdateCartItem"
                        let updatedCartItem = {
                            "cartItems": cart.cartItems
                        }

                        axios.put(url, updatedCartItem)
                            .then(res => {
                                    this.setState({
                                        isShowBackDrop: false
                                    })
                                    this.ShowMsg('success',
                                        "Success",
                                        `${this.state.product.productName} deleted from your cart successfully`)
                                    this.updateCart();
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

    totalQuantityToArray = (quantity) => {
        let totalQuantity = []
        for (let a = 1; a <= quantity; a++) {
            totalQuantity.push(a)
        }
        return totalQuantity
    }

    render() {

        return (
            <React.Fragment>
                <Container>

                    <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    <Paper className={'hoverable'} elevation={3} style={{marginTop: '20px', padding: "20px"}}>
                        <Grid container item>
                            <Grid item xs={12} sm={3} container alignItems={"center"} justify={"center"}>
                                <img style={{maxWidth: "100%"}} width={'130px'}
                                     src={this.state.product.productImageURLS[0].imageURL}/>
                            </Grid>
                            <Grid item justify={"left"} xs={12} sm={7}>
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
                                      label={this.state.cartItem.productSize}/>
                                <Chip style={{marginLeft: "10px"}}
                                      size={"small"} icon={<ColorLensIcon/>} color="secondary"
                                      label={this.state.cartItem.productColor}/>
                                {(this.state.offer !== null) ?
                                    <Chip style={{marginLeft: "10px", backgroundColor: "red", color: "#fff"}}
                                          size={"small"} icon={<LocalOfferIcon style={{color: "#fff"}}/>}
                                          label={`${this.state.offer.offerAmount}% off`}/> : <React.Fragment/>}
                                <Grid>
                                    <Typography variant={'h5'} color={"error"} align={"right"}
                                                style={{marginRight: "20px"}}>
                                        {this.state.product.productPrice}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={2} container alignItems={"flex-end"} justify={"center"}>

                                <Grid xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel id="demo-controlled-open-select-label">Quantity</InputLabel>
                                        <Select

                                            labelId="demo-controlled-open-select-label"
                                            id="category"
                                            name={'quantity'}
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            onOpen={this.handleOpen}
                                            value={this.state.quantity}
                                            onChange={e => this.updateForm(e)}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                this.totalQuantityToArray(this.state.totalQuantity).map(val => {
                                                    return <MenuItem key={val} value={val}>{val}</MenuItem>
                                                })}
                                        </Select>
                                    </FormControl>
                                    <Button

                                        variant="outlined"
                                        color="secondary"
                                        size={"large"}
                                        startIcon={<VisibilityOffIcon/>}
                                        style={{marginTop: "10px"}}
                                        onClick={() => this.removeShoppingCartItem()}
                                    >
                                        Remove
                                    </Button>
                                    <Divider light style={{marginTop: '10px'}}/>


                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>
                </Container>
            </React.Fragment>
        );
    }
}
