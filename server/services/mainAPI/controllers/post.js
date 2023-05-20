import { db } from "../connect.js";

//Get Posts (users and friends posts)
// p = posts table, u = users table
export const getPosts = (req, res) => {
  const q = `SELECT p.*, u.id AS userId, email FROM posts AS p JOIN users AS u ON (u.id = p.userId)`;

  db.query(q, (err,data) => {
    if (err) 
      return res.status(500).json(err);
    return res.status(200).json(data);
  });
};