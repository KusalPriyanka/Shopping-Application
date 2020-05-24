import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import {productDetailsValidation} from "../../../Validations/ProductValidation";

export default class AddProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCategories: [],
            open: false,
            productName: this.props.product.productName,
            brandName: this.props.product.brandName,
            description: this.props.product.description,
            category: this.props.product.category,
            productPrice: this.props.product.productPrice,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            age: event.target.value
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    handleOpen = () => {
        this.setState({
            open: true
        })
    };

    updateForm = (e) => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    getCategoryFromDB = () => {
        let categories = [];
        axios
            .get("https://ishoppingplaza.herokuapp.com/api/Categories/")
            .then((res) => {
                res.data.forEach(category => {
                    categories.push(category.CategoryName)
                })
                this.setState({
                    allCategories: categories
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getCategoryFromDB()
    }

    componentWillUnmount() {
        this.props.updateProductDetails({
            productName: this.state.productName,
            brandName: this.state.brandName,
            description: this.state.description,
            category: this.state.category,
            productPrice: this.state.productPrice
        })
    }

    validate = () => {
        let productDetails = {
            "ProductName": this.state.productName,
            "BrandName": this.state.brandName,
            "Description": this.state.description,
            "Category": this.state.category,
            "ProductPrice": this.state.productPrice,
        }
        return productDetailsValidation(productDetails)

    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    General Details
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="productName"
                            name="productName"
                            label="Product Name"
                            fullWidth
                            autoComplete="fname"
                            value={this.state.productName}
                            onChange={e => this.updateForm(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="brandName"
                            name="brandName"
                            label="Brand Name"
                            fullWidth
                            autoComplete="brandName"
                            value={this.state.brandName}
                            onChange={e => this.updateForm(e)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel id="demo-controlled-open-select-label">Product Category</InputLabel>
                            <Select

                                labelId="demo-controlled-open-select-label"
                                id="category"
                                name={'category'}
                                open={this.state.open}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                value={this.state.category}
                                onChange={e => this.updateForm(e)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.allCategories.map(category => {
                                    return <MenuItem key={category} value={category}>{category}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="productPrice"
                            name="productPrice"
                            label="Product Price"
                            fullWidth
                            autoComplete="brandName"
                            value={this.state.productPrice}
                            onChange={e => this.updateForm(e)}
                            type={'number'}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Product Description"
                            fullWidth
                            multiline
                            autoComplete="billing address-line1"
                            value={this.state.description}
                            onChange={e => this.updateForm(e)}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
