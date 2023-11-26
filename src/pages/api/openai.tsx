/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { LLMChain, OpenAI, PromptTemplate } from "langchain";
import { ChainValues } from "langchain/dist/schema";
import { Configuration, OpenAIApi } from 'openai-edge';
import { StreamingTextResponse, OpenAIStream } from 'ai';

// const template = `Suppose You have this kind of character and defintion like {context} and answer the following question with sexy tone: {question} with {behavior} behavior.`;
const template = `answer the following question: {question}`;

const davinci = new OpenAI({
  openAIApiKey: "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",
  temperature: 0.9,
  streaming: true
});

const prompt = new PromptTemplate({
  template,
  inputVariables: [
    "question", 
    // "context", 
    // "behavior"
    ],
});

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);

export default async function handler(
  req: { method: string; body: { 
    // context: any;
    // behavior: any
    query: any; 
     
  } },
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
    const { 
        query,
        // context,          
        // behavior 
    } = req.body;

    const llm_chain = new LLMChain({
      prompt,
      llm: davinci,
    });

    const answer = await llm_chain.call({
      question: query,
    //   context,
    //   behavior,
    });
    //console.log("whywouldhe", answer)
    // const relatedQuestions = await generateRelatedQuestions(query);
    // console.log("complete", relatedQuestions)
    return res.status(200).json({ answer });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}

// Generate related questions based on the provided question
async function generateRelatedQuestions(query:any) {
        // Specify the prompt for generating related questions
        const prompt = `What are some related questions to "${query}"?\n-`;

        // Generate related questions using OpenAI's completion API
        const response = await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.6,
        max_tokens: 50,
        prompt,
        stop: '\n',
        n: 5, // Number of related questions to generate
        });
        const stream = OpenAIStream(response);

        console.log("wrong", stream)
        return response
        // Extract the generated questions from the API response
        //const generatedQuestions = response.choices.map((choice) => choice.text.trim());

        // Return the generated related questions
        // return generatedQuestions;
  }
  