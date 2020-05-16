const route = require("express").Router();
const StoreManager = require("../model/StoreManeger");

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
        .then((sm) => res.send(sm))
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