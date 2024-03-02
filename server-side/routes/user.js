import express from "express";
const router = express.Router();

const { login, register, dashboard, getAllUsers } = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.post("/login", login);
router.post("/register", register);
router.post("/dashboard", authMiddleware, dashboard);
router.post("/users", getAllUsers);

export default router;