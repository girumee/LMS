import express from "express";

const router = express.Router();

// controller
import { login, register, logout } from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
