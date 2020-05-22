import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(170),
            height: theme.spacing(30),
            marginTop:'30px',
            marginLeft:'80px',
        },
    },
}));



export default function SimplePaperempty() {
    const classes = useStyles();

    return (
        <div className={classes.root}>


            <Paper elevation={3}>

                <Typography>
                    <h1 style={{marginLeft:"400px", marginTop:"60px", color:"#039be5"}}>No Items to Show....!</h1>
                    <h1 style={{marginLeft:"400px", marginTop:"10px", color:"#ff1744"}}>Please select an item and come....</h1>
                </Typography>
            </Paper>
        </div>
    );
}