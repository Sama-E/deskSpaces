import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

import userRoutes from "./routes/users.js"
import authsRoutes from "./routes/auths.js"
import postsRoutes from "./routes/posts.js"
import commentsRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"
import relationshipsRoutes from "./routes/relationships.js"


const app = express();

//Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", }));
app.use(cookieParser());

//Store Files(Images) with multer
//File name Date in file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//Upload Files(Images) with multer
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

//Routes
app.use("/api/users", userRoutes);
app.use("/api/auths", authsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/relationships", relationshipsRoutes);


app.listen(8800, () => {
  console.log("API working")
})