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

export default class AllDiscounts extends Component{
    render() {
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} className={classes.paper + " hoverable"}>
                        {this.renderRedirect()}
                        {this.state.isShowSnackBar ? (
                            <SmallSnackbar setShowSnackBar={this.setShowSnackBar} msg={"Product Deleted Successfully"}/>
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
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <MaterialTable
                            title="All Products"
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
                                    tooltip: "Add New Product",
                                    isFreeAction: true,
                                    onClick: (event) =>
                                        this.setRedirect("/storeManager/addProducts"),
                                },
                                {
                                    icon: () => this.getIcon("edit"),
                                    tooltip: "Update Product",
                                    onClick: (event, rowData) =>
                                        alert("You saved " + rowData._id),
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
