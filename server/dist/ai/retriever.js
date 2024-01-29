"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retriever = void 0;
const openai_1 = require("@langchain/openai");
const supabase_1 = require("@langchain/community/vectorstores/supabase");
const config_1 = require("../config");
const supabase_js_1 = require("@supabase/supabase-js");
const embeddings = new openai_1.OpenAIEmbeddings({ openAIApiKey: config_1.OPENAI_KEY });
const client = (0, supabase_js_1.createClient)(config_1.SUPABASE_URL, config_1.SUPABASE_API_KEY);
const vectorstore = new supabase_1.SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents',
});
const retriever = vectorstore.asRetriever(); //it will go to vector store and match and return most close we can add number to get base on number of chunks
exports.retriever = retriever;
