import React, {useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddProductDetails from './UpdateProductDetails';
import AddProductSizeAndPrice from "./UpdateProductSize.jsx";
import AddProductImages from "./UpdateProductImages";
import LoadingView from "../LoadingView/LoadingView";
import ProductView from "../ProductView/SmallProductView";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import '../../../css/hoverable.css'


import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


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

    stepper: {
        padding: theme.spacing(1, 0, 5),
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

const getSizes = (product) => {
    let sizes = [];
    product.detailsWithSize.map((size) => {
        sizes.push(size.productSize);
    });
    return sizes
}

const getData = (product) => {
    let data = [];

    product.detailsWithSize.map(size => {
        size.productDetails.map(item => {
            let dataItem = {
                productSize: size.productSize,
                productQuantity: item.productQuantity,
                productColour: item.productColour,
            }
            data.push(dataItem)
        })
    });
    return data
}

const getImages = (product) => {
    let images = [];

    product.productImageURLS.map(image => {
        images.push(image.imageURL)
    });
    return images
}


export default function UpdateProduct(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(true);

    const [productDetails, setProductDetails] = React.useState({
        productName: props.updateProduct.productName,
        brandName: props.updateProduct.productBrand,
        description: props.updateProduct.productDescription,
        category: props.updateProduct.productCategory,
        productPrice: props.updateProduct.productPrice
    });
    const [sizeAndPrice, setSizeAndPrice] = React.useState(getData(props.updateProduct));
    const [sizes, setSizes] = React.useState(getSizes(props.updateProduct));
    const [selectedFile, setSelectedFile] = React.useState(getImages(props.updateProduct));

    const refProductDetails = useRef();
    const refProductSize = useRef();
    const refProductImages = useRef();


    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        props.hideUpdateDialog()
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const updateProductDetails = (productDetails) => {
        setProductDetails(productDetails);
    }

    const updateSizeAndPrice = (sizeAndPrice, sizes) => {
        setSizeAndPrice(sizeAndPrice);
        setSizes(sizes);
    }

    const DialogTitle = withStyles(styles)((props) => {
        const {children, classes, onClose, ...other} = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography color={"textSecondary"} variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleCloseDialog()}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    })

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

        let imageUrls = []

        selectedFile.map(image => {
            imageUrls.push({
                imageURL : image
            })
        })

        let product = {
            "productName": productDetails.productName,
            "productDescription": productDetails.description,
            "productCategory": productDetails.category,
            "productImageURLS": imageUrls,
            "productBrand": productDetails.brandName,
            "productWatchers": 0,
            "productPrice": productDetails.productPrice,
            "detailsWithSize": detailsWithSize

        }

        console.log(product)

        const updateProduct =  `https://ishoppingplaza.herokuapp.com/api/products/UpdateProduct/${props.updateProduct._id}`;
        axios.put(updateProduct, product)
            .then(res => {
                setOpen(false);
                handleCloseDialog()
                redirectToAllProduct()

            }).catch(err => {
            setOpen(false);
            handleError(err)
            handleCloseDialog()
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

    const alertMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    const redirectToAllProduct = () => {
        Swal.fire({
            icon : "success",
            title: 'Done!',
            text : "Product Update Successfully.",

            confirmButtonText: 'OK',
            showLoaderOnConfirm: true,
            preConfirm: (code) => {
               props.getProductsFromDB()
            },
        })
    }

    const handleNext = () => {
        let state = true;
        if (activeStep === 0) {
            state = refProductDetails.current.validate()
        }
        if(activeStep === 1){
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
                return <AddProductImages ref={refProductImages} selectedFile={selectedFile} updateSelectedFile={updateSelectedFile}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <React.Fragment>
            <Dialog style={{color: "green"}} aria-labelledby="customized-dialog-title" maxWidth={"lg"}
                    open={isDialogOpen}>
                <DialogTitle id="customized-dialog-title" onClose>
                    Edit Product
                </DialogTitle>
                <DialogContent dividers>
                    <main className={classes.layout}>


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
                                        Product Update Successfully
                                    </Typography>
                                        <Grid container direction="row"
                                              justify="center"
                                              alignItems="center" spacing={5}>
                                            <Grid item xs={12} sm={6}>

                                            </Grid>
                                        </Grid>
                                    </React.Fragment>}

                                </React.Fragment>
                                :
                                <React.Fragment>
                                    {getStepContent(activeStep)}

                                </React.Fragment>
                            }
                        </React.Fragment>
                    </main>
                </DialogContent>
                <DialogActions>
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
                                {activeStep === steps.length - 1 ? 'Update Product' : 'Next'}
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
