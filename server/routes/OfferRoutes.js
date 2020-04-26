const router = require("express").Router();
const Offer =  require('../model/Offer');

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

/*Router To Add Offers*/
router.post("/AddOffer", (req, res) =>{

    let offer  = new Offer({
        offerName : req.body.offerName,
        offerType : req.body.offerType,
        offerAmount : req.body.offerAmount,
        productCategory : req.body.productCategory,
        products : req.body.products,
        offerImageURL : req.body.offerImageURL,
        offerCode : req.body.offerCode,
        offerEndDate : req.body.offerEndDate
    });

    offer.save()
        .then(() => res.send({"OfferID": offer._id}))
        .catch(err => res.status(400).send('Error: ' + err))

});


/*Router to delete offer from db*/
router.delete("/DeleteOffer/:id", (req, res) => {
    Offer.findByIdAndDelete(req.params.id)
        .then(() => res.send(req.params.id + " Deleted!"))
        .catch(err => res.status(400).send("Error : " + err))
});



module.exports = router;
