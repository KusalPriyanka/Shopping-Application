import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import ShopIcon from "@material-ui/icons/Shop";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import HeightIcon from '@material-ui/icons/Height';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import CategoryIcon from '@material-ui/icons/Category';

export default class ViewMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product
        }
    }

    render() {
        return (
            <React.Fragment>
                <Paper className={'hoverable'} elevation={3}>
                    <Container style={{padding: "30px"}}>
                        <Grid container item>
                            <Grid item xs={12} sm={5} container alignItems={"center"} justify={"center"}>
                                <img style={{maxWidth: "100%"}} width={'400px'}
                                     src={this.state.product.productImageURLS[0].imageURL}/>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Typography variant={'h5'} color={"primary"}>
                                    {this.state.product.productName}
                                </Typography>
                                <Typography variant={'h6'}>
                                    {this.state.product.productCategory}
                                </Typography>
                                <Divider style={{marginTop: '10px', marginBottom: '5px'}}/>
                                <Typography variant={'subtitle1'}
                                            style={{textAlign: 'justify', textJustify: "inter-word"}}>
                                    {this.state.product.productDescription}
                                </Typography>
                                <Typography variant={'subtitle1'} color={"primary"}
                                            style={{textAlign: 'justify', textJustify: "inter-word"}}>
                                    Available Sizes
                                </Typography>
                                <Divider style={{marginTop: '5px', marginBottom: '5px'}}/>
                                {this.state.product.detailsWithSize.map(size => {
                                    return <Chip key={size._id} style={{marginLeft: "10px"}}
                                                 size={"small"} icon={<HeightIcon/>} color="primary"
                                                 label={size.productSize}/>
                                })}

                                <Typography variant={'subtitle1'} color={"secondary"}
                                            style={{marginTop: "15px"}}>
                                    Available Colors with Size
                                </Typography>
                                <Divider style={{marginTop: '5px', marginBottom: '5px'}}/>
                                {this.state.product.detailsWithSize.map(productDetails => {
                                    return (productDetails.productDetails[0].productColour.toLowerCase() !== "white")
                                        ? <Chip key={productDetails.productDetails[0]._id}
                                                style={{
                                                    marginLeft: "10px",
                                                    backgroundColor: productDetails.productDetails[0].productColour,
                                                    color: "white"
                                                }}
                                                size={"small"}
                                                icon={<ColorLensIcon style={{color: "white"}}/>}
                                                label={productDetails.productDetails[0].productColour + " - " + productDetails.productDetails[0].productQuantity}/>
                                        : <Chip style={{marginLeft: "10px"}}
                                                key={productDetails.productDetails[0]._id}
                                                size={"small"}
                                                variant={"outlined"}
                                                icon={<ColorLensIcon/>}
                                                color="primary"
                                                label={productDetails.productDetails[0].productColour + " - " + productDetails.productDetails[0].productQuantity}/>
                                })}
                                <Typography variant={'subtitle1'} color={"primary"}
                                            style={{marginTop: "15px"}}>
                                    Category
                                </Typography>
                                <Divider style={{marginTop: '5px', marginBottom: '5px'}}/>
                                <Chip style={{marginLeft: "10px"}}
                                      size={"small"} icon={<CategoryIcon/>} color="secondary"
                                      label={this.state.product.productCategory}/>
                                <Grid>
                                    <Typography variant={'h5'} color={"error"} align={"right"}
                                                style={{marginRight: "20px"}}>
                                        RS - {this.state.product.productPrice} /-
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Container>
                </Paper>
            </React.Fragment>
        );
    }
}
