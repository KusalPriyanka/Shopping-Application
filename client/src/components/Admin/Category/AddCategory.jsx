import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

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

export default function AddCategory(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Card className={classes.addCategoryCard}>
            <CardContent>
                <div className={classes.title} ><Typography color='textPrimary' variant="h4" >Add Category</Typography></div>

                <form className={classes.root} noValidate autoComplete="off">
                    <div style={{display: 'flex'}}>
                        <TextField multiline required id="CategoryName" label="Name" />

                        <TextField multiline={true} fullWidth  required id="categoryDescription" label="Description" />

                    </div> <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>


                </form>
            </CardContent>
        </Card>
    );

}