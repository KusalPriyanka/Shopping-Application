import React, {Component} from "react";
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import ShopIcon from '@material-ui/icons/Shop';
import Chip from '@material-ui/core/Chip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

/*import '../../css/hoverable.css'*/


class MainProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            sizes: [],
            size: null,
            details: [],
            colors: [],
            color: null,
            quantity: null,
            error: false,
            errorText: "",
            selectedQuantity: 1,
            isShowBackDrop: false,
        }

        this.getDetailsBySize = this.getDetailsBySize.bind(this)
        this.getQuantityByColor = this.getQuantityByColor.bind(this)
    }

    componentDidMount() {
        this.setState({
            isShowBackDrop: true,
        })
        let url = `http://localhost:8080/api/products/${this.props.match.params.id}`
        axios.get(url)
            .then(res => {
                let sizes = [];
                res.data.detailsWithSize.map((size) => {
                    sizes.push(size.productSize);
                });
                this.setState({
                    product: res.data,
                    sizes: sizes,
                    isShowBackDrop: false,
                })
            }).catch(err => {
            console.log(err)
        })
    }

    getDetailsBySize = (SelectedSize) => {
        let details = [];
        this.state.product.detailsWithSize.map((size) => {
            if (size.productSize == SelectedSize) {
                details = size
            }
        });
        return details;
    };

    setSize = (e) => {
        let colors = [];
        let details = this.getDetailsBySize(e.target.value);
        details.productDetails.map((color) => {
            colors.push(color.productColour);
        });

        this.setState({
            size: e.target.value,
            colors: colors,
            details: details
        })
    }

    getQuantityByColor = (selectedColor) => {
        let quantity;
        this.state.details.productDetails.map((color) => {
            if (color.productColour == selectedColor) {
                quantity = color.productQuantity;
            }
        });
        return quantity;
    };

    setColor = (e) => {
        let q = this.getQuantityByColor(e.target.value);
        this.setState({
            color: e.target.value,
            quantity: q
        })
    }

    setQuantity = (e) => {
        let val = e.target.value;
        if (val <= 0) {
            this.setState({
                error: true,
                errorText: "Please Select One or More!",
                selectedQuantity: val
            })
        } else if (val > this.state.quantity) {
            this.setState({
                error: true,
                errorText: `One user Can Buy Maximum ${this.state.quantity}`,
                selectedQuantity: val
            })
        } else {
            this.setState({
                error: false,
                errorText: "",
                selectedQuantity: val
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
                    {(this.state.product != null) ?
                        <Paper className={'hoverable'} elevation={3} style={{marginTop: '40px'}}>
                            <Container style={{padding: "30px"}}>
                                <Grid container item>
                                    <Grid item xs={12} sm={5} container alignItems={"center"} justify={"center"}>
                                        <img style={{maxWidth: "100%"}} width={'400px'}
                                             src={this.state.product.productImageURLS[0].imageURL}/>
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        <Typography variant={'h4'} color={"primary"}>
                                            {this.state.product.productName}
                                        </Typography>
                                        <Typography variant={'h6'}>
                                            {this.state.product.productCategory}
                                        </Typography>
                                        <Divider light style={{marginTop: '10px'}}/>
                                        <Typography paragraph style={{
                                            marginTop: '20px',
                                            marginBottom: '20px',
                                            textAlign: "justify"
                                        }}>
                                            {this.state.product.productDescription}
                                        </Typography>

                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <FormControl fullWidth required>
                                                    <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="size"
                                                        name={'category'}
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.state.size}
                                                        onChange={e => this.setSize(e)}
                                                    >
                                                        {this.state.sizes.map(size => {
                                                            return <MenuItem value={size} key={size}>{size}</MenuItem>
                                                        })}

                                                    </Select>
                                                </FormControl>
                                                {(this.state.size === null) ? <FormControl fullWidth required>
                                                    <InputLabel
                                                        id="demo-controlled-open-select-label">Color</InputLabel>
                                                    <Select
                                                        disabled
                                                        labelId="demo-controlled-open-select-label"
                                                        id="category"
                                                        name={'category'}
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.state.color}
                                                        onChange={e => this.setColor(e)}
                                                    >

                                                        {this.state.colors.map(color => {
                                                            return <MenuItem value={color}
                                                                             key={color}>{color}</MenuItem>
                                                        })}

                                                    </Select>
                                                </FormControl> : <FormControl fullWidth required>
                                                    <InputLabel
                                                        id="demo-controlled-open-select-label">Color</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="category"
                                                        name={'category'}
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.state.color}
                                                        onChange={e => this.setColor(e)}
                                                    >

                                                        {this.state.colors.map(color => {
                                                            return <MenuItem value={color}
                                                                             key={color}>{color}</MenuItem>
                                                        })}

                                                    </Select>
                                                </FormControl>}


                                                {(this.state.size === null || this.state.color === null)
                                                    ? <TextField disabled type={'number'} label="Quantity" fullWidth/>
                                                    : <TextField error={this.state.error}
                                                                 helperText={this.state.errorText}
                                                                 value={this.state.selectedQuantity}
                                                                 onChange={e => this.setQuantity(e)} type={'number'}
                                                                 label="Quantity" id={'selectedQuantity'}
                                                                 name={'selectedQuantity'}
                                                                 autoComplete="selectedQuantity" fullWidth required/>}
                                                <div style={{marginTop: "20px"}}>
                                                    {(this.state.quantity != null) ?
                                                        <Chip size={"small"} color="secondary"
                                                              avatar={<Avatar>{this.state.quantity}</Avatar>}
                                                              label="Available"/> : <React.Fragment/>}
                                                    <Chip variant={"outlined"} style={{marginLeft: "10px"}}
                                                          size={"small"} icon={<VisibilityIcon/>} color="primary"
                                                          label={`${this.state.product.productWatchers} Views`}/>
                                                </div>
                                            </Grid>
                                            <Grid container item xs={12} sm={12} md={6} lg={6}>

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
                                                        color="primary"
                                                        size={"large"}
                                                        startIcon={<VisibilityIcon/>}
                                                        style={{marginTop: "10px"}}
                                                    >
                                                        Add To Watch List
                                                    </Button>
                                                    <Divider light style={{marginTop: '10px'}}/>
                                                    <Grid style={{backgroundColor: '#cfe8fc', padding: "15px"}}>
                                                        <Typography variant={'h5'} color={"error"} align={"right"}>
                                                            RS - {this.state.product.productPrice} /-
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>


                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper> : <React.Fragment></React.Fragment>
                    }
                </Container>
            </React.Fragment>
        )
    }
}

export default MainProductView;
