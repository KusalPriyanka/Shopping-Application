import React, {Component} from "react";
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import WatchListItem from "./WatchListItem";
import LoadingView from "../StoreManager/LoadingView/LoadingView";
import Swal from "sweetalert2";
import SingleLineGridList from "./GridList";
import Container from "@material-ui/core/Container";
import SimplePaperempty from "../EmptyPage/DisplayEmpty";
import HomeNavigator from "../Shared/HomeNavigator";


export default class WishList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            watchList : null,
            isShowBackDrop : false,
            productList : null,
            state : true
        }
    }

    updateState = () => {
        this.updateDetails()
    }

    ShowMsg = (icon, title, text) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    checkLoginState = () => {
        /* localStorage.clear();*/
        let User;
        if (localStorage.getItem("user") !== null) {
            User = JSON.parse(localStorage.getItem("user"));
            axios.defaults.headers.common["auth-token"] = JSON.parse(
                localStorage.getItem("user")
            ).userToken;
        }
        if (User) {
            return true
        } else {
            return false
        }

    }

    updateDetails = () => {

        let status = this.checkLoginState();
        if(status){
            let watchList, productList;
            this.setState({
                isShowBackDrop : true,
            })
            axios.get("http://localhost:8080/api/wishlists/getWishListByUserID")
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
                            this.setState({
                                isShowBackDrop : false,
                            })
                            this.ShowMsg('error', "Error Occurred", err)
                        })
                })
                .catch(err => {
                    this.setState({
                        isShowBackDrop : false,
                    })
                    this.ShowMsg('error', "Error Occurred", err)
                })
        }else{
            this.ShowMsg('error', "Unauthorized User", "Please Log In to the System to continue!")
        }
    }

    componentDidMount() {
        this.updateDetails()
    }

    render() {
        return (
            <React.Fragment>

                <container>
                    <h1 style={{marginLeft:"90px", color:"#283593"}}>Collect Your Dream Wear</h1>
                </container>
                <SingleLineGridList/>
                <HomeNavigator/>
                <Backdrop style={{zIndex: '10000', color: '#fff',}} open={this.state.isShowBackDrop}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {(this.state.watchList === null)?
                    <React.Fragment>
                        <LoadingView/> <LoadingView/>
                    </React.Fragment>:
                    (this.state.watchList.length === 0)?
                        <React.Fragment>
                            <SimplePaperempty/>
                            <div className={"wishlist_show"}></div>

                        </React.Fragment>:
                        this.state.watchList.watchingProducts.map(wItem => {
                            return <WatchListItem
                                key={wItem._id}
                                wId={this.state.watchList._id}
                                wItem={wItem}
                                watchItemId={wItem.productID}
                                productList={this.state.productList}
                                updateState={this.updateState}
                            />
                        })
                }

            </React.Fragment>
        );
    }
}
