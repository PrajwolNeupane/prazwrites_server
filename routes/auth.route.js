import express from "express";
import {
  createAdmin,
  logOut,
  logIn,
  getAuth,
} from "../controller/auth.controller.js";
import checkApiKey from "../middleware/checkApiKey.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
router.get("/", checkAuth, getAuth);
router.post("/signup", checkApiKey, createAdmin);
router.post("/signin", logIn);
router.get("/logout", checkAuth, logOut);

export default router;
