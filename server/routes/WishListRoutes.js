const router = require("express").Router();
const WishLists = require('../model/WishList');
const verifyToken = require("./Authentication/VerifyToken");
/*
get all the data from the database
*/
router.get("/", (req, res) => {
    WishLists.find()
        .then(wishlists => res.send(wishlists))
        .catch(err => res.status(400).send('Error: ' + err))
})
/*
get the wishListItem by userId
*/
router.get("/getWishListByUserID", verifyToken, async (req, res) => {
    console.log(req.user._id)
    await WishLists.find({"userId": req.user._id})
        .then((wishlist) => res.status(200).send(wishlist[0]))
        .catch(err => res.status(400).send("Error : " + err))
});

/*
Add wishListItem to the database
*/
router.post('/AddToWishList', verifyToken, async (req, res) => {
    let wishlist = new WishLists({
        userId: req.user._id,
        watchingProducts: req.body.watchingProducts,
    });
    await wishlist.save()
        .then(() => res.send({wishListItemID: wishlist._id}))
        .catch(err => res.status(400).send('Error :' + err))
});

/*
Add wishListItem to the database
*/
router.put('/UpdateWishList', verifyToken, (req, res) => {
    WishLists.find({"userId": req.user._id})
        .then(wishlist => {
            WishLists.findById(wishlist[0]._id)
                .then(wishlist => {
                    wishlist.watchingProducts = req.body.watchingProducts
                    wishlist.save()
                        .then(() => res.send({wishlist_id: wishlist._id}))
                        .catch(err => res.status(400).send('Error :' + err))
                })

        });
});

/*
Delete a wishListItem from the cart
*/
router.delete("/DeleteWishListItem/:id", async (req, res) => {
    await WishLists.findByIdAndDelete(req.params.id)
        .then(() => res.send(req.params.id + " Deleted Successfully!"))
        .catch(err => res.status(400).send("Error : " + err))
});

module.exports = router;
