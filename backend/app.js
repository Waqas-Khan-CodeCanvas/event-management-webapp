require("dotenv").config();
const express = require("express");
const app = express();
const {port} = require('./config/env.js')
const connectDB = require('./config/db.js');
connectDB()
const userRoutes = require("./routes/userRoutes.js");

// middlewares
express(express.json());
app.use(express.urlencoded({ extended: false }));


// Base route for users
app.use("/users", userRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port || 5000, () => {
  console.log(`server is running on port ${port}`);
});
