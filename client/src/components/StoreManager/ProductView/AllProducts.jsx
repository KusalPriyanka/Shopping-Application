import React, {Component} from 'react';
import MaterialTable from 'material-table';
import axios from "axios"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/styles';
import {green, red} from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SmallSnackbar from "../Shared/SnackBar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import '../../../css/hoverable.css'
import { Redirect } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const styles = (theme) => ({
    backdrop: {
        zIndex: 1500,
        color: '#fff',
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
            path : "",
            id: ""
        }
    }

    columns = [
        {title: 'Size', field: 'size'},
        {title: 'Color', field: 'color'},
        {title: 'Quantity', field: 'quantity', type: 'numeric'},
        {title: 'Price', field: 'price', type: 'numeric'},

    ]

    handleClickOpen = (id) => {
        this.setState({
            isShow: true,
            id: id
        })
    };

    handleClose = (acceptance) => {
        if (acceptance) {
            this.setState({
                isShow: false
            })
            this.deleteProduct()
        } else {
            this.setState({
                isShow: false
            })
        }
    };

    getProductsFromDB = () => {
        axios.get('http://localhost:8080/api/products/')
            .then(res => {
                this.setState({
                    data: res.data,
                    open: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.setState({
            open: true
        })
        this.getProductsFromDB();
    }

    setShowSnackBar = () => {
        this.setState({
            isShowSnackBar: !this.state.isShowSnackBar
        })
    }

    getIcon = (icon) => {

        if (icon === 'add')
            return <Icon color="primary">add_circle</Icon>
        else if (icon === 'edit')
            return <Icon style={{color: green[500]}}>edit</Icon>
        else
            return <Icon style={{color: red[500]}}>delete</Icon>
    }

    deleteProduct = () => {
        this.setState({
            open: true
        })
        axios.delete(`http://localhost:8080/api/products/DeleteProduct/${this.state.id}`)
            .then(res => {
                this.setShowSnackBar()
                this.getProductsFromDB();
            })
            .catch(err => {
                console.log(err)
            })
    }

    setRedirect = (path) => {
        this.setState({
            redirect: true,
            path : path
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.path} />
        }
    }


    render() {
        const {classes} = this.props
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} className={classes.paper + " hoverable"}>
                        {this.renderRedirect()}
                        {(this.state.isShowSnackBar) ? <SmallSnackbar setShowSnackBar={this.setShowSnackBar}/> :
                            <React.Fragment></React.Fragment>}
                        <Dialog
                            open={this.state.isShow}
                            TransitionComponent={Transition}
                            keepMounted
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle
                                id="alert-dialog-slide-title">{"Are you want to delete this product?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Let Google help apps determine location. This means sending anonymous location data
                                    to
                                    Google, even when no apps are running.
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
                                {title: 'Name', field: 'productName'},
                                {title: 'Category', field: 'productCategory'},
                                {title: 'Watched', field: 'productWatchers'},
                            ]}
                            data={this.state.data}
                            options={{
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#34569b',
                                    color: '#FFF'
                                },
                            }}
                            actions={[

                                {
                                    icon: () => this.getIcon("add"),
                                    tooltip: 'Add New Product',
                                    isFreeAction: true,
                                    onClick: (event) => this.setRedirect("/storeManager/addProducts")
                                },
                                {

                                    icon: () => this.getIcon("edit"),
                                    tooltip: 'Update Product',
                                    onClick: (event, rowData) => alert("You saved " + rowData._id)
                                },
                                {
                                    icon: () => this.getIcon("delete"),
                                    tooltip: 'Delete Product',
                                    // onClick: (event, rowData) => this.deleteProduct(rowData._id)
                                    onClick: (event, rowData) => this.handleClickOpen(rowData._id)
                                }
                            ]}

                            onRowClick={(event, rowData, togglePanel) => togglePanel()}
                            detailPanel={[
                                {
                                    tooltip: 'Show Name',
                                    render: rowData => {
                                        return (
                                            <div
                                                style={{
                                                    fontSize: 100,
                                                    textAlign: 'center',
                                                    color: 'white',
                                                    backgroundColor: '#43A047',
                                                }}
                                            >
                                                <button onClick={() => alert(rowData._id)}>wjfjhwire</button>
                                            </div>
                                        )
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



