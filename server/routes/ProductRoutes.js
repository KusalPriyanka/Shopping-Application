const router = require("express").Router();
const Products = require("../model/Product");
const verifyToken = require("./Authentication/VerifyToken");

/*Router to get all Products from db*/
router.get("/", (req, res) => {
  Products.find()
    .then((products) => res.send(products))
    .catch((err) => res.status(400).send("Error: " + err));
});

/*Router to get ProductById from db*/
router.get("/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => res.send(product))
    .catch((err) => res.status(400).send("Error : " + err));
});

/*Router to get ProductByCategory from db*/
router.get("/productByCategory/:category", (req, res) => {
  Products.find({ productCategory: req.params.category })
    .then((products) => res.send(products))
    .catch((err) => res.status(400).send("Error : " + err));
});

/*Router to add Products to db*/
router.post("/AddProduct", verifyToken, (req, res) => {
  if(req.user.userRole === 'storeManager'){
      let product = new Products({
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productCategory: req.body.productCategory,
          productImageURLS: req.body.productImageURLS,
          productBrand: req.body.productBrand,
          productWatchers: req.body.productWatchers,
          productPrice: req.body.productPrice,
          detailsWithSize: req.body.detailsWithSize,
      });

      product
          .save()
          .then((product) => res.send(product))
          .catch((err) => res.status(400).send("Error: " + err));
  }else{
      return res.status(401).send("Access Denied!")
    }
});

/*Router to delete Products from db*/
router.delete("/DeleteProduct/:id", verifyToken, async (req, res) => {
    if(req.user.userRole === 'storeManager'){
        await Products.findByIdAndDelete(req.params.id)
            .then(() => res.send(req.params.id + " Deleted!"))
            .catch((err) => res.status(400).send("Error : " + err));
    }else {
        return res.status(401).send("Access Denied!")
    }

});

/*Router to Update Products*/
router.put("/UpdateProduct/:id", verifyToken, async (req, res) => {
    if(req.user.userRole === 'storeManager'){
        Products.findById(req.params.id)
            .then((product) => {
                product.productName = req.body.productName;
                product.productDescription = req.body.productDescription;
                product.productCategory = req.body.productCategory;
                product.productImageURLS = req.body.productImageURLS;
                product.productBrand = req.body.productBrand;
                product.productWatchers = req.body.productWatchers;
                product.productPrice = req.body.productPrice;
                product.detailsWithSize = req.body.detailsWithSize;

                product
                    .save()
                    .then(() => res.send({ productID: product._id }))
                    .catch((err) => res.status(400).send("Error: " + err));
            })
            .catch((err) => res.status(400).send("Error : " + err));
    }else {
        return res.status(401).send("Access Denied!")
    }

});

/*Route To update the Product View count*/
router.put("/UpdateProductWatchers/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => {
      product.productWatchers += 1;

      product
        .save()
        .then(() => res.send({ productID: product._id }))
        .catch((err) => res.status(400).send("Error: " + err));
    })
    .catch((err) => res.status(400).send("Error : " + err));
});

/*Route To ADD Product Images to server*/
router.post("/upload", verifyToken, (req, res) => {
  if(req.user.userRole === 'storeManager'){
      let imageUrls = [];
      try {
          let url = "https://ishoppingplaza.herokuapp.com/images/";
          for (let x = 0; x < req.files.file.length; x++) {
              let imageName = Date.now() + "-" + req.files.file[x].name;
              let image = req.files.file[x];
              image.mv("./images/ProductImages/" + imageName, (err, result) => {
                  if (err) return res.status(400).send("Error : " + err);
              });
              let imageUrl = url + "/ProductImages/" + imageName;
              imageUrls.push({ imageURL: imageUrl });
          }
      } catch (err) {
          return res.status(404).send("Please upload the image");
      }

      return res.status(200).send({
          files: imageUrls,
      });
  }else {
      return res.status(401).send("Access Denied!")
  }
});

module.exports = router;
