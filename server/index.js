// Import Packages
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fileupload = require("express-fileupload");

const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).array("file");

// Config PORT
const PORT = process.env.PORT || 8080;

// Import routes
const UserRoutes = require("./routes/UserRoutes");
const UserFeedbacks = require("./routes/FeedbackRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const OfferRoutes = require("./routes/OfferRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const ShoppingCartRoutes = require("./routes/ShoppingCartRoutes");
const WishListRoutes = require("./routes/WishListRoutes");

dotenv.config();

// Connect DB
mongoose.connect(
  process.env.DB_CONTEXT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to the mongodb");
  }
);

// Middlewares
app.use(express.json());
app.use(fileupload());
app.use(cors());

// Config routes
app.use("/api/users", UserRoutes);
app.use("/api/feedback", UserFeedbacks);
app.use("/api/products", ProductRoutes);
app.use("/api/offers", OfferRoutes);
app.use("/api/Categories", CategoryRoutes);
app.use("/api/shoppingcarts", ShoppingCartRoutes);
app.use("/api/wishlists", WishListRoutes);
app.use("/images", express.static("images"));

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    let url = req.protocol + "://" + req.get("host");
    return res.status(200).send({
      files: req.files,
      url: url,
    });
  });
});

// Return view if production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/../", "client", "build", "index.html")
    );
    console.log(__dirname);
  });
}

// Start server
app.listen(PORT, () => {
  console.log("Server is up and running on server on " + PORT);
});
