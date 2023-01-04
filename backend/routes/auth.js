import express from "express";

const router = express.Router();

// controller
import { login, register } from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);

module.exports = router;
