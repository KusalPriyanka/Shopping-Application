const router = require("express").Router();
const ShoppingCarts = require("../model/ShoppingCart");
const verifyToken = require("./Authentication/VerifyToken");
/*
get all the data from the database
*/
router.get("/", (req, res) => {
  ShoppingCarts.find()
    .then((shoppingcarts) => res.send(shoppingcarts))
    .catch((err) => res.status(400).send("Error: " + err));
});
/*
get the shoppingCartItems by id
*/
router.get("/getShoppingCartByUserID", verifyToken, async (req, res) => {
  await ShoppingCarts.find({ userId: req.user._id })
    .then((shoppingcart) => res.send(shoppingcart[0]))
    .catch((err) => res.status(400).send("Error : " + err));
});

/*
Add product to the database
*/
router.post("/AddToCart", verifyToken, async (req, res) => {
  let shoppingcart = new ShoppingCarts({
    userId: req.user._id,
    cartItems: req.body.cartItems,
  });
  await shoppingcart
    .save()
    .then(() => res.send({ cartItemID: shoppingcart._id }))
    .catch((err) => res.status(400).send("Error :" + err));
});
/*
Delete a cart item from the cart
*/
router.delete("/DeleteCartItem/:id", verifyToken, async (req, res) => {
  await ShoppingCarts.findByIdAndDelete(req.params.id)
    .then(() => res.send(req.params.id + " Deleted Successfully!"))
    .catch((err) => res.status(400).send("Error : " + err));
});
/*
Update a cart item from the cart
*/
router.put("/UpdateCartItem", verifyToken, async (req, res) => {
  ShoppingCarts.find({ userId: req.user._id }).then((shoppingCartArray) => {
    let shoppingcart = shoppingCartArray[0];
    console.log(shoppingcart);

    shoppingcart.cartItems = req.body.cartItems;
    shoppingcart
      .save()
      .then(() => res.send({ cartItemID: shoppingcart._id }))
      .catch((err) => res.status(400).send("Error :" + err));
  });
});
router.delete("/DeleteCart", verifyToken, async (req, res) => {
  await ShoppingCarts.find({ userId: req.user._id })
      .then(cart => {
        ShoppingCarts.findByIdAndDelete(cart[0]._id)
            .then(() => res.send(req.params.id + " Deleted Successfully!"))
            .catch((err) => res.status(400).send("Error : " + err));
      })
      .catch((err) => res.status(400).send("Error : " + err));
});
module.exports = router;
