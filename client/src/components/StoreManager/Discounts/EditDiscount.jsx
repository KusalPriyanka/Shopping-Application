import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TransferList from "./TransferList";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {withStyles} from "@material-ui/styles";
import SnackBar from "../../Shared/SnackBar";

const styles = (theme) => ({
    backdrop: {
        zIndex: 1500,
        color: "#fff",
    },
    paper: {
        marginTop: "30px",
        marginBottom: "30px",
    },
});

class EditDiscount extends Component {
    constructor(props) {
        super(props);
        this.getSelectedList = React.createRef();
        this.state = {
            isDialogOpen: true,
            offerName: this.props.offer.offerName,
            offerAmount: this.props.offer.offerAmount,
            offerType: this.props.offer.offerType,
            productCategory: this.props.offer.productCategory,
            offerCode: this.props.offer.offerCode,
            products: null,
            restProducts: null,
            allCategories: '',
            isShowSnackBar: false,
            isListChanged: false

        }
    }

    handleClose = () => {
        this.props.showEditDiscountDialog(false, '')
    };

    updateForm = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }
    updateCategory = (e) => {
        this.setState({
            open: true,
            products: null,
            isListChanged: true
        })
        this.setProductByCategory(e.target.value)

    }

    setProductByCategory = (category) => {

        let productList = [];
        if (category == 'All') {
            axios
                .get("http://localhost:8080/api/products/")
                .then((res) => {
                    res.data.map(product => {
                        productList.push({
                            productName: product.productName,
                            imageURL: product.productImageURLS[0].imageURL,
                            _id: product._id,
                        })
                    })
                    this.setState({
                            productCategory: category,
                            products: productList,
                            open: false
                        }
                    )
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {

            let url = `http://localhost:8080/api/products/productByCategory/${category}`
            axios.get(url)
                .then(res => {
                    res.data.map(product => {
                        productList.push({
                            productName: product.productName,
                            imageURL: product.productImageURLS[0].imageURL,
                            _id: product._id,
                        })
                    })
                    this.setState({
                            productCategory: category,
                            products: productList,
                            open: false
                        }
                    )
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    componentDidMount() {
        this.setState({
            open: true
        })
        axios
            .get("http://localhost:8080/api/Categories/")
            .then((res) => {
                this.setProductByCategory(this.state.productCategory)
                this.setRestProduct(this.state.productCategory)
                this.setState({
                    allCategories: res.data,
                })

            })
            .catch((err) => {
                console.log(err);
            });
    }

    setRestProduct = (category) => {
        let productList = [];
        let restProducts = [];
        let restProductsShow = [];
        if (category == 'All') {
            axios
                .get("http://localhost:8080/api/products/")
                .then((res) => {
                    productList = res.data;
                    restProducts = res.data;

                    productList.map(product => {
                        this.props.offer.products.map(sProduct => {
                            if (sProduct._id === product._id) {
                                restProducts = restProducts.filter((p) => p._id != sProduct._id)
                            }
                        })
                    })
                    restProducts.map(product => {
                        restProductsShow.push({
                            productName: product.productName,
                            imageURL: product.productImageURLS[0].imageURL,
                            _id: product._id,
                        })
                    })

                    this.setState({
                            restProducts: restProductsShow,
                            products: this.props.offer.products,
                            open: false
                        }
                    )
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {

            let url = `http://localhost:8080/api/products/productByCategory/${category}`
            axios.get(url)
                .then(res => {
                    productList = res.data;
                    restProducts = res.data;

                    productList.map(product => {
                        this.props.offer.products.map(sProduct => {
                            if (sProduct._id === product._id) {
                                restProducts = restProducts.filter((p) => p._id != sProduct._id)
                            }
                        })
                    })
                    restProducts.map(product => {
                        restProductsShow.push({
                            productName: product.productName,
                            imageURL: product.productImageURLS[0].imageURL,
                            _id: product._id,
                        })
                    })

                    this.setState({
                            restProducts: restProductsShow,
                            products: this.props.offer.products,
                            open: false
                        }
                    )
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    updateOffer = () => {
        this.setState({
            open: true
        })

        let promoCode;
        if (this.state.offerType === "Promo Code") {
            promoCode = this.state.offerCode
        } else {
            promoCode = "N/A"
        }

        let offer = {
            offerName: this.state.offerName,
            offerType: this.state.offerType,
            offerAmount: this.state.offerAmount,
            productCategory: this.state.productCategory,
            products: this.getSelectedList.current.getSelectedProducts(),
            offerCode: promoCode
        }

        axios
            .put(`http://localhost:8080/api/offers/UpdateOffer/${this.props.offer._id}`, offer)
            .then(res => {
                this.setState({
                    open: false,
                    isShowSnackBar: true,
                    isDialogOpen: false
                })
                this.props.showEditDiscountDialog(true, "")
            })
            .catch(err => {
                console.log(err)
            })

    }

    setShowSnackBar = () => {
        this.setState({
            isShowSnackBar: !this.state.isShowSnackBar,
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Backdrop className={classes.backdrop} open={this.state.open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {this.state.isShowSnackBar ? (
                    <SnackBar setShowSnackBar={this.setShowSnackBar} msg={"Offer Updated Successfully"}/>
                ) : (
                    <React.Fragment></React.Fragment>
                )}
                <Dialog open={this.state.isDialogOpen}
                        aria-labelledby="form-dialog-title"
                        maxWidth={"md"}
                >
                    <DialogTitle id="form-dialog-title" style={{color: "green"}}>Edit Offer</DialogTitle>
                    <Divider/>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    id="offerName"
                                    name="offerName"
                                    label="Offer Name"
                                    fullWidth
                                    autoComplete="fname"

                                    value={this.state.offerName}
                                    onChange={e => this.updateForm(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    id="offerAmount"
                                    name="offerAmount"
                                    label="Offer Amount"
                                    fullWidth
                                    autoComplete="offerAmount"
                                    type={"number"}
                                    value={this.state.offerAmount}
                                    onChange={e => this.updateForm(e)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth required>
                                    <InputLabel id="offerType">Offer Type</InputLabel>
                                    <Select

                                        labelId="offerType"
                                        id="offerType"
                                        name={'offerType'}
                                        value={this.state.offerType}
                                        onChange={e => this.updateForm(e)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Promo Code'}>Promo Code</MenuItem>
                                        <MenuItem value={'Discount'}>Discount</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth required>
                                    <InputLabel id="demo-controlled-open-select-label">Product Category</InputLabel>
                                    <Select

                                        labelId="demo-controlled-open-select-label"
                                        id="productCategory"
                                        name={'productCategory'}
                                        value={this.state.productCategory}
                                        onChange={e => this.updateCategory(e)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="All">All</MenuItem>
                                        {(this.state.allCategories != "") ? this.state.allCategories.map(category => {
                                            return <MenuItem key={category._id}
                                                             value={category.CategoryName}>{category.CategoryName}</MenuItem>
                                        }) : <React.Fragment></React.Fragment>}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {(this.state.offerType === 'Promo Code') ?
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="offerCode"
                                        name="offerCode"
                                        label="Promo Code"
                                        fullWidth
                                        autoComplete="brandName"
                                        value={this.state.offerCode}
                                        onChange={e => this.updateForm(e)}/>
                                </Grid>
                                : <React.Fragment></React.Fragment>
                            }

                        </Grid>
                        {(this.state.isListChanged === false && this.state.restProducts != null) ?
                            <TransferList
                                ref={this.getSelectedList}
                                left={this.state.restProducts}
                                right={this.state.products}
                            /> :
                            <React.Fragment/>}
                        {(this.state.isListChanged === false && this.state.restProducts === null) ?
                            <TransferList
                                ref={this.getSelectedList}
                                left={[]}
                                right={[]}
                            /> :
                            <React.Fragment/>}
                        {(this.state.isListChanged === true && this.state.products !== null) ?
                            <TransferList
                                ref={this.getSelectedList}
                                left={this.state.products}
                                right={[]}
                            /> :
                            <React.Fragment></React.Fragment>}

                        {(this.state.isListChanged === true && this.state.products === null) ?
                            <TransferList
                                ref={this.getSelectedList}
                                left={[]}
                                right={[]}
                            /> :
                            <React.Fragment></React.Fragment>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} style={{color: "green"}}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.updateOffer()} style={{color: "green"}}>
                            Edit Offer
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(EditDiscount);

