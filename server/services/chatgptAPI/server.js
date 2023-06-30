// import axios from 'axios';
// import { Configuration, OpenAIApi } from "openai";
// import bodyParser from "body-parser";
// import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
const PORT = 8801;


// dotenv.config();

//ChatGPT suggestion - Fail

// Set up OpenAI API client
// const openai = axios.create({
//   baseURL: 'https://api.openai.com/v1',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer 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',
//   },
// })

// // Set up OpenAI API client
// async function getChatResponse(prompt) {
//   try {
//     const response = await openai.post('/engines/davinci-codex/completions', {
//       prompt,
//       max_tokens: 50,
//       temperature: 0.7,
//     });
//   return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error('Failed to fetch chat response:', error);
//     return null;
//   }
// }

// // Usage example
// async function main() {
//   const prompt = 'Hello, ChatGPT!';
//   const completion = await getChatResponse(prompt);
//   console.log('ChatGPT response:', completion);
// }

// main();

//Ania Example

const API_KEY = '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';
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


// app.use(bodyParser.json());

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// app.get('/', async (req, res) => {
//   res.status(200).send({
//     message:'Hello'
//   })
// });

// app.post('/', async(req, res) => {
  // try {
  //   const {message} = req.body;
  //   console.log(message)


  // Function to send a prompt and get a completion
  // async function getChatResponse(prompt) {
  //   try {
  //     const response = await openai.post('/engines/davinci-codex/completions', {
  //       prompt,
  //       max_tokens: 50,
  //       temperature: 0.7,
  //     });
  //     return response.data.choices[0].text.trim();
  //   } catch (error) {
  //     console.error('Failed to fetch chat response:', error);
  //     return null;
  //   }
  // }


  // async function callApi(){
  //   const response = await openai.createCompletion({
  //     model: "text-davinci-003",
      // prompt: `${message}`,
      // prompot: "Say this is test",
      // temperature: 7,
      // max_tokens: 2000,
      // top_p: 1,
      // frequency_penalty: 0.5,
      // presence_penalty: 0,
    // });

    // console.log(response.data.choices[0].text)

    // res.status(200).send({
    //   bot: response.data.choices[0].text
    // })
  //   res.json({
  //     data:message,
  //   })
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({ error })
  // }
// }

// callApi();
// )
// app.listen(8801, () => console.log('Server running on http://localhost:8801'));