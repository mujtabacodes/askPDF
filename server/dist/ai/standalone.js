"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Standalone = void 0;
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const config_1 = require("../config");
const retriever_1 = require("./retriever");
const output_parsers_1 = require("@langchain/core/output_parsers");
const funct_1 = require("../common/funct");
const runnables_1 = require("@langchain/core/runnables");
const llm = new openai_1.ChatOpenAI({ openAIApiKey: config_1.OPENAI_KEY, temperature: 0 });
const Standalone = (userQuestion) => __awaiter(void 0, void 0, void 0, function* () {
    const convHistory = [];
    const standaloneTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question.
	conversation history:{conv_history}
	question: {question} standalone question:`;
    const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question based on the context provided and the conversation hostory. Try to find the answer in the context. if the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say"I'm sorry, I don't know the answer to that." Don't try to make up an answer. Always speak as if you were chatting to a friend.
	conversation history:{conv_history}
	context:{context}
	question:{question}
	answer:
	`;
    const standalonePrompt = prompts_1.PromptTemplate.fromTemplate(standaloneTemplate);
    const answerPrompt = prompts_1.PromptTemplate.fromTemplate(answerTemplate);
    const standaloneQuestionChain = standalonePrompt
        .pipe(llm)
        .pipe(new output_parsers_1.StringOutputParser());
    const retriverChain = runnables_1.RunnableSequence.from([
        prevResult => prevResult.standalone_question,
        retriever_1.retriever,
        funct_1.combineDocuments,
    ]);
    const answerChain = answerPrompt.pipe(llm).pipe(new output_parsers_1.StringOutputParser());
    const chain = runnables_1.RunnableSequence.from([
        {
            standalone_question: standaloneQuestionChain,
            origin_input: new runnables_1.RunnablePassthrough(),
        },
        {
            context: retriverChain,
            question: ({ origin_input }) => {
                return origin_input.question;
            },
            conv_history: ({ origin_input }) => {
                return origin_input.conv_history;
            },
        },
        answerChain,
    ]);
    const response = yield chain.invoke({
        question: userQuestion,
        conv_history: (0, funct_1.formatConvHistory)(convHistory),
    });
    convHistory.push(userQuestion);
    convHistory.push(response);
    console.log(response);
    console.log('Conversational History');
    console.log((0, funct_1.formatConvHistory)(convHistory));
    return response;
});
exports.Standalone = Standalone;
//# sourceMappingURL=standalone.js.map