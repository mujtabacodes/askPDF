import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { OPENAI_KEY } from '../../config'
import { retriever } from './retriever'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { combineDocuments, formatConvHistory } from '../../common/funct'
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables'

const llm = new ChatOpenAI({ openAIApiKey: OPENAI_KEY, temperature: 0 })

export const Standalone = async (userQuestion: string) => {
	const convHistory: string[] = []

	const standaloneTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question.
	conversation history:{conv_history}
	question: {question} standalone question:`
	const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question based on the context provided and the conversation hostory. Try to find the answer in the context. if the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say"I'm sorry, I don't know the answer to that." Don't try to make up an answer. Always speak as if you were chatting to a friend.
	conversation history:{conv_history}
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
			question: ({ origin_input }) => {
				return origin_input.question
			},
			conv_history: ({ origin_input }) => {
				return origin_input.conv_history
			},
		},
		answerChain,
	])
	const response = await chain.invoke({
		question: userQuestion,
		conv_history: formatConvHistory(convHistory),
	})
	convHistory.push(userQuestion)
	convHistory.push(response)

	console.log(response)
	console.log('Conversational History')
	console.log(formatConvHistory(convHistory))
	return response
}
