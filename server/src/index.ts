import express, { response } from 'express';
import { BASE_PROMPT, getSystemPrompt } from "./prompt";

import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from "cors";

const app = express();
const port = 8000;

const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI('AIzaSyDEoOE4ydMhkIZgrXlCng8j51tm8XI4_dU');

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.use(cors())
app.use(express.json())

app.post("/template", async (req, res) => {
    const userprompt = req.body.prompt;
    const systemPrompt = `This is a system prompt ,it is combined of both system prompt followed by user prompt system prompt:'Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra', user prompt: ${userprompt}`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const result = await model.generateContent(systemPrompt);
      const output = await result.response.text(); 
      console.log(output);

      if (output.trim() === "react") {
        res.json({
          prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
          uiPrompts: [reactBasePrompt]
        })
          return;
      }

      if (output.trim() === "node") {
        res.json({
          prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
          uiPrompts: [nodeBasePrompt]
        })
          return;
      }

      res.status(403).json({ message: "You can't access this" });
  } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ message: "Internal server error" });
  }

})

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;
  const systemPrompt = getSystemPrompt();
  const userPrompt = messages.map((msg: { content: string; }) => msg.content);
  const mainPrompt = `system prompt: ${systemPrompt}, user prompt: ${userPrompt} generate the code based on the user prompt and system prompt`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(mainPrompt);
  const output = await result.response.text();
  console.log(output);
  console.log(userPrompt);
  
  


  res.json({
      response: output
     
  });
})








app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

