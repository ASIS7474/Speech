const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { Configuration, OpenAIApi } = require("openai");
const { response } = require("express");
const { json } = require("body-parser");

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.get("/api/get", (req, res) => {
  const sqlGet = "select * from contact where 1";

  res.send(sqlGet);
});

app.post("/api/post", (req, res) => {
  const { userMessageHTML } = req.body;
  nload(userMessageHTML).then((value) => {
    // console.log(value);
    res.send({myText:userMessageHTML,value:value});
  });

//   setTimeout(() => {
//     console.log("Hello after 4 seconds");
//     console.log("nir" + Promise.resolve(nulls));
//   }, 8 * 1000);
});

let nload = async (userMessageHTML) => {
  try {
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: "### SQL tables, with their properties: " + userMessageHTML,

      temperature: 0,

      max_tokens: 150,

      top_p: 1.0,

      frequency_penalty: 0.0,

      presence_penalty: 0.0,

      stop: ["#", ";"],
    });

    return completion.data.choices[0].text;
  } catch (error) {
    throw error;
  }
};

// nload().then((value) => {
//   console.log(value);
// });
// async function load() {
//   new Promise(async function () {
// const completion = await openai.createCompletion({
//   model: "code-davinci-002",
//   prompt:
//     "### SQL tables, with their properties: Left Join two tables Employee and Department on Employee_id Column",

//   temperature: 0,

//   max_tokens: 150,

//   top_p: 1.0,

//   frequency_penalty: 0.0,

//   presence_penalty: 0.0,

//   stop: ["#", ";"],
// });

// console.log(completion.data.choices[0].text);
// return completion.data.choices[0].text;
//   });
// }

// async function generatequery() {
//   const completion = await openai
//     .createCompletion({
//       model: "code-davinci-002",
//       prompt:
//         "### SQL tables, with their properties: Left Join two tables Employee and Department on Employee_id Column",

//       temperature: 0,

//       max_tokens: 150,

//       top_p: 1.0,

//       frequency_penalty: 0.0,

//       presence_penalty: 0.0,

//       stop: ["#", ";"],
//     })
//     .then((completion) => {
//       console.log("Hey" + completion.data.choices[0].text);
//       const myPromiseAsString = JSON.stringify(completion.data.choices[0].text);

//       console.log("Nilesh" + myPromiseAsString);
//       return myPromiseAsString;
//     });

//   const output = completion.data.choices[0].text;
//   console.log({ output: completion.data.choices[0].text });

//   return { output: completion.data.choices[0].text };
// }

app.listen(5000, () => {
  console.log("server is running on 5000");
});
