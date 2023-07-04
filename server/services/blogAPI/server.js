import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import blogpostsRoutes from "./routes/blogposts.js";

const app = express();

app.use((req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
});

app.use(express.json());
app.use(cors({origin: "http://localhost:5173", }));
app.use(cookieParser());

app.use("/api/blogposts", blogpostsRoutes);

app.listen(8802, () => {
  console.log("Connected! Running on http://localhost:8802")
})