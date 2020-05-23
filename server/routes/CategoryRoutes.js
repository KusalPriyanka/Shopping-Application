const router = require("express").Router();
const Categories = require('../model/Categories');
const verifyToken=require("./Authentication/VerifyToken");

/*Router to get all Categories from db*/
router.get("/", verifyToken, async (req, res) => {
    if(!req.user.userRole === 'admin')
        return res.status(401).send("Access Denied!");

        await Categories.find()
        .then(Categories => res.send(Categories))
        .catch(err => res.status(400).send('Error: ' + err))

});

/*Router to get Category by id from db*/
router.get("/:id", verifyToken, async (req, res) => {

    await Categories.findById(req.params.id)
        .then((Category) => res.send(Category))
        .catch(err => res.status(400).send("Error : " + err))
});

/*Router to add Categories to db*/
router.post('/AddCategory',verifyToken, async (req, res) => {
    let categoryExist = await Categories.findOne({
        CategoryName: req.body.CategoryName,
      });
    
      if (categoryExist)
        return res.status(404).send("Already published the category!");

    let Category = new Categories({
        CategoryName: req.body.CategoryName,
        categoryImageURL: req.body.categoryImageURL,
        categoryDescription: req.body.categoryDescription,
    });

    try {
        await Category.save();
        res.send(Category);
      } catch (err) {
        res.status(400).send('Error: ' + err);
      }

});

/*Router to delete Categories from db*/
router.delete("/DeleteCategory/:id",verifyToken, async (req, res) => {
    await Categories.findByIdAndDelete(req.params.id)
        .then(() => res.send("Successfully Deleted!. Category ID: ( " + req.params.id + " )"))
        .catch(err => res.status(400).send("Error : " + err))
});

/*Router to Update Categories*/
router.put("/UpdateCategory/:id", verifyToken, async (req, res) => {
    await Categories.findById(req.params.id)
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
