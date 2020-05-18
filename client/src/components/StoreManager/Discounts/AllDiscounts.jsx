import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SmallSnackbar from "../../Shared/SnackBar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/styles";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import {blue, green, purple, red} from "@material-ui/core/colors";
import AddNewDiscount from "./AddNewDiscount";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DiscountListPopUp from "./DiscountListPopUp";
import EditDiscount from "./EditDiscount";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


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

class AllDiscounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            open: false,
            isShow: false,
            isShowSnackBar: false,
            isShowEditDialog: false,
            editOffer : '',
            id: "",
            showProductList : false,
            productList : ""
        };
        this.showAddDiscountDialog = this.showAddDiscountDialog.bind(this)
    }


    showAddDiscountDialog = (state) => {
        if (state) {
            this.setState({
                open: true
            })
            this.getProductsFromDB()
        } else {
            this.setState({
                isShowAddDialog: !this.state.isShowAddDialog
            })

        }
    }


    showEditDiscountDialog = (state, offer) => {
        if (state) {
            this.setState({
                open: true
            })
            this.getProductsFromDB()
        } else {
            this.setState({
                editOffer : offer,
                isShowEditDialog: !this.state.isShowEditDialog
            })

        }
    }

    handleClickOpen = (id) => {
        this.setState({
            isShow: true,
            id: id,
        });
    };

    handleClose = (acceptance) => {
        if (acceptance) {
            this.setState({
                isShow: false,
            });
            this.deleteProduct();
        } else {
            this.setState({
                isShow: false,
            });
        }
    };

    getProductsFromDB = () => {
        axios
            .get("http://localhost:8080/api/offers/")
            .then((res) => {
                this.setState({
                    data: res.data,
                    open: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.setState({
            open: true,
        });
        this.getProductsFromDB();
    }

    setShowSnackBar = () => {
        this.setState({
            isShowSnackBar: !this.state.isShowSnackBar,
        });
    };

    getIcon = (icon) => {
        if (icon === "add") return <Icon color="primary">add_circle</Icon>;
        else if (icon === "edit")
            return <Icon style={{color: green[500]}}>edit</Icon>;
        else if (icon === "list")
            return <Icon style={{color: purple[500]}}>list</Icon>;
        else
            return <Icon style={{color: red[500]}}>delete</Icon>;
    };

    deleteProduct = () => {
        this.setState({
            open: true,
        });
        axios
            .delete(
                `http://localhost:8080/api/offers/DeleteOffer/${this.state.id}`
            )
            .then((res) => {
                this.setShowSnackBar();
                this.getProductsFromDB();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    showOfferProductList = (productList) => {
        this.setState({
            productList : productList,
            showProductList : true
        })
    }

    hideOfferProductList = () => {
        this.setState({
            showProductList : false
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} className={classes.paper + " hoverable"}>

                        {this.state.isShowAddDialog ? (
                            <AddNewDiscount showAddDiscountDialog={this.showAddDiscountDialog}/>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                        {this.state.isShowEditDialog ? (
                            <EditDiscount showEditDiscountDialog={this.showEditDiscountDialog} offer={this.state.editOffer}/>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                        {this.state.isShowSnackBar ? (
                            <SmallSnackbar setShowSnackBar={this.setShowSnackBar} msg={"Offer Deleted Successfully"}/>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                        {this.state.showProductList ? (
                            <DiscountListPopUp
                                items={this.state.productList}
                                title={"ssdfsdsd"}
                                hideOfferProductList={this.hideOfferProductList} />
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}

                        <Dialog
                            open={this.state.isShow}
                            TransitionComponent={Transition}
                            keepMounted
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">
                                {"Do you want to delete this Offer?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    By confirming this, You give permission to delete this
                                    Offer.Note that this process can not be revert!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleClose(false)} color="primary">
                                    No, I'm Sorry
                                </Button>
                                <Button onClick={() => this.handleClose(true)} color="primary">
                                    Yes, I'm Sure
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Backdrop className={classes.backdrop} open={this.state.open}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <MaterialTable
                            title="All Offers"
                            columns={[
                                {title: "Name", field: "offerName"},
                                {title: "Type", field: "offerType"},
                                {title: "Category", field: "productCategory"},
                                {title: "Amount(%)", field: "offerAmount"},
                                {title: "Promo Code", field: "offerCode"},
                            ]}
                            data={this.state.data}
                            options={{
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: "#34569b",
                                    color: "#FFF",
                                },
                            }}
                            actions={[
                                {
                                    icon: () => this.getIcon("add"),
                                    tooltip: "Add New Discount",
                                    isFreeAction: true,
                                    onClick: (event) =>
                                        this.showAddDiscountDialog(false),
                                },
                                {
                                    icon: () => this.getIcon("list"),
                                    tooltip: 'Product List',
                                    onClick: (event, rowData) => this.showOfferProductList(rowData.products),
                                },
                                {
                                    icon: () => this.getIcon("edit"),
                                    tooltip: "Update Discount",
                                    onClick: (event, rowData) => this.showEditDiscountDialog(false, rowData)

                                },
                                {
                                    icon: () => this.getIcon("delete"),
                                    tooltip: "Delete Discount",
                                    // onClick: (event, rowData) => this.deleteProduct(rowData._id)
                                    onClick: (event, rowData) =>
                                        this.handleClickOpen(rowData._id),
                                },

                            ]}


                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withStyles(styles)(AllDiscounts);
