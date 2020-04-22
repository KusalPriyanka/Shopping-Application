// Import Packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Import routes
const UserRoutes = require("./routes/UserRoutes");

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

// Start server
app.listen(3001, () => {
  console.log("Server is up and running on server on 3001");
});
