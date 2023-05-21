import express from "express";
import { getComments } from "../controllers/comment.js";

const router = express.Router();


router.get("/", getComments);
// router.post("/", addComment);
// router.delete("/:id", deleteComment);

export default router;