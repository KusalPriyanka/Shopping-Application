import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/styles";

const styles = (theme) => ({

    title: {
        //padding: theme.spacing(1),

        marginBottom: 20,
    },
    addCategoryCard: {
        textAlign: "center",
    },

    container: {
        //paddingTop: theme.spacing(4),
        //paddingBottom: theme.spacing(4),
    },
    paper: {
        //padding: theme.spacing(2),
        padding: 5,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class AddCategory extends Component{

    render() {
        const {classes, onChangeHandlerCategoryName, onChangeHandlerCategoryDescription, onSubmitHandler, categoryName, categoryDescription} = this.props;
        return (
            <Card className={classes.addCategoryCard}>
                <CardContent>
                    <div className={classes.title} ><Typography color='textPrimary' variant="h6" >Add Category</Typography></div>

                    <form Validate autoComplete="off" onSubmit={onSubmitHandler}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12} lg={12}>
                                {/*==================Category Name==================*/}
                                <TextField multiline fullWidth required id="CategoryName" label="Name" variant="outlined"
                                           value= {categoryName}
                                           onChange={onChangeHandlerCategoryName}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12} lg={12}>
                                {/*==================Category Description==================*/}
                                <TextField multiline fullWidth  required id="categoryDescription" label="Description" variant="outlined"
                                           value= {categoryDescription}
                                           onChange={onChangeHandlerCategoryDescription}
                                />
                            </Grid>
                        </Grid><br/>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12} lg={12}>
                                {/*==================Save Button==================*/}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(AddCategory);