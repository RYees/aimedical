/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { LLMChain, OpenAI, PromptTemplate } from "langchain";
import { ChainValues } from "langchain/dist/schema";
import { Configuration, OpenAIApi } from 'openai-edge';
import { StreamingTextResponse, OpenAIStream } from 'ai';

const template = `Suppose You have this kind of character and defintion like {context} and answer the following question with sexy tone: {question} with {behavior} behavior.`;

const davinci = new OpenAI({
  openAIApiKey: "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",
  temperature: 0.9,
  streaming: true
});

const prompt = new PromptTemplate({
  template,
  inputVariables: ["question", "context", "behavior"],
});

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);


export default async function handler(
  req: { method: string; body: { context: any; query: any; behavior: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { error?: string; answer?: ChainValues }): any;
        new (): any;
      };
    };
  }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { context, query, behavior } = req.body;

    const llm_chain = new LLMChain({
      prompt,
      llm: davinci,
    });

    const answer = await llm_chain.call({
      question: query,
      context,
      behavior,
    });

      //  Ask OpenAI for a streaming completion given the prompt
        // const response = await openai.createCompletion({
        //   model: 'text-davinci-003', // Replace 'your-model-name' with the desired model name or ID
        //   stream: true,
        //   temperature: 0.9,
        //   prompt: `Convert the given code to ruby.
        //           User: ${query}
        //           Agent: ${answer.text}`
        // });
    
        // // Convert the response into a friendly text-stream
        // const stream = OpenAIStream(response);
      
        // // Create a response instance using the StreamingTextResponse from ai package
        // const streamingResponse = new StreamingTextResponse(stream);
    
        // // Send the response
        // return streamingResponse;

    // console.log("likeyou", answer)
     return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
