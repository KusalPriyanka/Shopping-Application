import React,{Component} from "react";
import ShoppingCartContainer from "../ShoppingCart/ShoppingCartContainer";
import Swal from "sweetalert2";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default class CheckoutTable extends Component{

    constructor(props) {
        super(props);
        this.state={
            chkoutTotal:0,
            chkoutQuantity:0
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

//Pass value for the total
    assignTotal=()=>{
        this.setState({
            chkoutTotal:this.props.total,
            chkoutQuantity:this.props.quantity
        })
    }


    render() {
        return(

            <div>
                <container>
                    <Paper className={'hoverable'} elevation={3} style={{marginTop: '40px', padding: "20px", width:"500px",height:"100px"}}>


                        <Typography>{this.state.chkoutTotal}</Typography>
                        <Typography>{this.state.chkoutQuantity}</Typography>


                    </Paper>
                </container>
            </div>






        );
    }


}




