import React, {Component} from "react";
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ShopIcon from "@material-ui/icons/Shop";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Divider from "@material-ui/core/Divider";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography";

class WatchListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,

        }
    }

    componentDidMount() {
        this.props.productList.map(product => {
            if (product._id === this.props.watchItemId) {
                this.setState({
                    product: product
                })
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                {(this.state.product != null)
                    ? <React.Fragment>

                        <Container>
                            <Paper className={'hoverable'} elevation={3} style={{marginTop: '40px', padding: "20px"}}>
                                <Grid container item>
                                    <Grid item xs={12} sm={3} container alignItems={"center"} justify={"center"}>
                                        <img style={{maxWidth: "100%"}} width={'130px'}
                                             src={this.state.product.productImageURLS[0].imageURL}/>
                                    </Grid>
                                    <Grid item  justify={"left"} xs={12} sm={6} >
                                        <Grid >
                                            <Typography variant={'h4'} color={"primary"} >
                                                {this.state.product.productName}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography variant={'h5'}  >
                                                {this.state.product.productBrand}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography variant={'h6'}  >
                                                {this.state.product.productDescription}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography variant={'h5'} color={"error"} align={"right"} style={{marginRight:"20px"}}>
                                                {this.state.product.productPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={3} container alignItems={"center"} justify={"center"}>

                                        <Grid xs={12}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                size={"large"}
                                                startIcon={<ShopIcon/>}
                                            >
                                                Buy Now
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                size={"large"}
                                                startIcon={<AddShoppingCartIcon/>}
                                                style={{marginTop: "10px"}}
                                            >
                                                Add To Cart
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="secondary"
                                                size={"large"}
                                                startIcon={<VisibilityOffIcon/>}
                                                style={{marginTop: "10px"}}
                                                onClick={() => this.addToWatchList()}
                                            >
                                                Remove from List
                                            </Button>
                                            <Divider light style={{marginTop: '10px'}}/>


                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Container>
                    </React.Fragment>

                    : <React.Fragment></React.Fragment>

                }
            </React.Fragment>
        );
    }
}

export default WatchListItem;