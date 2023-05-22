import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ?";

  //Query Post(via postid) for like status
  //Map through data and only send userId to frontend
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(like=>like.userId));
  });
};

export const addLikes = (req, res) => {
  //Logged in? Who?
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  //Verify token from cookies
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //Add - Insert into likes
    const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.postId
    ];
    //Return success/fail
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  });
};

//Delete Like
export const deleteLikes = (req, res) => {
  //Logged in? Who?
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  //Verify token from cookies
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //Delete - Delete into likes
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    //Return success/fail
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  });
};