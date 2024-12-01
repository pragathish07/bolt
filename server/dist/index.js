"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prompt_1 = require("./prompt");
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDEoOE4ydMhkIZgrXlCng8j51tm8XI4_dU");
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
                prompts: [prompt_1.BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [react_1.basePrompt]
            });
            return;
        }
        if (output.trim() === "node") {
            res.json({
                prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [node_1.basePrompt]
            });
            return;
        }
        res.status(403).json({ message: "You can't access this" });
    }
    catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    const systemPrompt = (0, prompt_1.getSystemPrompt)();
    const mainPrompt = `system prompt: ${systemPrompt}, user prompt: ${messages}`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(mainPrompt);
    const output = await result.response.text();
    console.log(output);
    res.json({
        response: output
    });
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
