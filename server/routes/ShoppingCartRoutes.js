const router = require("express").Router();
const ShoppingCarts =  require('../model/ShoppingCart');
/*
get all the data from the database
*/
router.get("/",(req,res)=>{
    ShoppingCarts.find()
        .then(shoppingcarts => res.send(shoppingcarts))
        .catch(err => res.status(400).send('Error: ' + err))
})
/*
get the shoppingCartItems by id
*/
router.get("/:id", (req, res) => {
    ShoppingCarts.findById(req.params.id)
        .then((shoppingcart) => res.send(shoppingcart))
        .catch(err => res.status(400).send("Error : " + err))
});

/*
Add product to the database
*/
 router.post('/AddToCart',(req,res)=>{
     let shoppingcart = new ShoppingCarts({
         userId:req.body.userId,
         cartItems:req.body.cartItems,
         totalPrice:req.body.totalPrice
     });
     shoppingcart.save()
         .then(()=>res.send({cartItemID:shoppingcart._id}))
         .catch(err=>res.status(400).send('Error :' + err))
 });
/*
Delete a cart item from the cart
*/
router.delete("/DeleteCartItem/:id", (req, res) => {
    ShoppingCarts.findByIdAndDelete(req.params.id)
        .then(() => res.send(req.params.id + " Deleted Successfully!"))
        .catch(err => res.status(400).send("Error : " + err))
});
/*
Update a cart item from the cart
*/
router.put("/UpdateCartItem/:id",(req,res)=>{
    ShoppingCarts.findById(req.params.id)
        .then(shoppingcart=>{
            shoppingcart.userId=req.body.userId;
            shoppingcart.cartItems=req.body.cartItems;
            shoppingcart.totalPrice=req.body.totalPrice;

            shoppingcart.save()
                .then(()=>res.send({cartItemID:shoppingcart._id}))
                .catch(err=>res.status(400).send('Error :' + err))

        });
});

module.exports=router;

