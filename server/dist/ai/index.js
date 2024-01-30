"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPT = void 0;
const openai_1 = require("@langchain/openai");
const config_1 = require("../config");
const text_splitter_1 = require("langchain/text_splitter");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_1 = require("@langchain/community/vectorstores/supabase");
const ChatGPT = async (prompt) => {
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
        const output = await splitter.createDocuments([prompt]);
        return 'File is splitted';
        const client = (0, supabase_js_1.createClient)(config_1.SUPABASE_URL, config_1.SUPABASE_API_KEY);
        await supabase_1.SupabaseVectorStore.fromDocuments(output, new openai_1.OpenAIEmbeddings({ openAIApiKey: config_1.OPENAI_KEY }), {
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
};
exports.ChatGPT = ChatGPT;
//# sourceMappingURL=index.js.map