import React, {Component} from "react";
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ShopIcon from "@material-ui/icons/Shop";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Divider from "@material-ui/core/Divider";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";


class WatchListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wID: this.props.wId,
            product: null,
            isShowBackDrop: false
        }
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

    ShowMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

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

    removeWatchListItem = () => {
        let status = this.checkLoginState();
        if (status) {
            this.setState({
                isShowBackDrop: true
            })
            let userWishList = null;
            axios.get("http://localhost:8080/api/wishlists/getWishListByUserID")
                .then(res => {
                    userWishList = res.data
                    if (res.data.watchingProducts.length === 1) {
                        axios.delete(`http://localhost:8080/api/wishlists/DeleteWishListItem/${this.state.wID}`)
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
                        userWishList.watchingProducts = userWishList.watchingProducts.filter(wItem =>
                            wItem.productID !== this.state.product._id
                        )
                        let url = "http://localhost:8080/api/wishlists/UpdateWishList/"
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
                                    <Grid item justify={"left"} xs={12} sm={6}>
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
                                    <Grid item xs={12} sm={3} container alignItems={"center"} justify={"center"}>

                                        <Grid xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                size={"large"}
                                                startIcon={<ShopIcon/>}
                                            >
                                                Buy Now
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                size={"large"}
                                                startIcon={<AddShoppingCartIcon/>}
                                                style={{marginTop: "10px"}}
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
