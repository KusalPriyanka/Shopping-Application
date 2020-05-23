import React, {Component, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import StoreManager from "../StoreManager/StoreManager";
import Category from "../Category/Category";

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

export default function Dashboard(){

    const classes = useStyles();
    const [isDashboard, setIsDashboard] = useState({
        isDashboard:true
    })
    return(
        <div>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <StoreManager className={classes.paper}
                                      isDashboard={isDashboard}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Category className={classes.paper}
                                  isDashboard={isDashboard}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}