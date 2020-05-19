import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {red} from "@material-ui/core/colors";
import Visibility from "@material-ui/icons/Visibility";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from '@material-ui/core/Chip';
import {Link} from "react-router-dom";
import PopUpSlider from "../../Shared/PopUpSlider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Fab from '@material-ui/core/Fab';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import "../../../css/hoverable.css";

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

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

    return (
        <React.Fragment>
            <PopUpSlider
                isMobile={matches}
                handleOpen={handleOpen}
                setHandleOpen={setHandleOpen}
                product={product}
            />

            <Grid item xs={12} sm={12} md={6} lg={4} xl={4} container justify={"center"}>
                <Card className={classes.root + " hoverable"}>

                    <CardHeader
                        style={{backgroundColor: "rgba(10,3,3,0.04)"}}
                        avatar={


                            <Avatar className={classes.avatar}>
                                <StyledBadge badgeContent={49} color="primary">
                                    <LoyaltyIcon/>
                                </StyledBadge>
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

                        <Typography variant="body2" color="textSecondary" component="p">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" color={"primary"}>
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
                </Card>
            </Grid>
        </React.Fragment>
    );
}
