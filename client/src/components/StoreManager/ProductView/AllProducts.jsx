import React, {Component} from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/styles";
import {green, red} from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SmallSnackbar from "../../Shared/SnackBar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "../../../css/hoverable.css";
import {Redirect} from "react-router-dom";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import ViewMore from "./ViewMore";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

/*transition animation for dialog*/
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

/*styles*/
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

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            open: false,
            isShow: false,
            isShowSnackBar: false,
            redirect: false,
            isShowUpdateDialog: false,
            updateProduct: null,
            path: "",
            id: "",
        };
    }

    /*columns for tables*/
    columns = [
        {title: "Size", field: "size"},
        {title: "Color", field: "color"},
        {title: "Quantity", field: "quantity", type: "numeric"},
        {title: "Price", field: "price", type: "numeric"},
    ];

    alertMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    ShowUpdateDialog = (product) => {
        this.setState({
            updateProduct: product,
            isShowUpdateDialog: !this.state.isShowUpdateDialog
        })
    }

    hideUpdateDialog = () => {
        this.setState({
            updateProduct: null,
            isShowUpdateDialog: !this.state.isShowUpdateDialog,
        })
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
        this.setState({
            open: true,
        });
        const getAllProducts =  "https://ishoppingplaza.herokuapp.com/api/products/";
        axios
            .get(getAllProducts)
            .then((res) => {
                this.setState({
                    data: res.data,
                    open: false,
                });
            })
            .catch((err) => {
                this.setState({
                    open: false,
                });
                this.alertMsg("error", "Some Thing Went Wrong!", err)
            });
    };

    componentDidMount() {
        this.getProductsFromDB();
    }

    /*Notify by snack bar*/
    setShowSnackBar = () => {
        this.setState({
            isShowSnackBar: !this.state.isShowSnackBar,
        });
    };

    /*get table icons*/
    getIcon = (icon) => {
        if (icon === "add") return <Icon color="primary">add_circle</Icon>;
        else if (icon === "edit")
            return <Icon style={{color: green[500]}}>edit</Icon>;
        else return <Icon style={{color: red[500]}}>delete</Icon>;
    };

    deleteProduct = () => {
        this.setState({
            open: true,
        });
        const deleteProduct =  `https://ishoppingplaza.herokuapp.com/api/products/DeleteProduct/${this.state.id}`;
        axios
            .delete(deleteProduct)
            .then((res) => {
                this.setShowSnackBar();
                this.getProductsFromDB();
            })
            .catch((err) => {
                this.setState({
                    open: false,
                });
                this.handleError(err)

            });
    };

    handleError = (err) => {
        if (err.response.status === 401){
            this.alertMsg("error", "Something Went Wrong ", err.response.data)
            this.props.removeUser()
        }else {
            this.alertMsg("error", "Something Went Wrong ", err)
        }
    }

    setRedirect = (path) => {
        this.setState({
            redirect: true,
            path: path,
        });
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.path}/>;
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} className={classes.paper + " hoverable"}>
                        {this.renderRedirect()}
                        {this.state.isShowSnackBar ? (
                            <SmallSnackbar setShowSnackBar={this.setShowSnackBar} msg={"Product Deleted Successfully"}/>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}{(this.state.updateProduct !== null) ? (
                        <UpdateProduct getProductsFromDB={this.getProductsFromDB} updateProduct={this.state.updateProduct}
                                       hideUpdateDialog={this.hideUpdateDialog}/>
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
                                {"Are you want to delete this product?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    By confirming this, You give permission to delete this
                                    product.Note that this process can not be revert!
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
                            title="All Products"
                            columns={[
                                {title: "ID", field: "_id"},
                                {title: "Name", field: "productName"},
                                {title: "Brand", field: "productBrand"},
                                {title: "Category", field: "productCategory"},
                                {title: "Price", field: "productPrice"},
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
                                    tooltip: "Add New Product",
                                    isFreeAction: true,
                                    onClick: (event) =>
                                        this.setRedirect("/storeManager/addProducts"),
                                },
                                {
                                    icon: () => this.getIcon("edit"),
                                    tooltip: "Update Product",
                                    onClick: (event, rowData) =>
                                        this.ShowUpdateDialog(rowData)
                                },
                                {
                                    icon: () => this.getIcon("delete"),
                                    tooltip: "Delete Product",
                                    // onClick: (event, rowData) => this.deleteProduct(rowData._id)
                                    onClick: (event, rowData) =>
                                        this.handleClickOpen(rowData._id),
                                },
                            ]}
                            onRowClick={(event, rowData, togglePanel) => togglePanel()}
                            detailPanel={[
                                {
                                    tooltip: "Show Name",
                                    render: (rowData) => {
                                        return (
                                            <div
                                                style={{
                                                    marginTop: "0px",
                                                }}
                                            >
                                                <ViewMore product={rowData}/>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withStyles(styles)(AllProducts);
