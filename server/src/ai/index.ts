import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage } from '@langchain/core/messages'
import { ChatGPT_API } from '../config'

export const ChatGPT = async (prompt: any): Promise<string> => {
	const chatModel = new ChatOpenAI({
		temperature: 0.9,
		openAIApiKey: ChatGPT_API,
	})

	try {
		// Send a message to the model
		const result = await chatModel.invoke([new HumanMessage(prompt)])

		// Check if the result structure is as expected
		if (result?.AIMessage?.content) {
			console.log(result)
			return result.AIMessage.content
		} else {
			console.error('Unexpected response format from ChatGPT API:', result)
			return 'Error: Unexpected response format'
		}
	} catch (error) {
		console.error('Error communicating with ChatGPT API:', error.message)
		throw error
	}
}
