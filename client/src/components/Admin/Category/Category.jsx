import React, {Component} from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import {withStyles} from "@material-ui/styles";
import Swal from "sweetalert2";
import Skeleton from '@material-ui/lab/Skeleton';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Redirect } from "react-router-dom";
const axios = require('axios');

const styles = (theme) => ({

    title: {
        //padding: theme.spacing(1),
        marginBottom: 20,
    },
    root: {
        '& .MuiTextField-root': {
            //margin: theme.spacing(1),
            width: '25ch',
        },
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
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class Category extends Component {

    state = {
        categoryName: '',
        categoryDescription: '',
        editItem: false,
        data: [],
        validate: false,
        isLoading: true,
        isLoading_Add: false,
        id: "",
        redirect: null,
    };

    componentDidMount() {
        setInterval(this.getCategoryFromDB(), 5000); //Refresh every 5 seconds.
        if (localStorage.getItem("emp")) {
            axios.defaults.headers.common["auth-token"] = JSON.parse(
                localStorage.getItem("emp")
            ).empToken;
        }
        // this.getCategoryFromDB()
    }

    //=============================== Add Category functions ===============================
    //handle change event for category name
    onChangeHandlerCategoryName = (e) => {
        e.preventDefault();
        this.setState({
            categoryName: e.target.value
        });
    };
    //handle change event for category description
    onChangeHandlerCategoryDescription = (e) => {
        e.preventDefault();
        this.setState({
            categoryDescription: e.target.value
        });
    };
    //handle click save button
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({
            isLoading_Add: true,
        });

        //Check whether new category
        if (!this.state.editItem) {
            // Send a POST request to API
            const apiURL =
                process.env.apiURL || "http://localhost:8080/api/Categories/AddCategory";
            axios.post(apiURL, {
                CategoryName: this.state.categoryName.toString(),
                categoryImageURL: "test",
                categoryDescription: this.state.categoryDescription.toString()
            })
                .then(result => {
                    //console.log(result);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Successfully Added!.`,
                        html: `Category ID: ( ${result.data._id} )`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.setState({
                        isLoading_Add: false,
                    });
                    this.clearTextFeild();
                    this.getCategoryFromDB();
                })
                .catch(err => {
                    if (err.response.status === 401) {
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
                    if (err.response.status === 404) {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.response.data
                        }).then((result) => {
                            this.setState({
                                isLoading_Add: false,
                            })
                            document.getElementById("CategoryName").focus();    //focus to category name
                        });
                    }
                });
        }
        //Update category
        else if (this.state.editItem) {
            // Send a POST request to API
            const apiURL =
                process.env.apiURL || "http://localhost:8080/api/Categories/UpdateCategory";
            axios.put(`${apiURL}/${this.state.id}`, {
                CategoryName: this.state.categoryName.toString(),
                categoryImageURL: "test",
                categoryDescription: this.state.categoryDescription.toString()
            })
                .then(result => {
                    //console.log(result);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Successfully Updated!.`,
                        html: `Category ID: ( ${result.data._id} )`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.setState({
                        isLoading_Add: false,
                    });
                    this.clearTextFeild();
                    this.getCategoryFromDB();
                })
                .catch(err => {
                    if (err.response.status === 401) {
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
                    if (err.response.status === 404) {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: err.response.data
                        }).then((result) => {
                            this.setState({
                                isLoading_Add: false,
                            })
                            document.getElementById("CategoryName").focus();    //focus to category name
                        });
                    }
                });
        }

    };
    //Clear text field
    clearTextFeild = () => {
        this.setState({
            categoryName: '',
            categoryDescription: '',
            data: [],
            editItem: false,
            id: "",
            validate: false,
        });
    }

    //=============================== CategoryList ===============================
    //Get all categories
    getCategoryFromDB = () => {
        const apiURL =
            process.env.apiURL || "http://localhost:8080/api/Categories/";
        axios
            .get(apiURL)
            .then((res) => {
                this.setState({
                    data: res.data,
                    isLoading: false,
                });
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: err.response.data
                    })
                }
            });
    };

    //Handle edit category
    handleEditCategory = (id) => {
        //get category by id
        const apiURL =
            process.env.apiURL || "http://localhost:8080/api/Categories";
        axios
            .get(`${apiURL}/${id}`)
            .then((res) => {
                this.setState({
                    categoryName: res.data.CategoryName,
                    categoryDescription: res.data.categoryDescription,
                    editItem: true,
                    id: id,
                });
                document.getElementById("CategoryName").focus();    //focus to category name
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //handle delete category
    handleDeleteCategory = (id) => {
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
                const apiURL =
                    process.env.apiURL || "http://localhost:8080/api/Categories/DeleteCategory";
                axios
                    .delete(
                        `${apiURL}/${id}`  //delete category by id
                    )
                    .then((res) => {
                        Swal.fire(
                            `Successfully Deleted!.`,
                            `Category ID: ( ${id} )`
                        )
                        this.getCategoryFromDB();
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
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
    }


    render() {
        const {classes, isDashboard} = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {isDashboard ? null :
                            <Grid item xs={12} md={4} lg={4}>
                                {this.state.isLoading_Add
                                    ? <Card style={{height:280}}>
                                        <CardContent>
                                            <Skeleton />
                                            <Skeleton animation={false} variant="Please wait..."/>
                                            <Skeleton animation="wave" />

                                        </CardContent>
                                    </Card>
                                    :   <AddCategory
                                        categoryName={this.state.categoryName}
                                        categoryDescription={this.state.categoryDescription}
                                        onChangeHandlerCategoryName={this.onChangeHandlerCategoryName}
                                        onChangeHandlerCategoryDescription={this.onChangeHandlerCategoryDescription}
                                        onSubmitHandler={this.onSubmitHandler}
                                    />
                                }

                            </Grid>
                        }
                        <Grid item xs={12} md={8} lg={8}>
                            {this.state.isLoading
                                ? <Card style={{height:280}}>
                                    <CardContent>
                                        <Skeleton />
                                        <Skeleton animation={false} style={{height:100}}/>
                                        <Skeleton animation="wave" />
                                    </CardContent>
                                </Card>
                                :   <CategoryList
                                    getCategoryFromDB={this.getCategoryFromDB}
                                    handleEditCategory={this.handleEditCategory}
                                    handleDeleteCategory={this.handleDeleteCategory}
                                    data={this.state.data}
                                    isDashboard={isDashboard}
                                />
                            }

                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}
export default withStyles(styles)(Category);