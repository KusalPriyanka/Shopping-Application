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
const axios = require('axios').default;
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
        categoryName : '',
        categoryDescription: '',
        editItem: false,
        data: [],
        validate: false,
        isLoading: true,
        isLoading_Add: false,
        //isShow: false,
        //redirect: false,
        //path: "",
        id: "",
    };

    //=============================== Add Category functions ===============================
    //handle change event for category name
    onChangeHandlerCategoryName = (e) => {
        e.preventDefault();
        this.setState({
            categoryName:e.target.value
        });
    };
    //handle change event for category description
    onChangeHandlerCategoryDescription = (e) => {
        e.preventDefault();
        this.setState({
            categoryDescription:e.target.value
        });
    };
    //handle click save button
    onSubmitHandler = (e) =>{
        e.preventDefault();
        this.setState({
            isLoading_Add: true,
        });
        this.validateAddCategory();

        //Check whether new category
        if(!this.state.editItem ){ //&& this.state.validate
            // Send a POST request to API
            axios.post("http://localhost:8080/api/Categories/AddCategory", {
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
                .catch(err => console.error(err));
        }
        //Update category
        else if(this.state.editItem ){ //&& this.state.validate
            // Send a POST request to API
            axios.put(`http://localhost:8080/api/Categories/UpdateCategory/${this.state.id}`, {
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
                .catch(err => console.error(err));
        }

    };
    //Clear text field
    clearTextFeild = () => {
        this.setState({
            categoryName : '',
            categoryDescription: '',
            data: [],
            editItem: false,
            id: "",
            validate: false,
        });
    }
    //validate add category form
    validateAddCategory = () => {
        axios
            .get("http://localhost:8080/api/Categories/")
            .then((res) => {
                res.data.map( cat => {
                    if(cat.CategoryName === this.state.categoryName){   //Check whether category name is already added
                        this.setState({
                            validate: false
                        });
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'This category name is already added!',
                        })
                        setTimeout(function(){
                            document.getElementById("CategoryName").focus();    //focus to category name
                        }, 2000);
                    }
                    else{
                        this.setState({
                            validate: true
                        });
                    }
                })
                //console.log(this.state.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //=============================== CategoryList ===============================
    //Get all categories
    getCategoryFromDB = () => {
        axios
            .get("http://localhost:8080/api/Categories/")
            .then((res) => {
                this.setState({
                    data: res.data,
                    isLoading: false,
                });
                //console.log(this.state.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getCategoryFromDB()

    }

    //Handle edit category
    handleEditCategory  = (id) => {
        //get category by id
        axios
            .get(`http://localhost:8080/api/Categories/${id}`)
            .then((res) => {
              this.setState({
                  categoryName : res.data.CategoryName,
                  categoryDescription: res.data.categoryDescription,
                  editItem: true,
                  id: id,
                });
                document.getElementById("CategoryName").focus();    //focus to category name
                //console.log(this.state)
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
                axios
                    .delete(
                        `http://localhost:8080/api/Categories/DeleteCategory/${id}`  //delete category by id
                    )
                    .then((res) => {
                        Swal.fire(
                            `Successfully Deleted!.`,
                            `Category ID: ( ${id} )`
                        )
                        this.getCategoryFromDB();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
    };


    render() {
        setInterval(this.getCategoryFromDB(), 5000); //Refresh every 5 seconds.
        const {classes} = this.props;
        return(
            <div>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
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