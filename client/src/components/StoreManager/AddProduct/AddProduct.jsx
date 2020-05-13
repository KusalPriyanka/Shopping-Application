import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddProductDetails from './AddProductDetails';
import AddProductSizeAndPrice from "./AddProductSizeAndPrice";
import AddProductImages from "./AddProductImages";
import LoadingView from "../LoadingView/LoadingView";
import ProductView from "../ProductView/SmallProductView";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import '../../../css/hoverable.css'

const useStyles = makeStyles((theme) => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(6),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function AddProduct() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [addedProduct, setAddedProduct] = React.useState({});
    const [productDetails, setProductDetails] = React.useState({
        productName: "",
        brandName: "",
        description: "",
        category: "",
        productPrice: ""
    });
    const [sizeAndPrice, setSizeAndPrice] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState([]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const updateProductDetails = (productDetails) => {
        setProductDetails(productDetails);
    }

    const updateSizeAndPrice = (sizeAndPrice) => {
        setSizeAndPrice(sizeAndPrice);
    }

    const onClickHandler = () => {

        const data = new FormData()
        for (let x = 0; x < selectedFile.length; x++) {
            data.append('file', selectedFile[x])
        }

        axios.post("http://localhost:8080/upload", data, {})
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(res.data.files)
                let imageHostUrl = res.data.url;

                let productImageURLS = [];
                res.data.files.map(image => {
                    productImageURLS.push({imageURL: imageHostUrl + '/images/' + image.filename})
                })

                let product = {
                    "productName": productDetails.productName,
                    "productDescription": productDetails.description,
                    "productCategory": productDetails.category,
                    "productImageURLS": productImageURLS,
                    "productBrand": productDetails.brandName,
                    "productWatchers": 0,
                    "productPrice" : productDetails.productPrice,

                    "detailsWithSize": [
                        {
                            "productSize": "small",
                            "productDetails": [{
                                "productPrice": 2300.00,
                                "productQuantity": 100,
                                "productColour": "BLack"
                            }]
                        },
                        {
                            "productSize": "Large",
                            "productDetails": [{
                                "productPrice": 2500.00,
                                "productQuantity": 200,
                                "productColour": "Red"
                            }]
                        }
                    ]
                }

                axios.post('http://localhost:8080/api/products/AddProduct', product)
                    .then(res => {
                        setAddedProduct(res.data)
                        setOpen(false);
                    }).catch(err => {
                    console.log(err)
                })

            }).catch(err => {
            console.log(err)
        })
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === 2) {
            setOpen(true);
            onClickHandler();
        }
    };

    const updateSelectedFile = (selectedFile) => {
        setSelectedFile(selectedFile);
    }

    const steps = ['Product Details', 'Product Size', 'Product Images'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddProductDetails product={productDetails} updateProductDetails={updateProductDetails}/>;
            case 1:
                return <AddProductSizeAndPrice sizeAndPrice={sizeAndPrice} updateSizeAndPrice={updateSizeAndPrice}/>;
            case 2:
                return <AddProductImages selectedFile={selectedFile} updateSelectedFile={updateSelectedFile}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper + " hoverable"}>
                    <Typography component="h1" variant="h4" align="center">
                        Add New Product
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ?
                            <React.Fragment>
                                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                                    <CircularProgress color="inherit"/>
                                </Backdrop>

                                {open ? <LoadingView/> : <React.Fragment><Typography variant="h5" gutterBottom>
                                    Product Added To Store SuccessFully
                                </Typography>
                                    <Grid container direction="row"
                                          justify="center"
                                          alignItems="center" spacing={5}>
                                        <Grid item xs={12} sm={6}>
                                            <ProductView product={addedProduct} />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>}

                            </React.Fragment>
                            :
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Add Product' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        }
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}
