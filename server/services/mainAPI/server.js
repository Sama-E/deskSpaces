import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js"
import authsRoutes from "./routes/auths.js"
import postsRoutes from "./routes/posts.js"
import commentsRoutes from "./routes/comments.js"
import likesRoutes from "./routes/likes.js"


const app = express();

//Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes)
app.use("/api/auths", authsRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/likes", likesRoutes)


app.listen(8800, () => {
  console.log("API working")
})