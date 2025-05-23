import { OpenAIEmbeddings } from '@langchain/openai'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { OPENAI_KEY, SUPABASE_API_KEY, SUPABASE_URL } from '../config'
import { createClient } from '@supabase/supabase-js'
const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_KEY })
const client = createClient(SUPABASE_URL, SUPABASE_API_KEY)
const vectorstore = new SupabaseVectorStore(embeddings, {
	client,
	tableName: 'documents',
	queryName: 'match_documents',
})
const retriever = vectorstore.asRetriever() //it will go to vector store and match and return most close we can add number to get base on number of chunks

export { retriever }
