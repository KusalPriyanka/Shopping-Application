// Import Packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Config PORT
const PORT = process.env.PORT || 8080;

// Import routes
const UserRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes");

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

// Config routes
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);

// Start server
app.listen(PORT, () => {
  console.log("Server is up and running on server on " + PORT);
});
