import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddProductDetails from './AddProductDetails';
import AddProductSizeAndPrice from "./AddProductSize.jsx";
import AddProductImages from "./AddProductImages";
import LoadingView from "../LoadingView/LoadingView";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import '../../../css/hoverable.css'
import AddedSmallProductView from "./AddedSmallProductView";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";

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

export default function AddProduct(props) {
    const classes = useStyles();
    const history = useHistory();
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
    const [sizes, setSizes] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState([]);

    const refProductDetails = useRef();
    const refProductSize = useRef();
    const refProductImages = useRef();

    const handleClose = () => {
        setOpen(false);
    };

    const updateProductDetails = (productDetails) => {
        setProductDetails(productDetails);
    }

    const updateSizeAndPrice = (sizeAndPrice, sizes) => {
        setSizeAndPrice(sizeAndPrice);
        setSizes(sizes);
    }

    const alertMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }


    const onClickHandler = () => {
        let detailsWithSize = [];
        let b = {}

        sizes.map(size => {

            Object.defineProperty(b, "productSize", {
                value: size,
                writable: true,
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(b, "productDetails", {
                value: [],
                writable: true,
                enumerable: true,
                configurable: true
            });

            sizeAndPrice.map(item => {
                if (item.productSize === size) {
                    b.productDetails.push({
                        productColour: item.productColour,
                        productQuantity: item.productQuantity
                    })
                }
            })

            detailsWithSize.push(b)
            b = {}
        })

        const data = new FormData()
        for (let x = 0; x < selectedFile.length; x++) {
            data.append('file', selectedFile[x])
        }

        const uploadImages = "https://ishoppingplaza.herokuapp.com/api/products/upload";
        axios.post(uploadImages, data, {})
            .then(res => {

                let product = {
                    "productName": productDetails.productName,
                    "productDescription": productDetails.description,
                    "productCategory": productDetails.category,
                    "productImageURLS": res.data.files,
                    "productBrand": productDetails.brandName,
                    "productWatchers": 0,
                    "productPrice": productDetails.productPrice,
                    "detailsWithSize": detailsWithSize

                }
                const addProduct = "https://ishoppingplaza.herokuapp.com/api/products/AddProduct";
                axios.post(addProduct, product)
                    .then(res => {
                        setAddedProduct(res.data)
                        setOpen(false);
                        redirectToAllProduct();
                    }).catch(err => {
                    setOpen(false);
                    handleError(err);
                })

            }).catch(err => {
            setOpen(false);
            handleError(err);
        })
    }

    const handleError = (err) => {
        if (err.response.status === 401){
            alertMsg("error", "Something Went Wrong ", err.response.data)
            props.removeUser()
        }else {
            alertMsg("error", "Something Went Wrong ", err)
        }
    }

    const redirectToAllProduct = () => {
        Swal.fire({
            icon : "success",
            title: 'Done!',
            text : "Product Added to the Store Successfully.",

            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            preConfirm: (code) => {
                history.push("/storeManager")

            },
        })
    }


    const handleNext = () => {
        let state = true;
        if (activeStep === 0) {
            state = refProductDetails.current.validate()
        }
        if (activeStep === 1) {
            state = refProductSize.current.checkSize()
        }
        if (activeStep === 2) {
            state = refProductImages.current.checkImageSize()
        }
        if (state) {
            setActiveStep(activeStep + 1);
            if (activeStep === 2) {
                setOpen(true);
                onClickHandler();
            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const updateSelectedFile = (selectedFile) => {
        setSelectedFile(selectedFile);
    }

    const steps = ['Product Details', 'Product Size', 'Product Images'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddProductDetails ref={refProductDetails} product={productDetails}
                                          updateProductDetails={updateProductDetails}/>;
            case 1:
                return <AddProductSizeAndPrice ref={refProductSize} sizeAndPrice={sizeAndPrice} sizes={sizes}
                                               updateSizeAndPrice={updateSizeAndPrice}/>;
            case 2:
                return <AddProductImages ref={refProductImages} selectedFile={selectedFile}
                                         updateSelectedFile={updateSelectedFile}/>;
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
                                <Backdrop className={classes.backdrop} open={open} >
                                    <CircularProgress color="inherit"/>
                                </Backdrop>

                                {open ? <LoadingView/> : <React.Fragment><Typography variant="h5" gutterBottom>
                                    Product Added To Store SuccessFully
                                </Typography>
                                    <Grid container direction="row"
                                          justify="center"
                                          alignItems="center" spacing={5}>
                                        <Grid item xs={12}>
                                            <AddedSmallProductView product={addedProduct}/>
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
