import express from "express";

const router = express.Router();

// controller
import { login, register, logout, currentUser, forgetpassword } from "../controllers/auth";
//middleware
import { requireSignin } from "../middlewares";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/forget-password", forgetpassword)
module.exports = router;
