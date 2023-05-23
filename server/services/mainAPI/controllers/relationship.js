import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getRelationships = (req, res) => {
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(relationship=>relationship.followerUserId));
  });
};

export const addRelationship = (req, res) => {
  //Logged in? Who?
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  //Verify token from cookies
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //Add - Insert into likes
    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.userId
    ];
    //Return success/fail
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

//Delete Like
export const deleteRelationship = (req, res) => {
  //Logged in? Who?
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  //Verify token from cookies
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //Delete - Delete into likes
    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    //Return success/fail
    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed");
    });
  });
};