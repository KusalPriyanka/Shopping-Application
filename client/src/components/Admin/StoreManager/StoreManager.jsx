import React,{Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({

    title: {
        flexGrow: 1,
    },

    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function StoreManager(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(
        <div>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>

                    <Grid item xs={12} md={8} lg={9}>
                        <h1>StoreManager</h1>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
}