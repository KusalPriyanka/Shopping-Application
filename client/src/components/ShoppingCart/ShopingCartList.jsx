import React, {Component} from "react";
import ShoppingCartItem from "./ShopingCartItem";


export default class ShoppingCartList extends Component {

    getProduct = (cartItem, productList) => {
        let product = null
        productList.map(p => {
            if(cartItem.productID === p._id){
                product = p
            }
        })
        return product;
    }

    getOffer = (cartItem, offers) => {
        let offer = null
        offers.map(o => {
            if (cartItem.offerID === o._id){
                offer = o
            }
        })
        return offer;
    }


    render() {
        const {shoppingCart, productList, offers, forceUpdateByChild} = this.props

        return (
            <React.Fragment>

                {shoppingCart.cartItems.map(cartItem => {
                    return <ShoppingCartItem
                        forceUpdateByChild={forceUpdateByChild}
                        key={cartItem._id}
                        id={shoppingCart._id}
                        cartItem={cartItem}
                        product={this.getProduct(cartItem, productList)}
                        offer={this.getOffer(cartItem, offers)}
                    />
                })}
            </React.Fragment>
        );
    }
}
