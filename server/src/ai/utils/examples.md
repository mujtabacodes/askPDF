    /*
    const chain_pre = standalonePrompt
    	.pipe(llm)
    	.pipe(new StringOutputParser())
    	.pipe(retriever)
    	.pipe(combineDocuments) // first it will create standlonePrompt then convert to or extract string from output the pass to retriever and get most close chunks

\*/
/\*
example Sandalone
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from 'langchain/prompts'
import { OPENAI_KEY } from '../config'

const llm = new ChatOpenAI({ openAIApiKey: OPENAI_KEY })

const tweetTemplate =
'Generate a promotion tweet for a product, from this product description: {productDesc}'

const tweetPrompt = PromptTemplate.fromTemplate(tweetTemplate)

const tweetChain = tweetPrompt.pipe(llm)
const response = await tweetChain.invoke({ productDesc: 'Electric shoes' })

console.log(response.content)\*/

/\*
// Runnable Squence
const punctuationTemplate = `Given a sentence, add punction where needed.
sentence:{sentence}
sentence with punctution:
`

const punctuationPrompt = PromptTemplate.fromTemplate(punctuationTemplate)

const grammerTemplate = `Given a sentence correct the grammar.
sentence:{punctuated_sentence}
sentence with correct grammar:
`
const grammarPrompt = PromptTemplate.fromTemplate(grammerTemplate)
const translationTemplate = `Given a sentence, translate that sentence into {language}.
sentence:{grammatically_correct_sentence}
translated sentence:
`
const translationPrompt = PromptTemplate.fromTemplate(translationTemplate)

const punctionChain = RunnableSequence.from([
punctuationPrompt,
llm,
new StringOutputParser(),
])

const grammarChain = RunnableSequence.from([grammarPrompt, llm, new StringOutputParser()])

const translationChain = RunnableSequence.from([
translationPrompt,
llm,
new StringOutputParser(),
])
const chain = RunnableSequence.from([
{ punctuated_sentence: punctionChain, original_input: new RunnablePassthrough() },

    grammarChain,
    {
    	grammatically_correct_sentence: grammarChain,
    	language: ({ original_input }) => original_input.language,
    },
    translationChain,

])

const response2 = await chain.invoke({
sentence: 'i dont liked mondays',
language: 'french',
})
\*/
