import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CheckoutTable from "../Checkout/CheckoutTable";


export default class Total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCheckout : false
        }
    }


    showAddDiscountDialog = () => {
        this.setState({
            isShowCheckout: !this.state.isShowCheckout
        })
    }

    render() {
        return (
            <React.Fragment>

                {this.state.isShowCheckout ? (
                    <CheckoutTable forceUpdateByChild={this.props.forceUpdateByChild}  showAddDiscountDialog={this.showAddDiscountDialog}/>
                ) : (
                    <React.Fragment></React.Fragment>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size={"large"}
                    startIcon={<AddShoppingCartIcon/>}
                    onClick={() => this.showAddDiscountDialog()}
                >
                    Add To Checkout
                </Button>
                <Divider light style={{marginTop: '10px'}}/>
                <Grid container item>
                    <Grid item xs={6}  alignItems={"left"}
                          justify={"center"}>
                        <Typography variant={'h6'} color={"textSecondary"} align={"left"}>
                            Items
                        </Typography>
                    </Grid>
                    <Grid item xs={6}  alignItems={"left"}
                          justify={"center"}>
                        <Typography variant={'h6'} color={"textSecondary"} align={"right"}>
                            {this.props.quantity}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider light style={{marginTop: '10px'}}/>
                <Grid container item style={{marginTop:"20px", marginBottom:"20px"}}>
                    <Grid item xs={6}  alignItems={"left"}
                          justify={"center"}>
                        <Typography variant={'h5'} color={"textSecondary"} align={"left"}>
                            Total
                        </Typography>
                    </Grid>
                    <Grid item xs={6}  alignItems={"left"}
                          justify={"center"}>
                        <Typography variant={'h6'} color={"error"} align={"right"}>
                            {`RS ${this.props.total}/-`}
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
