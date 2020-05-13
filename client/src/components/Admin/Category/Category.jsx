import React,{Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";

const useStyles = makeStyles((theme) => ({

    title: {
        padding: theme.spacing(1),
        marginBottom: 20,
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    addCategoryCard: {
        textAlign: "center",
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

export default function Category(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(
        <div>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>

                    <Grid item xs={4} md={4} lg={4}>
                        <AddCategory/>
                    </Grid>
                    <Grid item xs={8} md={8} lg={8}>
                        <CategoryList/>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
}