import { db } from "../connect.js";
// import jwt from "jsonwebtoken";

export const getBlogPosts = (req, res) => {

  const q = req.query.cat 
  ? "SELECT * FROM blogposts WHERE cat=?"
  : "SELECT * FROM blogposts";

  db.query(q, [req.query.cat], (err, data) => {
    if(err) return res.send(err)

    return res.status(200).json(data);
  })

};


export const getBlogPost = (req, res) => {};


export const addBlogPost = (req, res) => {};


export const updateBlogPost = (req, res) => {};


export const deleteBlogPost = (req, res) => {};