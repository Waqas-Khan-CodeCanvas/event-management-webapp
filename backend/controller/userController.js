const User = require("../model/user.modlel");

// Utility function for consistent API responses
const sendResponse = (res, status, success, data, message) => {
    return res.status(status).json({ success, data, message });
};

// CREATE a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role, profileImageUrl } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return sendResponse(res, 400, false, null, "Name, email, and password are required");
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendResponse(res, 409, false, null, "Email already exists");
        }

        const user = await User.create({ name, email, password, role, profileImageUrl });
        return sendResponse(res, 201, true, user, "User created successfully");
    } catch (error) {
        console.error("Create User Error:", error);
        return sendResponse(res, 500, false, null, "Internal server error");
    }
};

// GET all users (excluding soft-deleted)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ deletedAt: null });
        return sendResponse(res, 200, true, users, "Users retrieved successfully");
    } catch (error) {
        console.error("Get Users Error:", error);
        return sendResponse(res, 500, false, null, "Internal server error");
    }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id, deletedAt: null });

        if (!user) {
            return sendResponse(res, 404, false, null, "User not found");
        }

        return sendResponse(res, 200, true, user, "User retrieved successfully");
    } catch (error) {
        console.error("Get User Error:", error);
        return sendResponse(res, 500, false, null, "Internal server error");
    }
};

// UPDATE a user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Prevent updating deleted users
        const user = await User.findOneAndUpdate(
            { _id: id, deletedAt: null },
            updates,
            { new: true, runValidators: true }
        );

        if (!user) {
            return sendResponse(res, 404, false, null, "User not found or already deleted");
        }

        return sendResponse(res, 200, true, user, "User updated successfully");
    } catch (error) {
        console.error("Update User Error:", error);
        return sendResponse(res, 500, false, null, "Internal server error");
    }
};

// SOFT DELETE a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOneAndUpdate(
            { _id: id, deletedAt: null },
            { deletedAt: new Date(), isActive: false },
            { new: true }
        );

        if (!user) {
            return sendResponse(res, 404, false, null, "User not found or already deleted");
        }

        return sendResponse(res, 200, true, user, "User deleted successfully");
    } catch (error) {
        console.error("Delete User Error:", error);
        return sendResponse(res, 500, false, null, "Internal server error");
    }
};
