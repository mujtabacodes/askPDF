import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { OPENAI_KEY } from '../../config'
import { retriever } from './retriever'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { combineDocuments } from '../../common/funct'
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables'
const llm = new ChatOpenAI({ openAIApiKey: OPENAI_KEY })

export const Standalone = async (userQuestion: string) => {
	const standaloneTemplate =
		'Given a question, convert it to a standalone question. question: {question} standalone question:'
	const answerTemplate = `You are a helpfull and enthusiastic support bot who can answer a given question based on the context provided. Try to find the answer in the context. If you really don't know the answer, say"I'm sorry, I don't know the answer to that." Don't try to make up an answer. Always speak as if you were chatting to a friend.
	context:{context}
	question:{question}
	answer:
	`

	const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate)
	const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

	const standaloneQuestionChain = standalonePrompt
		.pipe(llm)
		.pipe(new StringOutputParser())
	const retriverChain = RunnableSequence.from([
		prevResult => prevResult.standalone_question,
		retriever,
		combineDocuments,
	])
	const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser())

	const chain = RunnableSequence.from([
		{
			standalone_question: standaloneQuestionChain,
			origin_input: new RunnablePassthrough(),
		},
		{
			context: retriverChain,
			question: original_input => original_input.question,
		},
		prevResult => console.log(prevResult),
		answerChain,
	])
	const response = await chain.invoke({ question: userQuestion })
	console.log(response)
	return response
}
