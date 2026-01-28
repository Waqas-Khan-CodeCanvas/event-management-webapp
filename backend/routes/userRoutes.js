const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Routes for Users

// Create a new user
router.post("/", userController.createUser);

// Get all users (soft-deleted users excluded)
router.get("/", userController.getUsers);

// Get a single user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Soft delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
