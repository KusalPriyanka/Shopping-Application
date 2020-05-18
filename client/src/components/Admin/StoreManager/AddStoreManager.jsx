import React,{Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/styles";

const styles = (theme) => ({

    title: {
        //padding: theme.spacing(1),
        marginBottom: 10,
    },

    addStoreManagerCard: {
        textAlign: "center",
        // paddingRight: theme.spacing(2),
    },

    container: {
        //paddingTop: theme.spacing(4),
        //paddingBottom: theme.spacing(4),
    },
    paper: {
        //padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class AddStoreManager extends Component{
    render() {
        const {classes, fnOnChangeHandler, userName, userAddress, userEmail, userMobile, userPassword, fnHandleSubmit} = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
            <Card className={classes.addStoreManagerCard}>
                <CardContent>
                    <div className={classes.title} ><Typography color='textPrimary' variant="h6" >Add new store manager</Typography></div>

                    <form  autoComplete="off" onSubmit={fnHandleSubmit}>
                        <Grid container spacing={4}>
                            {/*=================== name ===================*/}
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    onChange={fnOnChangeHandler}
                                    name="userName"
                                    value={userName}
                                />
                            </Grid>
                            {/*=================== email ===================*/}
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    onChange={fnOnChangeHandler}
                                    name="userEmail"
                                    value={userEmail}
                                />
                            </Grid>
                            {/*=================== password ===================*/}
{/*                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    onChange={fnOnChangeHandler}
                                    name="userPassword"
                                    value={userPassword}
                                />
                            </Grid>*/}
                            {/*=================== address ===================*/}
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    required
                                    multiline={true}
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    variant="outlined"
                                    onChange={fnOnChangeHandler}
                                    name="userAddress"
                                    value={userAddress}
                                />
                            </Grid>
                            {/*=================== mobile no ===================*/}
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="mobileNo"
                                    label="Mobile Number"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={fnOnChangeHandler}
                                    name="userMobile"
                                    value={userMobile}
                                />
                            </Grid>
                        </Grid>

                        <br/>
                        {/*=================== button ===================*/}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            type="submit"
                        >
                            Save
                        </Button>

                    </form>

                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(AddStoreManager);