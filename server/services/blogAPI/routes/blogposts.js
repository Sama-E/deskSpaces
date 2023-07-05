import express from "express";
import { 
  getBlogPosts, 
  getBlogPost, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from "../controllers/blogpost.js";

const router = express.Router();


router.get("/", getBlogPosts);
router.get("/:id", getBlogPost);
router.post("/new", addBlogPost);
router.put("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;