"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const config_1 = require("../config");
const llm = new openai_1.ChatOpenAI({ openAIApiKey: config_1.OPENAI_KEY });
const tweetTemplate = 'Generate a promotion tweet for a product, from this product description: {productDesc}';
