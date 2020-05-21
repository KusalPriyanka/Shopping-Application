import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShopIcon from "@material-ui/icons/Shop";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Swal from "sweetalert2";

export default class ShoppingCartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItem: this.props.cartItem,
            product: this.props.product,
            offer: this.props.offer,
            isShowBackDrop: false

        }
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
                                    <Typography variant={'h4'} color={"primary"}>
                                        {this.state.product.productName}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant={'h5'}>
                                        {this.state.product.productBrand}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant={'h6'}>
                                        {this.state.product.productDescription}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant={'h5'} color={"error"} align={"right"}
                                                style={{marginRight: "20px"}}>
                                        {this.state.product.productPrice}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={2} container alignItems={"flex-end"} justify={"center"}>

                                <Grid xs={12}>

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
