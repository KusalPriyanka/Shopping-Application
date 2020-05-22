import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


export default class Total extends Component {
    render() {
        return (
            <React.Fragment>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size={"large"}
                    startIcon={<AddShoppingCartIcon/>}
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
