import React, {Component} from "react";
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import SmallProductView from "../ProductView/SmallProductView";
import Grid from '@material-ui/core/Grid';
import CategoryImage from "./CategoryImage";
import Container from '@material-ui/core/Container';
import HomeNavigator from "../../Shared/HomeNavigator";


export default class ProductByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                CategoryName: this.props.match.params.category,
                categoryImageURL : "",
                categoryDescription  : ''
            },
            productList: [],
            open: false
        }
    }

    getProductsByCategory = () => {

        const getProductsByCat = `https://ishoppingplaza.herokuapp.com/api/products/productByCategory/${this.props.match.params.category}`;
        axios.get(getProductsByCat)
            .then(res => {
                this.setState({
                    productList: res.data,
                    open: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.setState({
            open: true
        })
        this.getProductsByCategory();
    }


    render() {
        return (
            <React.Fragment>
                <Backdrop style={{zIndex: '100', color: '#fff',}} open={this.state.open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <CategoryImage category={this.state.category}/>
                <HomeNavigator/>
                <Container>
                    <Grid container direction={"row"}>

                        {
                            (this.state.productList.length > 0) ?
                                this.state.productList.map(product => {
                                    return <SmallProductView key={product._id} product={product}/>
                                }) : <React.Fragment/>
                        }
                    </Grid>
                </Container>

            </React.Fragment>
        );
    }
}
