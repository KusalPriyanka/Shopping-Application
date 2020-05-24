import React, {Component} from "react";
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import ShopIcon from '@material-ui/icons/Shop';
import Chip from '@material-ui/core/Chip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import CodeIcon from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Swal from "sweetalert2";
import {validateWishList} from "../../Validations/WatchListValidations"
import HomeNavigator from "../Shared/HomeNavigator";
import {withRouter} from "react-router-dom"

class MainProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            sizes: [],
            size: null,
            details: [],
            colors: [],
            color: null,
            quantity: null,
            error: false,
            errorText: "",
            selectedQuantity: 1,
            isShowBackDrop: false,
            userWishList: null,
            promoCode: null,
            discount: null,
            promoCodeApproved: false
        }

        this.getDetailsBySize = this.getDetailsBySize.bind(this)
        this.getQuantityByColor = this.getQuantityByColor.bind(this)
        this.addToWatchList = this.addToWatchList.bind(this)
    }

    componentDidMount() {
        this.setState({
            isShowBackDrop: true,

        })
/*Getting products by the ID*/
        let url = `https://ishoppingplaza.herokuapp.com/api/products/${this.props.productId}`;
        axios.get(url)
            .then(res => {
                let sizes = [];
                res.data.detailsWithSize.map((size) => {
                    sizes.push(size.productSize);
                });

      /* Getting the offers */
                const offersurl = "https://ishoppingplaza.herokuapp.com/api/offers/";
                axios.get(offersurl)
                    .then(response => {
                        let offers = response.data
                        let discount = null;
                        let promo = null;
                        console.log(offers)
                        offers.map(offer => {
                            offer.products.map(product => {
                                if (product._id === this.props.productId) {
                                    if (offer.offerType === "Discount") {
                                        discount = offer
                                    } else {
                                        promo = offer
                                    }
                                }
                            })
                        })

                        console.log("TEst")
                        console.log(offers)
                        console.log("Dis")
                        console.log(discount)
                        console.log(promo)

                        this.setState({
                            product: res.data,
                            sizes: sizes,
                            isShowBackDrop: false,
                            promoCode: promo,
                            discount: discount
                        })
                    }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
            console.log(err)
        })
    }
/*Getting the selected size*/
    getDetailsBySize = (SelectedSize) => {
        let details = [];
        this.state.product.detailsWithSize.map((size) => {
            if (size.productSize == SelectedSize) {
                details = size
            }
        });
        return details;
    };
/*Setting the selected color and size*/
    setSize = (e) => {
        let colors = [];
        let details = this.getDetailsBySize(e.target.value);
        details.productDetails.map((color) => {
            colors.push(color.productColour);
        });

        this.setState({
            size: e.target.value,
            colors: colors,
            details: details
        })
    }
/*Get Quantity by color*/
    getQuantityByColor = (selectedColor) => {
        let quantity;
        this.state.details.productDetails.map((color) => {
            if (color.productColour == selectedColor) {
                quantity = color.productQuantity;
            }
        });
        return quantity;
    };
/*Set color*/
    setColor = (e) => {
        let q = this.getQuantityByColor(e.target.value);
        this.setState({
            color: e.target.value,
            quantity: q
        })
    }
/*Set Quantity*/
    setQuantity = (e) => {
        let val = e.target.value;
        if (val <= 0) {
            this.setState({
                error: true,
                errorText: "Please Select One or More!",
                selectedQuantity: val
            })
        } else if (val > this.state.quantity) {
            this.setState({
                error: true,
                errorText: `One user Can Buy Maximum ${this.state.quantity}`,
                selectedQuantity: val
            })
        } else {
            this.setState({
                error: false,
                errorText: "",
                selectedQuantity: val
            })
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
/*Check ogin status of the user */
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
/*Function to add to wishlist*/
    addToWatchList = () => {
        let status = this.checkLoginState();
        if (status) {
            this.setState({
                isShowBackDrop: true
            })
            let wishList = {
                "watchingProducts": [
                    {
                        "productID": this.state.product._id,
                        "productSize": this.state.size,
                        "productColor": this.state.color,
                    }
                ]
            }
            let validate = validateWishList(wishList.watchingProducts[0])
            if (validate.state) {
                let userWishList = null;
                const getwishlistbyuserID = "https://ishoppingplaza.herokuapp.com/api/wishlists/getWishListByUserID";
                axios.get(getwishlistbyuserID)
                    .then(res => {
                        userWishList = res.data
                        if (res.data.length === 0) {


                            let url = "https://ishoppingplaza.herokuapp.com/api/wishlists/AddToWishList";

                            axios.post(url, wishList)
                                .then(res => {
                                        this.setState({
                                            isShowBackDrop: false
                                        })
                                        this.ShowMsg('success',
                                            "Success",
                                            `${this.state.product.productName} added to your watch list successfully`)
                                    }
                                )
                                .catch(err => {
                                    this.setState({
                                        isShowBackDrop: false
                                    })
                                    this.ShowMsg('error', "Error Occurred", err)
                                })
                        } else {
                            let alreadyAdded = false;
                            res.data.watchingProducts.map(product => {
                                if (product.productID === this.state.product._id) {
                                    alreadyAdded = true
                                }

                            })
                            if (alreadyAdded) {
                                this.setState({
                                    isShowBackDrop: false
                                })
                                this.ShowMsg('error', "Error Occurred", "This product is already in your wish list")
                            } else {
                                userWishList.watchingProducts.push(wishList.watchingProducts[0])


                                let url = "https://ishoppingplaza.herokuapp.com/api/wishlists/UpdateWishList";
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
                                                `${this.state.product.productName} added to your watch list successfully`)
                                        }
                                    )
                                    .catch(err => {
                                        this.setState({
                                            isShowBackDrop: false
                                        })
                                        this.ShowMsg('error', "Error Occurred", err)
                                    })
                            }
                        }
                    })
                    .catch(err => {
                        this.ShowMsg('error', "Error Occurred", err)
                    })
            } else {
                this.setState({
                    isShowBackDrop: false
                })
                this.ShowMsg(validate.icon, validate.title, validate.text)
            }

        } else {
            this.ShowMsg('error', "Unauthorized User", "Please Log In to the System to continue!")
            this.props.history.push("/login")
        }
    }
/*Validations for inputs*/
    validate = () => {
        if (this.state.size === null) {
            return {
                state: false,
                icon: "error",
                title: "Please Select a size",
                text: "You can not add product to cart without a size!"
            }
        }
        if (this.state.color === null) {
            return {
                state: false,
                icon: "error",
                title: "Please Select a color",
                text: "You can not add product to cart without a color!"
            }
        } else if (this.state.error === true) {
            return {
                state: false,
                icon: "error",
                title: "Please Select a valid quantity",
                text: this.state.errorText
            }
        } else {
            return {
                state: true,
            }
        }
    }
/*Getting the offer ID*/
    getOfferID = () => {
        if (this.state.promoCodeApproved) {
            return this.state.promoCode._id
        } else if (this.state.discount !== null) {
            return this.state.discount._id
        } else {
            return "NOT"
        }
    }

/*Function to add items for the cart*/
    addToCart = () => {
        let status = this.checkLoginState();
        if (status) {
            let validate = this.validate()
            if (validate.state) {
                let cart = null;
                const getshoppingcartuserbyid = "https://ishoppingplaza.herokuapp.com/api/shoppingcarts/getShoppingCartByUserID";
                axios.get(getshoppingcartuserbyid)
                    .then(res => {
                        cart = res.data;
                        if (cart.length === 0) {
                            let url = "api/shoppingcarts/AddToCart";
                            let cartItem = {
                                "cartItems": [
                                    {
                                        "productID": this.state.product._id,
                                        "productSize": this.state.size,
                                        "productColor": this.state.color,
                                        "quantity": this.state.selectedQuantity,
                                        "offerID": this.getOfferID()
                                    }
                                ]
                            }
                            axios.post(url, cartItem)
                                .then(response => {
                                        this.setState({
                                            isShowBackDrop: false
                                        })
                                        this.ShowMsg('success',
                                            "Success",
                                            `${this.state.product.productName} added to your cart successfully`)
                                    }
                                )
                                .catch(err => {
                                    this.setState({
                                        isShowBackDrop: false
                                    })
                                    this.ShowMsg('error', "Error Occurred", err)
                                })
                        } else {
                            let alreadyAddedToCart = false;
                            cart.cartItems.map(product => {
                                if (product.productID === this.state.product._id) {
                                    alreadyAddedToCart = true
                                }

                            })
                            if (alreadyAddedToCart) {
                                this.setState({
                                    isShowBackDrop: false
                                })
                                this.ShowMsg('error', "Error Occurred", "This product is already in your cart.Please select the quantity from the cart")
                            } else {
                                cart.cartItems.push({
                                    "productID": this.state.product._id,
                                    "productSize": this.state.size,
                                    "productColor": this.state.color,
                                    "quantity": this.state.selectedQuantity,
                                    "offerID": this.getOfferID()
                                })
                                let cartData = {
                                    "cartItems": cart.cartItems
                                }

                                let url = "https://ishoppingplaza.herokuapp.com/api/shoppingcarts/UpdateCartItem"
                                axios.put(url, cartData)
                                    .then(response => {
                                            this.setState({
                                                isShowBackDrop: false
                                            })
                                            this.ShowMsg('success',
                                                "Success",
                                                `${this.state.product.productName} added to your cart successfully`)
                                        }
                                    )
                                    .catch(err => {
                                        this.setState({
                                            isShowBackDrop: false
                                        })
                                        this.ShowMsg('error', "Error Occurred", err)
                                    })
                            }
                        }

                    })
                    .catch(err => {
                        this.ShowMsg('error', "Error Occurred", err)
                    })
            } else {
                this.setState({
                    isShowBackDrop: false
                })
                this.ShowMsg(validate.icon, validate.title, validate.text)
            }

        } else {
            this.ShowMsg('error', "Unauthorized User", "Please Log In to the System to continue!")
            this.props.history.push("/login")
        }
    }

/*Taking the promo code*/
    getPromoCode = () => {
        Swal.fire({
            title: 'Enter Promo Code',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputPlaceholder: 'Enter Promo Code',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            preConfirm: (code) => {

                if (!code) {
                    Swal.showValidationMessage(
                        `Please Enter Promo Code`
                    )
                } else {
                    if (code === this.state.promoCode.offerCode) {
                        this.setState({
                            promoCodeApproved: true
                        })
                        this.ShowMsg('success', "Promo Code Approved", `You Can get ${this.state.promoCode.offerAmount}% off for this product`)
                    } else {
                        this.ShowMsg('error', "Promo Code Rejected", "Please provide a valid promo code!")
                    }
                }
            },
        })
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    <HomeNavigator/>
                    {(this.state.product != null) ?
                        <Paper className={'hoverable'} elevation={3} style={{marginTop: '40px'}}>
                            <Container style={{padding: "30px"}}>
                                <Grid container item>
                                    <Grid item xs={12} sm={5} container alignItems={"center"} justify={"center"}>
                                        <img style={{maxWidth: "100%"}} width={'400px'}
                                             src={this.state.product.productImageURLS[0].imageURL}/>
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        <Typography variant={'h4'} color={"primary"}>
                                            {this.state.product.productName}
                                        </Typography>
                                        <Typography variant={'h6'}>
                                            {this.state.product.productCategory}
                                        </Typography>
                                        <Divider light style={{marginTop: '10px'}}/>
                                        <Typography paragraph style={{
                                            marginTop: '20px',
                                            marginBottom: '20px',
                                            textAlign: "justify"
                                        }}>
                                            {this.state.product.productDescription}
                                        </Typography>

                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <FormControl fullWidth required>
                                                    <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="size"
                                                        name={'category'}
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.state.size}
                                                        onChange={e => this.setSize(e)}
                                                    >
                                                        {this.state.sizes.map(size => {
                                                            return <MenuItem value={size} key={size}>{size}</MenuItem>
                                                        })}

                                                    </Select>
                                                </FormControl>
                                                {(this.state.size === null) ? <FormControl fullWidth required>
                                                    <InputLabel
                                                        id="demo-controlled-open-select-label">Color</InputLabel>
                                                    <Select
                                                        disabled
                                                        labelId="demo-controlled-open-select-label"
                                                        id="category"
                                                        name={'category'}
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.state.color}
                                                        onChange={e => this.setColor(e)}
                                                    >

                                                        {this.state.colors.map(color => {
                                                            return <MenuItem value={color}
                                                                             key={color}>{color}</MenuItem>
                                                        })}

                                                    </Select>
                                                </FormControl> : <FormControl fullWidth required>
                                                    <InputLabel
                                                        id="demo-controlled-open-select-label">Color</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="category"
                                                        name={'category'}
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.state.color}
                                                        onChange={e => this.setColor(e)}
                                                    >

                                                        {this.state.colors.map(color => {
                                                            return <MenuItem value={color}
                                                                             key={color}>{color}</MenuItem>
                                                        })}

                                                    </Select>
                                                </FormControl>}


                                                {(this.state.size === null || this.state.color === null)
                                                    ? <TextField disabled type={'number'} label="Quantity" fullWidth/>
                                                    : <TextField error={this.state.error}
                                                                 helperText={this.state.errorText}
                                                                 value={this.state.selectedQuantity}
                                                                 onChange={e => this.setQuantity(e)} type={'number'}
                                                                 label="Quantity" id={'selectedQuantity'}
                                                                 name={'selectedQuantity'}
                                                                 autoComplete="selectedQuantity" fullWidth required/>}
                                                <div style={{marginTop: "20px"}}>
                                                    {(this.state.quantity != null) ?
                                                        <Chip size={"small"} color="secondary"
                                                              avatar={<Avatar>{this.state.quantity}</Avatar>}
                                                              label="Available"/> : <React.Fragment/>}


                                                    {(this.state.discount !== null) ?
                                                        <Chip style={{marginLeft: "10px"}}
                                                              size={"small"} icon={<LocalOfferIcon/>} color="primary"
                                                              label={` ${this.state.discount.offerAmount}% Discount`}/>
                                                        : <React.Fragment/>}

                                                    <Chip variant={"outlined"} style={{marginLeft: "10px"}}
                                                          size={"small"} icon={<VisibilityIcon/>} color="primary"
                                                          label={`${this.state.product.productWatchers} Views`}/>
                                                </div>
                                                <Divider style={{marginTop: "15px"}}></Divider>


                                                {
                                                    (this.state.promoCode !== null)
                                                        ? <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar style={{backgroundColor: "#4527a0"}}>
                                                                    <CodeIcon/>
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={`${this.state.promoCode.offerAmount}% off for Promo code`}
                                                            />
                                                            <ListItemSecondaryAction>

                                                                <Tooltip title="Add Promo Code">
                                                                    <IconButton onClick={() => this.getPromoCode()}
                                                                                style={{marginTop: "18px"}} edge="end"
                                                                                aria-label="delete">
                                                                        <PostAddIcon color={"primary"}/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        : <React.Fragment/>
                                                }


                                            </Grid>
                                            <Grid container item xs={12} sm={12} md={6} lg={6}>
                                                <Grid xs={12}>


                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        size={"large"}
                                                        startIcon={<AddShoppingCartIcon/>}
                                                        style={{marginTop: "10px"}}
                                                        onClick={() => this.addToCart()}
                                                    >
                                                        Add To Cart
                                                    </Button>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        color="primary"
                                                        size={"large"}
                                                        startIcon={<VisibilityIcon/>}
                                                        style={{marginTop: "10px"}}
                                                        onClick={() => this.addToWatchList()}
                                                    >
                                                        Add To Watch List
                                                    </Button>
                                                    <Divider light style={{marginTop: '10px'}}/>
                                                    <Grid style={{backgroundColor: '#cfe8fc', padding: "15px"}}>
                                                        <Typography variant={'h5'} color={"error"} align={"right"}>
                                                            RS - {this.state.product.productPrice} /-
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>


                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper> : <React.Fragment></React.Fragment>
                    }
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(MainProductView)
