import express from "express"

const app = express();

app.use(express.json())

app.listen(8802, () => {
  console.log("Connected!")
})