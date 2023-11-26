/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import formidable from "formidable";
import AWS from "aws-sdk";
import fs from "node:fs";
import { Credentials } from "@aws-sdk/types";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const URL = process.env.URL;
const bucket = process.env.BUCKET;
const credentials = {
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY  
} as Credentials;

const S3 = new S3Client({
  region: "auto",
  endpoint: URL,
  credentials,
});
export const config = {
  api: {
    bodyParser: false,
  },
};
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try{
      if (req.method == "POST") {
        //const { name } = req.query;
        const form = formidable();
        
        form.parse(req, async (err: any, fields: any, files: any) => {
          //res.status(400).json({ mess: files });
          if(!files || !files.file) {
            res.status(400).json({ message: 'No file selected' });
            return;           
          // if (!files.image) {
          //   res.status(400).send("No file uploaded");
          //   return;
          } else {
            console.log('Fetched:', files);
            return res.status(200).json({ message: 'File uploaded successfully' });
            
            const {file}  = files;
            const f = file[0];
            // const f = file["PersistentFile"]; type:"audio/mpeg" type:"image/jpeg"
            console.log("filesrun", f.mimetype)
            const readStream = fs.createReadStream(f.filepath);
            const key = f.originalFilename;
            console.log("friday", key)

            // const imageUrl = `https://d4e1d76322b7d7d72b50b17a03567387.r2.cloudflarestorage.com/${bucket}/${key}`;
            // const image = `https://pub-e23c9e8d742940a68f4f4bfc8ea2d387.r2.dev/inchy/${key}`
            // const params = {
            //   Headers: {
            //     'Content-Length': f.size 
            //   },
            //   Bucket: bucket,
            //   Key: f.originalFilename,
            //   Body: readStream,
            //   ACL: "public-read",
            // };


            // try {
            //   const command = new PutObjectCommand(params);
            //   const value = await S3.send(command); 
            //   console.log(
            //     await getSignedUrl(S3, new GetObjectCommand({Bucket: 'inchy', Key: f.originalFilename}), { expiresIn: 3600 })
            //   )
            //   if(value){
            //     const imgurl = {
            //       image: image
            //     }
            //     console.log("support", imgurl)
            //     return res.status(201).send(imgurl);
            //   }
            // } catch (error) {
            //   console.log(error);
            //   res.status(500).send("no file uploaded");
            // }
          }
        });
      }
    }catch(error){
      console.log("error", error)
    }
}



// // import the required dependencies
// require("dotenv").config();
// const OpenAI = require("openai");
// //import  OpenAI  from "openai";
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Create a OpenAI connection
// const secretKey = process.env.OPENAI_API_KEY;
// const openai = new OpenAI({
//   apiKey: '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',
//   headers: {
//     'Content-Type': 'application/json',
//     'OpenAI-Integration-Name': 'your-integration-name',
//     'OpenAI-Integration-Version': 'your-integration-version',
//   },
// });

// async function askQuestion(question:any) {
//   return new Promise((resolve, reject) => {
//     readline.question(question, (answer:any) => {
//       resolve(answer);
//     });
//   });
// }

// export default async function main() {
//   try {
//     const assistant = await openai.beta.assistants.create({
//       name: "Math Tutor",
//       instructions:
//         "You are a personal math tutor. Write and run code to answer math questions.",
//       tools: [{ type: "code_interpreter" }],
//       model: "gpt-4-1106-preview",
//     });

//     // Log the first greeting
//     console.log(
//       "\nHello there, I'm your personal math tutor. Ask some complicated questions.\n"
//     );

//     // Create a thread
//     const thread = await openai.beta.threads.create();

//     // Use keepAsking as state for keep asking questions
//     let keepAsking = true;
//     while (keepAsking) {
//       const userQuestion = await askQuestion("\nWhat is your question? ");

//       // Pass in the user question into the existing thread
//       await openai.beta.threads.messages.create(thread.id, {
//         role: "user",
//         content: userQuestion,
//       });

//       // Use runs to wait for the assistant response and then retrieve it
//       const run = await openai.beta.threads.runs.create(thread.id, {
//         assistant_id: assistant.id,
//       });

//       let runStatus = await openai.beta.threads.runs.retrieve(
//         thread.id,
//         run.id
//       );

//       // Polling mechanism to see if runStatus is completed
//       // This should be made more robust.
//       while (runStatus.status !== "completed") {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
//       }

//       // Get the last assistant message from the messages array
//       const messages = await openai.beta.threads.messages.list(thread.id);

//       // Find the last message for the current run
//       const lastMessageForRun = messages.data
//         .filter(
//           (message:any) => message.run_id === run.id && message.role === "assistant"
//         )
//         .pop();

//       // If an assistant message is found, console.log() it
//       if (lastMessageForRun) {
//         console.log(`${lastMessageForRun.content[0].text.value} \n`);
//       }

//       // Then ask if the user wants to ask another question and update keepAsking state
//       const continueAsking = await askQuestion(
//         "Do you want to ask another question? (yes/no) "
//       );
//       keepAsking = (continueAsking as any).toLowerCase() === "yes";
      

//       // If the keepAsking state is falsy show an ending message
//       if (!keepAsking) {
//         console.log("Alrighty then, I hope you learned something!\n");
//       }
//     }

//     // close the readline
//     readline.close();
//   } catch (error) {
//     console.error(error);
//   }
// }
