import express from "express";
import { getAllBlogs, addBlog,getBlogByTitle, getBlogsByCategory } from "../controller/blog.controller.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
router.get("/all", getAllBlogs);
router.get("/category/:category",getBlogsByCategory)
router.get("/:title",getBlogByTitle)
router.post("/add", checkAuth, addBlog);

export default router;
