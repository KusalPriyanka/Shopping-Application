import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SmallSnackbar from "../../Shared/SnackBar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/styles";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import {green, red} from "@material-ui/core/colors";

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

class AllDiscounts extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            open: false,
            isShow: false,
            isShowSnackBar: false,
            redirect: false,
            path: "",
            id: "",
        };
    }

    columns = [
        { title: "Size", field: "size" },
        { title: "Color", field: "color" },
        { title: "Quantity", field: "quantity", type: "numeric" },
        { title: "Price", field: "price", type: "numeric" },
    ];

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
            .get("http://localhost:8080/api/products/")
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
            return <Icon style={{ color: green[500] }}>edit</Icon>;
        else return <Icon style={{ color: red[500] }}>delete</Icon>;
    };

    deleteProduct = () => {
        this.setState({
            open: true,
        });
        axios
            .delete(
                `http://localhost:8080/api/products/DeleteProduct/${this.state.id}`
            )
            .then((res) => {
                this.setShowSnackBar();
                this.getProductsFromDB();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} className={classes.paper + " hoverable"}>
                        {this.state.isShowSnackBar ? (
                            <SmallSnackbar setShowSnackBar={this.setShowSnackBar} msg={"Product Deleted Successfully"}/>
                        ) : (
                            <React.Fragment></React.Fragment>
                        )}
                        <Backdrop className={classes.backdrop} open={this.state.open}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <MaterialTable
                            title="All Discounts"
                            columns={[
                                { title: "Name", field: "productName" },
                                { title: "Category", field: "productCategory" },
                                { title: "Watched", field: "productWatchers" },
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
                                        this.setRedirect("/storeManager/addProducts"),
                                },
                                {
                                    icon: () => this.getIcon("edit"),
                                    tooltip: "Update Discount",
                                    onClick: (event, rowData) =>
                                        alert("You saved " + rowData._id),
                                },
                                {
                                    icon: () => this.getIcon("delete"),
                                    tooltip: "Delete Discount",
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
                                                    fontSize: 100,
                                                    textAlign: "center",
                                                    color: "white",
                                                    backgroundColor: "#43A047",
                                                }}
                                            >
                                                <button onClick={() => alert(rowData._id)}>
                                                    wjfjhwire
                                                </button>
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

export default withStyles(styles)(AllDiscounts);
