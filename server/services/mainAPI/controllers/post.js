import { db } from "../connect.js";
import jwt from "jsonwebtoken";
// import moment from "moment";

export const getPosts = (req, res) => {
  
  //To pass through for profile user posts
  const userId = req.query.userId;
  
  //Get current userId from accessToken
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  //Verify token and pull userInfo if error token is not valid

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")
  

    //Get Posts (users and friends posts)
    // p = posts table, u = users table, r = realtionships
    // selects post
    // select from users table -> userId, email
    // Join posts and users table on currentUser id as postsUserId
    // Join relationships table on postsUserId as followedUsersId
    // Where currentUser id is followerUserId or postsUsersId
    const q = 
        userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, email, firstName, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.created_at DESC`
        : `SELECT p.*, u.id AS userId, email, firstName, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.created_at DESC`;

    // `SELECT p.*, u.id AS userId, email, name FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId)
    // WHERE r.followerUserId= ? OR p.userId =?
    // ORDER BY p.created_at DESC`;

    // `SELECT * FROM posts`;

    const values =
    userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    //Query: token verified, get userInfo.id(data), and posts data/errors
    // db.query(q, [userInfo.id, userInfo.id], (err, data) => {
    db.query(q, values, (err, data) => {
      if (err) 
        return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};


//Add Post
export const addPost = (req, res) => {

  //Get current userId from accessToken
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  //Verify token and pull userInfo if error token is not valid
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")


    const q = "INSERT INTO posts(`desc`, `img`, `userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id
    ]

    //Query: token verified, get userInfo.id(data), and posts data/errors
    db.query(q, [values], (err, data) => {
        if (err) 
          return res.status(500).json(err);
        return res.status(200).json("Post created.");
      });
    });
  };

  //Delete Post
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")


    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=? ";

    //Query: token verified, get userInfo.id(data), and posts data/errors
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
        if (err) 
          return res.status(500).json(err);
        if(data.affectedRows > 0)
          return res.status(200).json("Post deleted.");
        return res.status(403).json("You can delete only your posts.")
      });
    });
  };