import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { OPENAI_KEY } from '../../config'
import { retriever } from './retriever'
import { StringOutputParser } from 'langchain/schema/output_parser'
const llm = new ChatOpenAI({ openAIApiKey: OPENAI_KEY })
export const Standalone = async (userQuestion: string) => {
	const standaloneTemplate =
		'Given a question, convert it to a standalone question. question: {question} standalone question:'
	const answerTemplate = `You are a helpfull and enthusiastic support bot who can answer a given question based on the context provided. Try to find the answer in the context. If you really don't know the answer, say"I'm sorry, I don't know the answer to that." Don't try to make up an answer. Always speak as if you were chatting to a friend.
	context:{context}
	question:{question}
	answer:
	`
	const combineDocuments = (docs: any) => {
		return docs.map((doc: any) => doc.pageContent).join('\n\n')
	}

	const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate)
	const standaloneChain = standalonePrompt
		.pipe(llm)
		.pipe(new StringOutputParser())
		.pipe(retriever)
		.pipe(combineDocuments) // first it will create standlonePrompt then convert to or extract string from output the pass to retriever and get most close chunks

	const response = await standaloneChain.invoke({ question: userQuestion })
	console.log(response)
	// return response.content
}

//example
// import { ChatOpenAI } from '@langchain/openai'
// import { PromptTemplate } from 'langchain/prompts'
// import { OPENAI_KEY } from '../config'

// const llm = new ChatOpenAI({ openAIApiKey: OPENAI_KEY })

// const tweetTemplate =
// 	'Generate a promotion tweet for a product, from this product description: {productDesc}'

// const tweetPrompt = PromptTemplate.fromTemplate(tweetTemplate)

// const tweetChain = tweetPrompt.pipe(llm)
// const response = await tweetChain.invoke({ productDesc: 'Electric shoes' })

// console.log(response.content)
