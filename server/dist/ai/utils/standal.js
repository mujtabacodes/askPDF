"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Standalone = void 0;
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const config_1 = require("../../config");
const VectorStore_1 = require("./VectorStore");
const output_parser_1 = require("langchain/schema/output_parser");
const llm = new openai_1.ChatOpenAI({ openAIApiKey: config_1.OPENAI_KEY });
const Standalone = async (userQuestion) => {
    const standaloneTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:';
    const standalonePrompt = prompts_1.PromptTemplate.fromTemplate(standaloneTemplate);
    const standaloneChain = standalonePrompt
        .pipe(llm)
        .pipe(new output_parser_1.StringOutputParser())
        .pipe(VectorStore_1.retriever); // first it will create standlonePrompt then convert to or extract string from output the pass to retriever and get most close chunks
    const response = await standaloneChain.invoke({ question: userQuestion });
    return response.content;
};
exports.Standalone = Standalone;
