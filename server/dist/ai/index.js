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
exports.ChatGPT = void 0;
const openai_1 = require("@langchain/openai");
const config_1 = require("../config");
const text_splitter_1 = require("langchain/text_splitter");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_1 = require("@langchain/community/vectorstores/supabase");
const ChatGPT = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    // const chatModel = new ChatOpenAI({
    // 	temperature: 0.9,
    // 	openAIApiKey: ChatGPT_API,
    // })
    const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
        chunkSize: 500,
        separators: ['\n\n', '\n', ' ', ''], //default setting
        chunkOverlap: 50,
    });
    try {
        const output = yield splitter.createDocuments([prompt]);
        return 'File is splitted';
        const client = (0, supabase_js_1.createClient)(config_1.SUPABASE_URL, config_1.SUPABASE_API_KEY);
        yield supabase_1.SupabaseVectorStore.fromDocuments(output, new openai_1.OpenAIEmbeddings({ openAIApiKey: config_1.OPENAI_KEY }), {
            client,
            tableName: 'documents',
        })
            .then((res) => {
            console.log(res);
            return 'Document splitted successfully...';
        })
            .catch((err) => {
            console.log(err);
        });
    }
    catch (error) {
        // return output
        console.error('Error communicating with ChatGPT API:', `${error}`);
        throw error;
    }
});
exports.ChatGPT = ChatGPT;
//# sourceMappingURL=index.js.map