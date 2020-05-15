import React, {Component} from "react";
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import WatchListItem from "./WatchListItem";
import LoadingView from "../StoreManager/LoadingView/LoadingView";

export default class WishList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userID : this.props.userID,
            watchList : [],
            isShowBackDrop : false,
            productList : null
        }
    }

    componentDidMount() {
        let userID = 33;
        let watchList, productList;
        this.setState({
            isShowBackDrop : true,
        })
        axios.get(`http://localhost:8080/api/wishlists/${userID}`)
            .then(res => {
                watchList = res.data;
                axios.get('http://localhost:8080/api/products/')
                    .then(response => {
                        productList = response.data
                        this.setState({
                            watchList :watchList,
                            productList : productList,
                            isShowBackDrop : false
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <React.Fragment>
                <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {(this.state.watchList.length === 0)?
                    <React.Fragment>
                        <LoadingView/> <LoadingView/>
                    </React.Fragment>:
                    this.state.watchList.watchingProducts.map(wItem => {
                        return <WatchListItem key={wItem._id} watchItemId={wItem.productID} productList={this.state.productList}/>
                    })
                }

            </React.Fragment>
        );
    }
}
