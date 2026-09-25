const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
    registerUser,
    verifyRegistration,
    loginUser,
    logoutUser,
    getUsers
} = require("../controller/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-register", verifyRegistration);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/users", protect, admin, getUsers);

module.exports = router;