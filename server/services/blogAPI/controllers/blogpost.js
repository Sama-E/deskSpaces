import { db } from "../connect.js";
// import jwt from "jsonwebtoken";

//GET All BlogPosts
export const getBlogPosts = (req, res) => {

  const q = req.query.cat 
  ? "SELECT * FROM blogposts WHERE cat=?"
  : "SELECT * FROM blogposts";

  db.query(q, [req.query.cat], (err, data) => {
    if(err) return res.send(err)

    return res.status(200).json(data);
  })

};

//GET Single BlogPost
export const getBlogPost = (req, res) => {
  const q = "SELECT `firstName`, `lastName`, `profilePic`, `title`, `body`, `img`, `cat`, `tag`, b.userId , b.updated_at FROM users u JOIN blogposts b ON u.id = b.userId WHERE b.id = ?";


  db.query(q, [req.params.id], (err, data) => {
    if(err) return res.send(err)

    return res.status(200).json(data[0]);
  })
};

//POST (New) Single BlogPost
export const addBlogPost = (req, res) => {};

//PUT (Update) Single BlogPost
export const updateBlogPost = (req, res) => {};

//DELETE Single BlogPost
export const deleteBlogPost = (req, res) => {};