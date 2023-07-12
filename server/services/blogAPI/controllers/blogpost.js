import { db } from "../connect.js";
import jwt from "jsonwebtoken";

//GET All BlogPosts
export const getBlogPosts = (req, res) => {

  const q = req.query.cat 
  ? "SELECT * FROM blogposts WHERE cat=?"
  : "SELECT * FROM blogposts";

  db.query(q, [req.query.cat], (err, data) => {
    if(err) return res.status(500).send(err);

    return res.status(200).json(data);
  })

};

//GET Single BlogPost
export const getBlogPost = (req, res) => {
  const q = "SELECT `firstName`, `lastName`, `profilePic`, `title`, `body`, `img`, `cat`, `tag`, b.id, b.userId , b.updated_at FROM users u JOIN blogposts b ON u.id = b.userId WHERE b.id = ?";


  db.query(q, [req.params.id], (err, data) => {
    if(err) return res.status(500).send(err);

    return res.status(200).json(data[0]);
  })
};

//POST (New) Single BlogPost
export const addBlogPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You are not authenticated.");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
  
    const q = "INSERT INTO blogposts(`title`, `body`,`img`, `cat`, `tag`, `userId`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.body,
      req.body.img,
      req.body.cat,
      req.body.tag,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};



//PUT (Update) Single BlogPost
export const updateBlogPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You are not authenticated.");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const blogpostId = req.params.id
  
    const q = "UPDATE blogposts SET `title`= ?, `body`= ?,`img`= ?, `cat`= ? WHERE `id` = ? AND `userId` = ?";

    const values = [
      req.body.title,
      req.body.body,
      req.body.img,
      req.body.cat,
    ];

    db.query(q, [...values, blogpostId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};

//DELETE Single BlogPost
export const deleteBlogPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You are not authenticated.");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM blogposts WHERE `id` = ? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => 
    {
      if (err) 
        return res.status(500).json(err);
      if(data.affectedRows > 0)
        return res.status(200).json("Blog post deleted.");
      return res.status(403).json("You can delete only your own blog posts.")
    });
  })
};