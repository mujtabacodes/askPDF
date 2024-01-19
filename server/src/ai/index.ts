import { ChatOpenAI } from '@langchain/openai'
import { ChatGPT_API } from '../config'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createStructuredOutputRunnable } from 'langchain/chains/openai_functions'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'

const jsonSchema = {
	title: 'Person',
	description: 'Identifying information about a person.',
	type: 'object',
	properties: {
		name: { title: 'Name', description: "The person's name", type: 'string' },
		age: { title: 'Age', description: "The person's age", type: 'integer' },
		fav_food: {
			title: 'Fav Food',
			description: "The person's favorite food",
			type: 'string',
		},
	},
	required: ['name', 'age'],
}

export const ChatGPT = async (prompt: any) => {
	const chatModel = new ChatOpenAI({
		temperature: 0.9,
		openAIApiKey: ChatGPT_API,
	})

	try {
		const prompt = ChatPromptTemplate.fromMessages([
			['human', 'Human description: {description}'],
		])
		const outputParser = new JsonOutputFunctionsParser()
		const runnable = createStructuredOutputRunnable({
			outputSchema: jsonSchema,
			llm: chatModel,
			prompt,
			outputParser,
		})
		const response = await runnable.invoke({
			description:
				"My name's John Doe and I'm 30 years old. My favorite kind of food are chocolate chip cookies.",
		})
		console.log(response)
	} catch (error) {
		console.error('Error communicating with ChatGPT API:', `${error}`)
		throw error
	}
}
