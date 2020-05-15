const router = require("express").Router();
const WishLists =require('../model/WishList');
/*
get all the data from the database
*/
router.get("/",(req,res)=>{
    WishLists.find()
        .then(wishlists => res.send(wishlists))
        .catch(err => res.status(400).send('Error: ' + err))
})
/*
get the wishListItem by userId
*/
router.get("/:id", (req, res) => {
    WishLists.find({"userId":req.params.id})
        .then((wishlist) => res.send(wishlist))
        .catch(err => res.status(400).send("Error : " + err))
});

/*
Add wishListItem to the database
*/
router.post('/AddToWishList',(req,res)=>{
    let wishlist = new WishLists({
        userId:req.body.userId,
        cartItems:req.body.cartItems,
    });
    wishlist.save()
        .then(()=>res.send({wishListItemID:wishlist._id}))
        .catch(err=>res.status(400).send('Error :' + err))
});

/*
Delete a wishListItem from the cart
*/
router.delete("/DeleteWishListItem/:id", (req, res) => {
    WishLists.findByIdAndDelete(req.params.id)
        .then(() => res.send(req.params.id + " Deleted Successfully!"))
        .catch(err => res.status(400).send("Error : " + err))
});

module.exports=router;
