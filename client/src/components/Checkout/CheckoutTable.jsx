import React, {Component} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Dialog from "@material-ui/core/Dialog";
import FormControl from '@material-ui/core/FormControl';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "../Shared/SnackBar";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {withStyles} from "@material-ui/styles";
import {checkoutCardValidation, checkoutDetailsValidation} from "../../Validations/CheckoutValidations"

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


class CheckoutTable extends Component {


    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            address1: "",
            email: "",
            mobileNumber :"",
            method: "cash",
            checked: true,
            isShowBackDrop: false,
            cardName: '',
            cardNumber: '',
            expDate: '',
            cvv: '',
            isDialogOpen: true,

        }
    }

    handleChange = (e) => {
        this.setState({
            method: e.target.value
        })
    };

    updateForm = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    validate = () => {
        let valid = true

        let details = {
            "Name" : this.state.firstName,
            "Address": this.state.address1,
            "Email": this.state.email,
            "MobileNumber" :this.state.mobileNumber,

        }
        valid = checkoutDetailsValidation(details)
        let card = {
            "CardName": this.state.cardName,
            "CardNumber": this.state.cardNumber,
            "ExpDate": this.state.expDate,
            "cvv": this.state.cvv,

        }
        if(this.state.method === 'card'){
            valid = checkoutCardValidation(card)
        }

        return valid
    }



    /*check the states of the address details by clicking the submit button*/
    placeOrder = (event) => {
        this.setState({
            isShowBackDrop: false
        })
        if(this.validate()){
            axios.delete("https://ishoppingplaza.herokuapp.com/api/shoppingcarts/DeleteCart")
                .then(res => {
                        this.setState({
                            isShowBackDrop: false
                        })
                        this.ShowMsg('success',
                            "Success",
                            ` Your Order Placed Successfully`)
                        this.handleClose();
                        this.props.forceUpdateByChild()
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

    ShowMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    checkLoginState = () => {
        let User;
        if (localStorage.getItem("user") !== null) {
            User = JSON.parse(localStorage.getItem("user"));
            axios.defaults.headers.common["auth-token"] = JSON.parse(
                localStorage.getItem("user")
            ).userToken;
        }
        if (User) {
            console.log(User)
            this.setState({
                firstName: User.userName,
                address1: User.userAddress,
                email: User.userEmail,
                mobileNumber: User.userMobile,
            })

            return true
        } else {
            return false
        }

    }

    componentDidMount() {
        this.checkLoginState()

    }

    handleClose = () => {
        this.props.showAddDiscountDialog(false)
    };

    render() {
        const {classes} = this.props;
        return (

            <div>
                <Backdrop className={classes.backdrop} open={this.state.open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {this.state.isShowSnackBar ? (
                    <SnackBar setShowSnackBar={this.setShowSnackBar} msg={"Offer Added Successfully"}/>
                ) : (
                    <React.Fragment></React.Fragment>
                )}
                <Dialog open={this.state.isDialogOpen}
                        aria-labelledby="form-dialog-title"
                        maxWidth={"md"}
                >

                    <DialogContent>

                        <container>

                            <Grid container item>
                                <Grid item xs={12} container alignItems={"center"}
                                      justify={"center"}>
                                    <h1 style={{color: "#5c6bc0"}}>Your Checkout</h1>
                                    <Paper className={'hoverable'} elevation={3} style={{
                                        padding: "20px",
                                        width: "650px",
                                        marginLeft: "40px",
                                        marginBottom: "20px"
                                    }}>

                                        <React.Fragment>
                                            <Typography variant="h6" gutterBottom>
                                                Address Details
                                            </Typography>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="firstName"
                                                        name="firstName"
                                                        label="Name"
                                                        fullWidth
                                                        autoComplete="fname"
                                                        value={this.state.firstName}
                                                        onChange={e => this.updateForm(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="email"
                                                        name="email"
                                                        label="Email"
                                                        fullWidth
                                                        autoComplete="billing email"
                                                        value={this.state.email}
                                                        onChange={e => this.updateForm(e)}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        id="address1"
                                                        name="address1"
                                                        label="Address"
                                                        fullWidth
                                                        autoComplete="billing address-line1"
                                                        value={this.state.address1}
                                                        onChange={e => this.updateForm(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        id="mobileNumber"
                                                        name="mobileNumber"
                                                        label="Mobile Number"
                                                        fullWidth
                                                        autoComplete="billing mobileNumber"
                                                        value={this.state.mobileNumber}
                                                        onChange={e => this.updateForm(e)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>

                                        <Typography variant="h6" gutterBottom style={{marginTop:"10px"}}>
                                            Payment Option
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="gender" name="gender1" value={this.state.method}
                                                        onChange={(e) => this.handleChange(e)}>
                                                <FormControlLabel value="cash" control={<Radio/>}
                                                                  label="By Cash On delivery"/>
                                                <FormControlLabel value="card" control={<Radio/>} label="By Card"/>
                                            </RadioGroup>
                                        </FormControl>
                                        {(this.state.method === "card") ?
                                            <React.Fragment>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField required name="cardName" label="Name on card" fullWidth
                                                                   value={this.state.cardName}
                                                                   onChange={e => this.updateForm(e)}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField required name="cardNumber" label="Card number"
                                                                   fullWidth value={this.state.cardNumber}
                                                                   onChange={e => this.updateForm(e)}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField required name="expDate" label="Expiry date" fullWidth
                                                                   value={this.state.expDate}
                                                                   onChange={e => this.updateForm(e)}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            required
                                                            name="cvv"
                                                            label="CVV"
                                                            helperText="Last three digits on signature strip"
                                                            fullWidth
                                                            type={"password"}
                                                            value={this.state.cvv}
                                                            onChange={e => this.updateForm(e)}
                                                        />
                                                    </Grid>


                                                </Grid>
                                            </React.Fragment> :
                                            <React.Fragment></React.Fragment>}

                                    </Paper>
                                </Grid>

                            </Grid>


                        </container>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.placeOrder()} color="primary">
                            Place Order
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


}

export default withStyles(styles)(CheckoutTable);



