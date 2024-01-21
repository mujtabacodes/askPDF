import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from 'langchain/prompts'
import { OPENAI_KEY } from '../../config'

const llm = new ChatOpenAI({ openAIApiKey: OPENAI_KEY })
export const Standalone = async (userQuestion: string) => {
	const standaloneTemplate =
		'Given a question, convert it to a standalone question. question: {question} standalone question:'

	const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate)

	const standaloneChain = standalonePrompt.pipe(llm)
	const response = await standaloneChain.invoke({ question: userQuestion })

	return response.content
}
