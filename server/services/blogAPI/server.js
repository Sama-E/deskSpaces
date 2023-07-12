import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import blogpostsRoutes from "./routes/blogposts.js";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));
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
const upload = multer({ storage : storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  console.log(file)
  res.status(200).json(file.filename);
});

app.use("/api/blogposts", blogpostsRoutes);


app.listen(8802, () => {
  console.log("Connected! Running on http://localhost:8802")
})