const router = require("express").Router();
const Offer = require('../model/Offer');
const verifyToken = require("./Authentication/VerifyToken");

/*Router to get all Offers from db*/
router.get("/", (req, res) => {
    Offer.find()
        .then(offers => res.send(offers))
        .catch(err => res.status(400).send('Error: ' + err))

});

/*Router to get OfferById from db*/
router.get("/:id", (req, res) => {
    Offer.findById(req.params.id)
        .then((offer) => res.send(offer))
        .catch(err => res.status(400).send("Error : " + err))
});

/*Router to get Offer By Product Id from db*/
router.get("/GetProductOffer/:id", (req, res) => {
    Offer.find({"products.productID": req.params.id})
        .then((offer) => res.send(offer))
        .catch(err => res.status(400).send("Error : " + err))
});

/*Router To Add Offers*/
router.post("/AddOffer", verifyToken, async (req, res) => {

    if (req.user.userRole === 'storeManager') {
        let offer = new Offer({
            offerName: req.body.offerName,
            offerType: req.body.offerType,
            offerAmount: req.body.offerAmount,
            productCategory: req.body.productCategory,
            products: req.body.products,
            offerCode: req.body.offerCode,
        });

        await offer.save()
            .then(() => res.send({"OfferID": offer._id}))
            .catch(err => res.status(400).send('Error: ' + err))
    } else {
        return res.status(401).send("Access Denied!")
    }
});


/*Router to delete offer from db*/
router.delete("/DeleteOffer/:id", verifyToken, async (req, res) => {
    if (req.user.userRole === 'storeManager') {
        await Offer.findByIdAndDelete(req.params.id)
            .then(() => res.send(req.params.id + " Deleted!"))
            .catch(err => res.status(400).send("Error : " + err))
    } else {
        return res.status(401).send("Access Denied!")
    }

});

/*Router to Update Offer*/
router.put("/UpdateOffer/:id", verifyToken, async (req, res) => {
    if (req.user.userRole === 'storeManager') {
        await Offer.findById(req.params.id)
            .then(offer => {
                offer.offerName = req.body.offerName;
                offer.offerType = req.body.offerType;
                offer.offerAmount = req.body.offerAmount;
                offer.productCategory = req.body.productCategory;
                offer.products = req.body.products;
                offer.offerImageURL = req.body.offerImageURL;
                offer.offerCode = req.body.offerCode;
                offer.offerEndDate = req.body.offerEndDate;

                offer.save()
                    .then(() => res.send({OfferID: offer._id}))
                    .catch(err => res.status(400).send('Error: ' + err))
            })
            .catch(err => res.status(400).send("Error : " + err));
    } else {
        return res.status(401).send("Access Denied!")
    }
});

module.exports = router;
