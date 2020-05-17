const route = require("express").Router();
const StoreManager = require("../model/StoreManeger");
var nodemailer = require('nodemailer');

/*Router to get all store managers from db*/
route.get("/", (req, res) =>{
    StoreManager.find()
        .then(StoreManager => res.send(StoreManager))
        .catch(err => res.status(400).send(`Error: ${err}`))
});

/*Router to get store manager by id from db*/
route.get("/:id", (req, res) =>{
    StoreManager.findById(req.params.id)
        .then(StoreManager => res.send(StoreManager))
        .catch(err => res.status(400).send(`Error: ${err}`))
});

/*Router to add store manager to db*/
route.post("/AddStoreManager", (req, res) =>{

    let sm = new StoreManager({
        userName: req.body.userName,
        userAddress: req.body.userAddress,
        userEmail: req.body.userEmail,
        userMobile: req.body.userMobile,
        userPassword: req.body.userPassword,
    });

    sm.save()
        .then((sm) => {
            res.send(sm);
            
            //send email to the newly created store manager
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'hotelbluedragon@gmail.com',
                pass: 'mad@2019'
                }
            });
            
            var mailOptions = {
                from: '"IshopPlaza" <IshopPlaza@gmail.com>',
                to: `${req.body.userEmail}`,
                subject: 'IshopPlaza',
                text: 'Your account has been created. Password: abc123+',
                html: `<b>Welcome to IshopPlaza! </b><br/><br/><br/>Your account has been created.<br/><br/>User name: ${req.body.userName}<br/>Password: abc123+`,
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            }); 
            
        })
        .catch((err) => res.status(400).send(`Error: ${err}`))

});

/*Router to delete store manager from db*/
route.delete("/DeleteStoreManager/:id", (req, res) =>{
    StoreManager.findByIdAndDelete(req.params.id)
        .then(sm => res.send(`Successfully Deleted!. Store manager ID: ( ${req.params.id} )`))
        .catch(err => res.status(400).send(`Error: ${err}`))
});

/*Router to Update store manager*/
route.put("/UpdateStoreManager/:id", (req, res) =>{
    StoreManager.findById(req.params.id)
        .then(sm =>{
            sm.userName = req.body.userName;
            sm.userAddress = req.body.userAddress;
            sm.userEmail = req.body.userEmail;
            sm.userMobile = req.body.userMobile;
            sm.userPassword = req.body.userPassword;

            sm.save()
                .then(() => res.send(sm))
                .catch(err => res.status(400).send(`Error: ${err}`))
        })
        .catch(err => res.status(400).send(`Error: ${err}`))
});

module.exports = route;