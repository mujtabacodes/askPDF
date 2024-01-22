import { OpenAIEmbeddings } from '@langchain/openai'
import { OPENAI_KEY, SUPABASE_API_KEY, SUPABASE_URL } from '../config'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
export const ChatGPT = async (prompt: any) => {
	// const chatModel = new ChatOpenAI({
	// 	temperature: 0.9,
	// 	openAIApiKey: ChatGPT_API,
	// })
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 500,
		separators: ['\n\n', '\n', ' ', ''], //default setting
		chunkOverlap: 50,
	})
	try {
		const output = await splitter.createDocuments([prompt])
		return 'OUt is splitted'
		const client = createClient(SUPABASE_URL, SUPABASE_API_KEY)
		await SupabaseVectorStore.fromDocuments(
			output,
			new OpenAIEmbeddings({ openAIApiKey: OPENAI_KEY }),
			{
				client,
				tableName: 'documents',
			},
		)
			.then((res: any) => {
				console.log(res)
				return res
			})
			.catch((err: any) => {
				console.log(err)
			})
	} catch (error) {
		// return output
		console.error('Error communicating with ChatGPT API:', `${error}`)
		throw error
	}
}
