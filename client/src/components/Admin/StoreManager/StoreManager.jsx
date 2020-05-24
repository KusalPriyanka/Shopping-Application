import React,{Component} from "react";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddStoreManager from "./AddStoreManager";
import StoreManagerList from "./StoreManagerList";
import {withStyles} from "@material-ui/styles";
import Swal from "sweetalert2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import { Redirect } from "react-router-dom";
const axios = require('axios');

const styles = (theme) => ({

    title: {
        flexGrow: 1,
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

class StoreManager extends Component{
    state = {
        data: [],
        isLoading_add: false,
        isLoading_list: true,
        userName: '',
        userAddress: '',
        userEmail: '',
        userMobile: '',
        userPassword: '',
        validate: false,
        redirect: null,
    };

    //=============================== Add Store Manager functions ===============================
    //Handle change for all text fields
    fnOnChangeHandler = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
        //alert(JSON.stringify(this.state))
    };

    //Handle submit
    fnHandleSubmit = (e) => {
        this.setState({ isLoading_add: true})
        e.preventDefault();
        this.fnValidateAddStoreManager();
        if(this.state.validate)
        {
           this.setState({ isLoading_add: true})
            // Send a POST request to API
            axios.post("http://localhost:8080/api/StoreManager/AddStoreManager", {
                empName: this.state.userName.toString(),
                empAddress: this.state.userAddress.toString(),
                empEmail: this.state.userEmail.toString(),
                empContactNo: this.state.userMobile.toString(),
                empPassword: "abc123+"//this.state.userPassword.toString()
            })
                .then(result => {
                    //console.log(result);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Successfully Added!.`,
                        html: `Store manager ID: ( ${result.data._id} )`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.setState({
                        isLoading_add: false,
                        isLoading_list: true,
                    });
                    this.fnClearTextFeild();
                    this.fnGetStoreManagersFromDB();
                })
                .catch((err) => {
                    if(err.response.status === 401){
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.response.data
                        }).then((result) => {
                            this.setState({
                                redirect: "/employee"
                            })
                        });
                    }
                    if(err.response.status === 404){
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.response.data
                        }).then((result) => {
                            this.setState({
                                isLoading_add: false,
                            })
                            document.getElementById("email").focus();    //focus to category name
                        });
                    }
                    if(err.response.status === 400){
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.response.data
                        });
                    }
                });
        }

    }

    //Clear all text fields
    fnClearTextFeild = () => {
        this.setState({
            data: [],
            userName: '',
            userAddress: '',
            userEmail: '',
            userMobile: '',
            userPassword: ''
        });
    }

    //=============================== Store Manager List functions ===============================
    //Get all categories
    fnGetStoreManagersFromDB = () => {
        if(JSON.parse(localStorage.getItem("emp")) === null){
            this.setState({
                redirect: "/employee"
            })
        }else{
            axios
                .get("http://localhost:8080/api/StoreManager/", {
                    headers: {
                        "auth-token": JSON.parse(localStorage.getItem("emp")).empToken,
                    },
                })
                .then((res) => {
                    this.setState({
                        data: res.data,
                        isLoading_list: false,
                    });
                    //console.log(this.state.data)
                })
                .catch((err) => {
                    if(err.response.status === 401){
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.response.data
                        }).then((result) => {
                            this.setState({
                                redirect: "/employee"
                            })
                        });
                    }
                    if(err.response.status === 400){
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.response.data
                        });
                    }
                });
        }

    };

    componentDidMount() {
        if (localStorage.getItem("emp")) {
            axios.defaults.headers.common["auth-token"] = JSON.parse(
                localStorage.getItem("emp")
            ).empToken;
        }
        this.fnGetStoreManagersFromDB();
    }

    //handle delete store manager
    fnHandleDeleteStoreManager = (id) =>{
        //display warning alert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            //if click yes
            if (result.value) {
                this.setState({isLoading_list: true});
                axios
                    .delete(
                        `http://localhost:8080/api/StoreManager/DeleteStoreManager/${id}`  //delete store manager by id
                    )
                    .then((res) => {
                        Swal.fire(
                            `Successfully Deleted!.`,
                            `Store Manager ID: ( ${id} )`
                        )
                        this.fnGetStoreManagersFromDB();
                    })
                    .catch((err) => {
                        if(err.response.status === 401){
                            Swal.fire({
                                icon: "error",
                                title: "Something went wrong!",
                                text: err.response.data
                            }).then((result) => {
                                this.setState({
                                    redirect: "/employee"
                                })
                            });
                        }
                    });
            }
        })
    };

    //validate add store manager form
    fnValidateAddStoreManager = () => {
        let mobileNo = document.getElementById('mobileNo').value;
        if (mobileNo.length === 10) {
            this.setState({
                validate: true,
                isLoading_add: false
            });
        }
        else{
            this.setState({
                validate: false,
                isLoading_add: false,
            });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid phone number!',
            })
        }
    };

    render() {
        //setInterval(this.fnGetStoreManagersFromDB(), 5000); //Refresh every 5 seconds.
        const {classes, isDashboard} = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {isDashboard ? null :
                        <Grid container spacing={3} justify="center">
                            <Grid item xs={12} md={10} lg={6} >
                                {this.state.isLoading_add
                                    ? <Card style={{height:280}}>
                                        <CardContent>
                                            <Skeleton />
                                            <Skeleton animation={false} style={{height:100}}/>
                                            <Skeleton animation="wave" />
                                        </CardContent>
                                    </Card>
                                    :   <AddStoreManager
                                        fnOnChangeHandler={this.fnOnChangeHandler}
                                        userName={this.state.userName}
                                        userAddress={this.state.userAddress}
                                        userEmail={this.state.userEmail}
                                        userMobile={this.state.userMobile}
                                        userPassword={this.state.userPassword}
                                        fnHandleSubmit={this.fnHandleSubmit}
                                    />
                                }

                            </Grid>
                        </Grid >
                    }
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12} md={12} lg={12}>
                            {this.state.isLoading_list
                                ?
                                <Card style={{height:280}}>
                                    <CardContent>
                                        <Skeleton />
                                        <Skeleton animation={false} style={{height:100}}/>
                                        <Skeleton animation="wave" />
                                    </CardContent>
                                </Card>
                                :
                                <StoreManagerList
                                    data={this.state.data}
                                    fnHandleDeleteStoreManager={this.fnHandleDeleteStoreManager}
                                />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }

}

export default withStyles(styles)(StoreManager);