// import { StreamingTextResponse, LangChainStream, Message } from "ai";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { HumanChatMessage, AIChatMessage } from "langchain/schema";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// import { NextRequest } from "next/server";
// import { PromptTemplate } from "langchain";

// export const runtime = "edge";

// export default async function handler(req: NextRequest) {
//   const { messages, userId, fetchedHealth, fetchedReminder } = await req.json();

//   const { stream, handlers } = LangChainStream();
//   const llm = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     streaming: true,
//     temperature: 0.9,
//     openAIApiKey: "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",
//   });

//   const AIcharacterPrompts = `AI: What is your favorite color?
// User: {input}
// AI:`;

//   const langChainMessages = messages.map((m) => {
//     if (m.role === "ai") {
//       // Combine character and behavior with content
//       const contentWithCharacterAndBehavior = `${AIcharacterPrompts}: ${m.content}`;
//       return new AIChatMessage(contentWithCharacterAndBehavior);
//     } else {
//       return new HumanChatMessage(m.content);
//     }
//   });

//   llm.call(langChainMessages, {}, [handlers]).catch(console.error);
//   return new StreamingTextResponse(stream);
// }


import OpenAI from "langchain"
import open_meteo_docs from "langchain/chains"
import APIChain from "langchain/chains"
// import { get_openapi_chain } from "langchain/chains";
// import {LLMRequestsChain, LLMChain} from "langchain/chains"
import {LLMChain} from "langchain/chains"
import {PromptTemplate} from "langchain"
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChainValues } from "langchain/dist/schema";

export default async function handler(
    req: { method: string; body: { query: any;} },
    res: any
  ) {
    const {query} = req.body;
    console.log("recieved_text", query)
    const template = `The raw search result text from Google: {query} `;
  
    let prompt = new PromptTemplate({
        template,
        inputVariables: ["query"],        
    })

    const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        streaming: true,
        temperature: 0.9,
        openAIApiKey: "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",
      });

    const chain = new LLMChain({ llm, prompt });
    const question = query.toString();
    const inputs = {
        "query": question,
        "url": "https://www.google.com/search?q=" + question.replace(" ", "+"),
    }
    console.log("wait...")
    let value = await chain.call(inputs);
    console.log("response", value)
    return res.status(200).send(value);
}

