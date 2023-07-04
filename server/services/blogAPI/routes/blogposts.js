import express from "express";
import { 
  getBlogPosts, 
  getBlogPost, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from "../controllers/blogpost.js";

const router = express.Router();


router.get("/blog/", getBlogPosts);
router.get("/blog/:id", getBlogPost);
router.post("/blog/new", addBlogPost);
router.put("/blog/:id", updateBlogPost);
router.delete("/blog/:id", deleteBlogPost);

export default router;