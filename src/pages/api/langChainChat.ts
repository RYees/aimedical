// import { StreamingTextResponse, LangChainStream, Message } from "ai";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { HumanChatMessage, AIChatMessage } from "langchain/schema";

// import { NextRequest } from "next/server";

// export const runtime = "edge";

// export default async function handler(req: NextRequest) {
//   const { messages } = await req.json();

//   //return messages;
//   const { stream, handlers } = LangChainStream();

//   const llm = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     streaming: true,
//     temperature: 0.9,
//     openAIApiKey: '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',
//   });

//   llm
//     .call(
//       (messages as Message[]).map((m) =>
//         m.role == "user"
//           ? new HumanChatMessage(m.content)
//           : new AIChatMessage(m.content)
//       ),
//       {},
//       [handlers]
//     )
//     .catch(console.error);
//    return new StreamingTextResponse(stream);
// }


import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { NextRequest } from "next/server";
import { PromptTemplate, LLMChain } from "langchain";
import ConversationBufferMemory from "langchain/memory";

export const runtime = "edge";

export default async function handler(req: NextRequest) {
  const { messages, userId, fetchedHealth, fetchedReminder } = await req.json();
  console.log("msg", messages)
  const { stream, handlers } = LangChainStream();
  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-16k-0613", //gpt3.5turbo 16k version GPT-4 Turbo with 128k context gpt-3.5-turbo-16k-0613
    streaming: true,
    temperature: 0.9,
    openAIApiKey: "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",
    maxTokens: 4096
  });   

  const users = [
    { name: "John", age: 25, location: "New York" },
    { name: "Alice", age: 30, location: "London" },
    { name: "Bob", age: 35, location: "Paris" }
  ];
  let userHealthPrompts:any; 
  let userReminderPrompts:any; 
  // Generate prompts for each user
  if(fetchedHealth !== undefined){
     userHealthPrompts = fetchedHealth.map((user:any) => {
    const prompt = `User's name is ${user.name}, date of birth is ${user.dob}, gender is ${user.gender}email address ${user.email}, phone number ${user.phone}, user weight is ${user.weight}, user height is ${user.height}, blood pressure is ${user.bloodpressure}, pulse of the user is ${user.pulse}, temperature value is ${user.temperature}, oxygen saturation is ${user.oxysaturation}, body mass index (bmi) is ${user.bmi}, daily walking steps is ${user.steps}, daily distance is ${user.distance}
    daily active miuntes is ${user.activeminutes}, daily calories is ${user.calories}, daily exercise type is ${user.exercisetype}, daily exercise health rate is ${user.exeheartrate}, your daily sleep duration is ${user.sleepduration}, daily sleep quality is ${user.sleepquality}, daily sleep start is ${user.sleepstart}, daily sleep end is ${user.sleepend}, daily sleep interruption is ${user.sleepinter}, daily breakfast intake is ${user.fbreakfast}, daily lunch intake is ${user.flunch}, daily dinner intake is ${user.fdinner}, daily snack intake is ${user.fsnacks}, beverage intake is ${user.beverage}, chronic condition is ${user.chronichcond}, user allergies is ${user.allergies}, user symptoms is ${user.symptoms}, user hospitalization information is ${user.hospitalize}, daily users mood is ${user.mood}, daily users stress level is ${user.stress}, uses mental symptom is ${user.mentalsymptoms}, additional user information ${user.notes}, user glucose value is ${user.glucose}, cholesterol value is ${user.cholesterol}, user hemoglobin value is ${user.hemoglobin}, user carbohydrate value is ${user.carbohydrate}, user protien value is ${user.protiens}, user fat value is ${user.fats}, user vitamin value is ${user.vitamins}, user mineral value is ${user.minerals}, electrocardiogram(ecg) value is ${user.ecg}, daily health goal of the user is ${user.goals}, user blood type is ${user.bloodtype}, user family record is ${user.famimedical}, user vaccination record is ${user.vaccrecord}, user life assessment is ${user.lifeassess}`;
    // You can add more customization or logic here if needed
    return prompt;
     });
  }
  
  if(fetchedReminder !== undefined){
     userReminderPrompts = fetchedReminder.map((user:any) => {
    const prompt = `user full name is ${user.fullname}, user medication intake name is ${user.medicinename}, user medication dosage is ${user.dosage}, user medication taking days are ${user.days} S is for sunday, M is for monday, T is for tuesday, W is for wednesday, Th is for thursday, F is for friday, Sa is for saturday. user reason and description to take the medication is ${user.description}, the user is ${user.age} years of old, user phone number is ${user.phoneNumber}, user's chosen medication reminder type is ${user.type}, user's medication taking time is ${user.timeArray}, user agreement of their volunteer submission of medical data to the miaamor application is ${user.opted}, user's medication taking start date is ${user.startDate}, user's medication taking end date is ${user.endDate}`;
    return prompt;
     });
  }

  const AIcharacterPrompts = `
  Your character is an AI language model developed by OpenAI, and your name is Assistant Mia. Your purpose is to assist miaamor application users and provide information on a wide range of topics to the best of my abilities. Give analysis of user health and medication reminder based on the information provided to you so far about the user, do not list every single users data provided to you only give a general analysis of their health and medication when asked about their overall health stataus. You can help answer questions, provide explanations about miaamor users medical health, offer suggestions to improve miaamor users health, give information about miaamor users medication reminder and engage in conversation on various subjects if needed, currently I do not have access to provide miaamor information of other users only information that is regarding about you can be given to you.
`;


// Additional thing you must do is when a user asks you to set their health reminder, you should ask the questions starting from question number 1 and wait for the user's response before asking the next question. You should reminder you are not allowed to ask the question all together for any one or any request so do not list all the question at once in one response. Here are the steps you should follow:

// 1. Ask the user: "What is your name?" Wait for the user's response. If the user give a response move to asking question number 2 
// 2. Ask the user: "What is your age?" Wait for the user's response. If the user give a valid answer move to asking question number 3 but if the answer is not valid tell the to input the correct answer, only right the age number
// 3. Ask the user: "Which medication are you taking?" Wait for the user's response. If the user give a valid answer move to asking question number 4 but if the answer is not valid tell the to input the correct answer
// 4. Ask the user: "What is the dosage of the medicine?" Wait for the user's response. 
// 5. Ask the user: "How often do you want to take the medicine? List the days as follows: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday." Wait for the user's response. If the user give a valid answer move to asking question number 6 but if the answer is not valid tell the to input the correct answer
// 6. Ask the user: "At which time(s) are you taking the medicine? If there are multiple times, list them separated by commas." Wait for the user's response. If the user give a valid answer move to asking question number 7 but if the answer is not valid tell the to input the correct answer
// 7. Ask the user: "What is the reason for these medicines to be prescribed to you?" Wait for the user's response. If the user give a valid answer move to asking question number 8 but if the answer is not valid tell the to input the correct answer
// 8. Ask the user: "What is your phone number?" Wait for the user's response. If the user give a valid answer move to asking question number 9 but if the answer is not valid tell the to input the correct answer
// 9. Ask the user: "By what means do you want the reminder sent? Options: Email, SMS, Whatsapp, or Telegram." Wait for the user's response. If the user give a valid answer move to asking question number 10 but if the answer is not valid tell the to input the correct answer
// 10. Ask the user: "What is the start date to get the reminder to take your medication? Please provide the date in mm/dd/yyyy format." Wait for the user's response. If the user give a valid answer move to asking question number 11 but if the answer is not valid tell the to input the correct answer
// 11. Ask the user: "What is the end date to stop taking the medication? Please provide the date in mm/dd/yyyy format." Wait for the user's response. 

// After asking all the questions, thank the user for providing their information, and save their responses to the miaamor database.

    if(fetchedHealth === undefined && fetchedReminder === undefined){
      const langChainMessages = messages.map((m:any) => { if (m.role === "user") {
        const prompt = `your response should the user question itself with out any change`
        // Combine character and behavior with content
        const contentWithCharacterAndBehavior = `${prompt}: ${m.content}`
        return new HumanChatMessage(contentWithCharacterAndBehavior);
      } else {
        return new AIChatMessage(m.content);
      }
    });
    
      llm
        .call(langChainMessages, {}, [handlers])
        .catch(console.error);
      console.log("spencer", stream);
    
      // const responseMessages = stream.map((m: any, index: number) => {
      //   if (langChainMessages[index].role === "Image") {
      //     return {
      //       role: "AI",
      //       content: m.choices[0].message.content,
      //     };
      //   } else {
      //     return {
      //       role: "AI",
      //       content: m.text,
      //     };
      //   }
      // });
    
      return new StreamingTextResponse(stream);

    } else {
        const langChainMessages = messages.map((m:any) => { if (m.role === "user") {
              // Combine character and behavior with content
              const contentWithCharacterAndBehavior = `${userHealthPrompts} | ${userReminderPrompts} |${AIcharacterPrompts}: ${m.content}`
              return new HumanChatMessage(contentWithCharacterAndBehavior);
            } else {
              return new AIChatMessage(m.content);
            }
          });


          llm
            .call(langChainMessages, {}, [handlers])
            .catch(console.error);
          console.log("spencer", stream)
          return new StreamingTextResponse(stream);
    }
}



// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { HumanChatMessage, AIChatMessage } from "langchain/schema";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req:any, res:any) {
//   const { userId, messages } = req.json();
//   // Retrieve user's health data and medication reminders from the Prisma database
//   const userData = await prisma.user.findUnique({
//     where: { id: userId },
//     include: {
//       healthtracking: true,
//       reminders: true,
//     },
//   });

//   // Extract the health data and medication reminders
//   const { healthtracking, reminders } = userData || {};
//   const healthtrackingString = JSON.stringify(healthtracking);
//   const remindersString = JSON.stringify(reminders);
//   // Formulate the conversation messages including user's health data and medication reminders
//   const message = [
//     new HumanChatMessage(messages),
//     new AIChatMessage(healthtrackingString),
//     new AIChatMessage(remindersString),
//   ];

//   const llm = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     streaming: true,
//     temperature: 0.9,
//     openAIApiKey: "YOUR_API_KEY",
//   });

//   try {
//     // Generate response from OpenAI
//     const response = await llm.call(message);
//     console.log("monicandross", response)
//     // Extract the AI's reply from the response
//     const aiReply = response?.choices?.[0]?.message?.content;

//     // Send the AI's reply back to the user
//     res.send(aiReply);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("An error occurred.");
//   }
// }