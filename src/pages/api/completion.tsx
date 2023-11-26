import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { LLMChain, OpenAI, PromptTemplate } from "langchain";


// Create an OpenAI API client (that's edge-friendly!)
const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';
const template = `Suppose You have this kind of character and defintion like {context} and answer the following question with sexy tone: {question} with {behavior} behavior.`;

const prompts = new PromptTemplate({
  template,
  inputVariables: ["question", "context", "behavior"],
});

export default async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const behavior = 'loves to drink, have fun, simple alot'
    const context = 'my name is stacey and loves to travel'
    const promp = `Suppose You have this kind of character and definition like ${context} and answer the following question with sexy tone: ${prompt} with ${behavior} behavior.`;
   //const promptText = prompt.render({ question, context, behavior });
    
   //const { context, query, behavior } = req.body;
    

    // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // Replace 'your-model-name' with the desired model name or ID
      stream: true,
      temperature: 0.9,
      prompt: `Convert the given code to ruby.
              User: ${prompt}
              Agent:`
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
  
    // Create a response instance using the StreamingTextResponse from ai package
    const streamingResponse = new StreamingTextResponse(stream);

    // Send the response
    return new StreamingTextResponse(stream)
    //return streamingResponse;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}




