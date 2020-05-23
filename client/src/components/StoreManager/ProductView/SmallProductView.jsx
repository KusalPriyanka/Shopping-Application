import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {red} from "@material-ui/core/colors";
import Visibility from "@material-ui/icons/Visibility";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Link} from "react-router-dom";
import PopUpSlider from "../../Shared/PopUpSlider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Fab from '@material-ui/core/Fab';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import "../../../css/hoverable.css";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ViewMore from "./ViewMore";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const StyledBadge = withStyles((theme) => ({
    badge: {
        top: 13,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "20px",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    btn: {
        /* marginLeft: "auto",*/
    },
    avatar: {
        backgroundColor: red[500],
        width: theme.spacing(6),
        height: theme.spacing(6)
    },

    test: {
        marginTop: "-100px"
    }
}));


export default function SmallProductView(props) {
    const classes = useStyles();
    let product = props.product;
    const [handleOpen, setHandleOpen] = React.useState({open: false});
    const handleClick = () => {
        setHandleOpen({open: true});
    };
    const matches = useMediaQuery("(max-width:600px)");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <PopUpSlider
                isMobile={matches}
                handleOpen={handleOpen}
                setHandleOpen={setHandleOpen}
                product={product}
            />

            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} container justify={"center"}>
                <Card className={classes.root + " hoverable"} style={{width:"100%"}}>

                    <CardHeader
                        style={{backgroundColor: "rgba(10,3,3,0.04)"}}
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                Ip
                            </Avatar>
                        }
                        title={product.productName}
                        subheader={product.productBrand}
                    />
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{
                            backgroundImage: `url(${product.productImageURLS[0].imageURL})`,
                            height: "300px",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                    >
                        <Fab aria-label="edit" size="small" color={"default"} onClick={handleClick}>
                            <ZoomInIcon color={"primary"}/>
                        </Fab>
                    </Grid>
                    <CardContent>

                        <Typography variant="body2" color="textSecondary" style={{textAlign: 'justify', textJustify: "inter-word"}} component="p">
                            {product.productDescription}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={handleClickOpen} color={"primary"}>
                            <Visibility/>
                        </IconButton>
                        <IconButton
                            aria-label="settings"
                            component={Link}
                            to={`/mainProductViewContainer/${product._id}`}
                        >
                            <AddShoppingCartIcon color={"secondary"}/>
                        </IconButton>

                        <Typography variant="h6" color="secondary" component="h4" style={{marginLeft: "auto"}}>
                            RS - {product.productPrice}/-
                        </Typography>

                    </CardActions>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        fullWidth={"md"}
                        maxWidth={"md"}
                    >

                        <ViewMore product={product}/>
                    </Dialog>

                </Card>
            </Grid>
        </React.Fragment>
    );
}
