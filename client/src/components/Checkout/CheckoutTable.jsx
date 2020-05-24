import React,{Component} from "react";
import ShoppingCartContainer from "../ShoppingCart/ShoppingCartContainer";
import Swal from "sweetalert2";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Divider from "@material-ui/core/Divider";
import Checkout from "./Checkoutfile";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";





export default class CheckoutTable extends Component{


    constructor(props) {
        super(props);
        this.state = {
            firstName:"",
            address1:"",
            mobileNumber:"",
            email:"",
            checked:true,
            isShowBackDrop: false,
            checked2:true,
            cardName:'',
            cardNumber:'',
            expiaryDate:'',
            cvv:''

        }
    }
/*handle values in input fields*/
    ChangFieldsone=(e)=>{
        this.setState({
            firstName:e.target.value
        })
    }

    ChangFieldstwo=(e)=>{
        this.setState({
            address1:e.target.value
        })
    }

    ChangFieldsthree=(e)=>{
        this.setState({
            mobileNumber:e.target.value
        })
    }

    ChangFieldsfour=(e)=>{
        this.setState({
            email:e.target.value
        })
    }






/*handle checkbox status*/
    handleCheck=()=> {
        this.setState({checked: !this.state.checked});
    }

    handleChecktwo=()=> {
        this.setState({checked2: !this.state.checked2});
    }


   /* Handling payment details*/

    ChangeCardName=(e)=>{
        this.setState({
            cardName:e.target.value
        })
    }

    ChangeCardNumber=(e)=>{
        this.setState({
            cardNumber:e.target.value
        })
    }

    ChangeExpireDate=(e)=>{
        this.setState({
            expiaryDate:e.target.value
        })
    }

    cvv=(e)=>{
        this.setState({
            cvv:e.target.value
        })
    }

    /*check the states of the address details by clicking the submit button*/
    mySubmitHandler = (event) => {
        event.preventDefault();
        let sumName= alert((this.state.firstName)+ " " + (this.state.address1)+ " " +(this.state.mobileNumber)+" " +(this.state.email) +(this.state.cardName));
        return sumName;
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




    render() {

        return(

            <div>
                <container>
                   {/* Grid for the table*/}
                    <Grid container item>
                        <Grid item xs={12} sm={6} container alignItems={"center"}
                                      justify={"center"}>
                            <h1 style={{color:"#5c6bc0"}}>Your Checkout</h1>
                        <Paper className={'hoverable'} elevation={3} style={{ padding: "20px", width:"650px", marginLeft:"40px",marginBottom:"20px"}}>
                           {/*Address field*/}
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                  Checkout
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First name"
                                            fullWidth
                                            autoComplete="fname"
                                            onChange={this.ChangFieldsone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="address1"
                                            name="address1"
                                            label="Address line 1"
                                            fullWidth
                                            autoComplete="billing address-line1"
                                            onChange={this.ChangFieldstwo}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            label="Mobile Number"
                                            fullWidth
                                            autoComplete="billing mobileNumber"
                                            onChange={this.ChangFieldsthree}
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
                                            onChange={this.ChangFieldsfour}
                                        />
                                    </Grid>


                                  {/*Pay from card check box*/}
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox color="secondary"  name="savePay" value="yes" onChange={this.handleCheck}/>}
                                            label="Pay From Card"
                                        />
                                    </Grid>
                                   {/* Pay in cash check box*/}
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox color="secondary" name="saveCard" value="yes" onChange={this.handleChecktwo}/>}
                                            label="Pay In Cash"
                                        />

                                    </Grid>
                                </Grid>
                            </React.Fragment>
                          {/*Payment method */}
                    {/*Show details for first check box*/}
                            {(!this.state.checked)?
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    <h3>Payment method 1</h3>
                                    <h4 style={{color:"#5c6bc0"}} >Hello {this.state.firstName} Fill your card details here... </h4>

                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField required id="cardName" label="Name on card" fullWidth onChange={this.ChangeCardName}/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField required id="cardNumber" label="Card number" fullWidth onChange={this.ChangeCardNumber}/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField required id="expDate" label="Expiry date" fullWidth onChange={this.ChangeExpireDate} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            required
                                            id="cvv"
                                            label="CVV"
                                            helperText="Last three digits on signature strip"
                                            fullWidth
                                            onChange={this.cvv}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <form onSubmit={this.mySubmitHandler}>

                                            <input style={{color:"#1976d2"}}
                                                   type='submit'
                                            />
                                        </form>
                                    </Grid>



                                </Grid>
                            </React.Fragment>:
                                <React.Fragment></React.Fragment>}


                     {/*Show details for second check box*/}
                            {(!this.state.checked2)?
                            <React.Fragment>



                                <Typography variant="h6" gutterBottom>
                                    Payment method 2
                                    <h6>You are going to pay in cash</h6>
                                </Typography>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                        label="Cash on Delivery"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <form onSubmit={this.mySubmitHandler}>

                                        <input style={{color:"#1976d2"}}
                                               type='submit'
                                        />
                                    </form>
                                </Grid>
                            </React.Fragment>:

                            <React.Fragment></React.Fragment>}



                        </Paper>
                    </Grid>
                       {/* Paper for Showing Items and total*/}

                        <Grid item xs={12} sm={6} container alignItems={"center"}
                              justify={"center"} >

                            <Paper className={'hoverable'} elevation={3} style={{ padding: "30px", width:"500px",height:"160px", marginLeft:"40px"}}>
                                <h3 style={{color:"#d32f2f"}}>Total Payment</h3>
                                <h3>Total Items</h3>

                                <Grid container item>


                                </Grid>

                            </Paper>
                        </Grid>

                    </Grid>


                </container>
            </div>






        );
    }


}




