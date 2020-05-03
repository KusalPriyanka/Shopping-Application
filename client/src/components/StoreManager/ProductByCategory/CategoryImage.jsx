import React from "react";
import {Button, Paper} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';


import '../../../css/hoverable.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));


const CategoryImage = (props) => {

    const classes = useStyles();
    return (
        <Paper
            className={classes.paper + " Project hoverable"}
            style={{
                backgroundColor: "#CE7E78",
                backgroundImage: `url(https://source.unsplash.com/featured/?fashion-${props.category.CategoryName})`,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: "fixed",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                marginBottom: '30px'

            }}
            elevation={10}
        >
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h2" component="h2">
                    {props.category.CategoryName}
                </Typography>
                <p>{props.category.categoryDescription}</p>
                <Button className="CheckButton">
                    View Products
                </Button>
            </Grid>
        </Paper>
    )
}

export default CategoryImage;
