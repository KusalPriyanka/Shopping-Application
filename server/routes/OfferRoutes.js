const router = require("express").Router();
const Offer =  require('../model/Offer');

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



module.exports = router;
