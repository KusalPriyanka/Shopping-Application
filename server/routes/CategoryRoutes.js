const router = require("express").Router();
const Categories = require('../model/Categories');

/*Router to get all Categories from db*/
router.get("/", (req, res) => {
    Categories.find()
        .then(Categories => res.send(Categories))
        .catch(err => res.status(400).send('Error: ' + err))

});

/*Router to get Category by id from db*/
router.get("/:id", (req, res) => {
    Categories.findById(req.params.id)
        .then((Category) => res.send(Category))
        .catch(err => res.status(400).send("Error : " + err))
});

/*Router to add Categories to db*/
router.post('/AddCategory', (req, res) => {
    let Category = new Categories({
        CategoryName: req.body.CategoryName,
        categoryImageURL: req.body.categoryImageURL,
        categoryDescription: req.body.categoryDescription,
    });

    Category.save()
        .then((Category) => res.send(Category))
        .catch(err => res.status(400).send('Error: ' + err))
});

/*Router to delete Categories from db*/
router.delete("/DeleteCategory/:id", (req, res) => {
    Categories.findByIdAndDelete(req.params.id)
        .then(() => res.send("Successfully Deleted!. Category ID: ( " + req.params.id + " )"))
        .catch(err => res.status(400).send("Error : " + err))
});

/*Router to Update Categories*/
router.put("/UpdateCategory/:id", (req, res) => {
    Categories.findById(req.params.id)
        .then(Category => {
            Category.CategoryName = req.body.CategoryName;
            Category.categoryImageURL = req.body.categoryImageURL;
            Category.categoryDescription = req.body.categoryDescription;

            Category.save()
                .then(() => res.send(Category))
                .catch(err => res.status(400).send('Error: ' + err))
        })
        .catch(err => res.status(400).send("Error : " + err))
});

module.exports = router;
