// Import Packages
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fileupload = require("express-fileupload");

const app = express();

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
const StoreManager = require("./routes/StoreManagerRoutes");
const EmployeeLogin = require("./routes/EmployeeLoginRoutes");

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
app.use(
  cors({
    exposedHeaders: "auth-token",
  })
);

// Config routes
app.use("/api/users", UserRoutes);
app.use("/api/feedback", UserFeedbacks);
app.use("/api/products", ProductRoutes);
app.use("/api/offers", OfferRoutes);
app.use("/api/Categories", CategoryRoutes);
app.use("/api/shoppingcarts", ShoppingCartRoutes);
app.use("/api/wishlists", WishListRoutes);
app.use("/images", express.static("images"));
app.use("/api/StoreManager", StoreManager);
app.use("/api/EmployeeLogin", EmployeeLogin);

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
