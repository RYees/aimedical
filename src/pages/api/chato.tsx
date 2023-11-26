// import { Configuration, OpenAIApi } from 'openai-edge';
// import { StreamingTextResponse, OpenAIStream } from 'ai';
// import { LLMChain, OpenAI, PromptTemplate } from 'langchain';
import {StreamingTextResponse, LangChainStream, Message} from "ai";
import {CallbackManager} from "langchain/callbacks"
import {ChatOpenAI} from "langchain/chat_models/openai"
import {AIChatMessage, HumanChatMessage} from  "langchain/schema"

export const runtime = "edge";

// const config = new Configuration({
//   apiKey: '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',
// });

// const openai = new OpenAIApi(config);

// const template = `Suppose You have this kind of character and definition like {context} and answer the following question with sexy tone: {question} with {behavior} behavior.`;

// const davinci = new OpenAI({
//   openAIApiKey: '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',
//   temperature: 0.9,
// });

// const prompt = new PromptTemplate({
//   template,
//   inputVariables: ['question', 'context', 'behavior'],
// });

// const llm_chain = new LLMChain({
//   prompt,
//   llm: davinci,
// });

export async function POST(req: Request) {
  const { messages } = await req.json();
  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
    callbackManager: CallbackManager.fromHandlers(handlers)
  })

  llm.call(
    (messages as Message[]).map((m) =>
      m.role == 'user'?
      new HumanChatMessage(m.content)
      : new AIChatMessage(m.content)
    ))
    .catch(console.error)
  
  // const promptMessages = messages.map((message:any) => ({
  //   role: 'system',
  //   content: message.content,
  // }));

  // const response = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   messages: promptMessages,
  //   stream: true,
  //   max_tokens: 100,
  // });

  // const stream = OpenAIStream(response);

  // // Send the stream as the response
   return new StreamingTextResponse(stream);
}