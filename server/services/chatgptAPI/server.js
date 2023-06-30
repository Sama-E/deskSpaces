import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
const PORT = 8801;


dotenv.config();

const API_KEY = process.env.API_KEY;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Authorization" : `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role:"user",
        content: req.body.message
      }],
      max_tokens: 100,
      temperature: 1.5,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options)
    const data = await response.json();
    res.send(data)
  } catch (error) {
    console.error(error)
  }
})



app.listen(PORT, () => console.log('Server running on ' + PORT));