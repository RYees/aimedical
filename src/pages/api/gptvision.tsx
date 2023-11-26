// import the required dependencies
require("dotenv").config();
//const OpenAI = require("openai");
import cv2 from 'opencv-react';
import cv from "@techstark/opencv-js"
import { VideoCapture } from 'opencv-react';
import formidable from "formidable";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import fs from "node:fs";
import { exec } from 'child_process';
import { JSDOM } from 'jsdom';

import {OpenAI}  from "openai";
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
// const data = {
//     model: "gpt-4-vision-preview",
//     messages: [
//       {
//         "role": "user",
//         "content": [
//           {
//             "type": "text",
//             "text": "What’s in this image?"
//           },
//           {
//             "type": "image_url",
//             "image_url": {
//               "url": data:image/jpeg;base64,${base64String}
//             }
//           }
//         ]
//       }
//     ],
//     max_tokens: 300
//   };
// Create a OpenAI connection
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: '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',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'OpenAI-Integration-Name': 'your-integration-name',
  //   'OpenAI-Integration-Version': 'your-integration-version',
  // },
});

async function askQuestion(question:any) {
  return new Promise((resolve, reject) => {
    readline.question(question, (answer:any) => {
      resolve(answer);
    });
  });
}

//import * as cv from '@techstark/opencv-js';
import { IncomingForm } from 'formidable';
import { fi } from 'date-fns/locale';
import path from 'path';

// Assuming you have set up the OpenAI API credentials
export const config = {
  api: {
    bodyParser: false,
  },
};

interface File {
  filepath?: string;
}

interface Files {
  file?: File[];
}

interface Data {
  files?: Files;
  fields?: formidable.Fields<string>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Fetched:');

  const fileSizeLimitGB = 2; // Maximum file size limit in gigabytes
  const maxFileSize = fileSizeLimitGB * 1024 * 1024 * 1024; // Convert gigabytes to bytes

  const form = new IncomingForm({
    maxFileSize,
  });

  const data: Data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const file = data.files?.file?.[0];
  const selectedVideo = file?.filepath;

  // Rest of your code...

  try {
    console.log('Fetched:', selectedVideo);

    if (!selectedVideo) {
      console.log('No video selected.');
      return;
    } else {
      console.log('Video selected.', selectedVideo);
    }

    
    const framesFolderPath = path.join(process.cwd(), 'public', 'frames');
    // Create the frames folder if it doesn't exist
    if (!fs.existsSync(framesFolderPath)) {
      fs.mkdirSync(framesFolderPath);
    }

    const command = `ffmpeg -i ${selectedVideo} -vf "select=eq(pict_type\\,PICT_TYPE_I)" -vsync 0 ${framesFolderPath}/frame_%04d.jpg`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error extracting frames:', error);
        return res.status(500).json({ error: 'Error extracting frames' });
      }

      console.log('Frames extracted successfully.');

        // Read the extracted frames from the framesFolderPath
        const frames = fs.readdirSync(framesFolderPath).map((fileName) => {
        const framePath = path.join(framesFolderPath, fileName);
        //const frameURL = `http://localhost:3000/frames/${fileName}`; // Use localhost server URL
        //return frameURL;
        const buf = fs.readFileSync(framePath);
        const encodedFrame = buf.toString('base64');
        return encodedFrame;
      });
       const firstFourFrames = frames.slice(0, 11); // Get the first four frames
      //const firstFourFrames = frames.filter((_, index) => index % 10 === 0);

      console.log("iron heights", frames.length)
      const prompt = "Can you tell me more about your question?"
      

      const promptMessages = [
        {
          role: 'user',
          content: [
            'These are frames from a video that I want to upload. Generate a compelling full paragraph description on the video instead a one sentence title',
            ...firstFourFrames.map((frame, index) => ({
              image: frame,
              resize: 768,
            })),
          ],
        },
      ];

      const params = {
        model: 'gpt-4-vision-preview',
        messages: promptMessages,
        maxTokens: 200,
      };
      
         // Setting parameters for our request
        const createChatCompletionEndpointURL =
        "https://api.openai.com/v1/chat/completions";

        const createChatCompletionReqParams = {
          model: "gpt-4-vision-preview",
          messages: promptMessages ,          
        };

         // Sending our request
        const createChatCompletionRes = await fetch(
          createChatCompletionEndpointURL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`,
            },
            body: JSON.stringify(createChatCompletionReqParams),
          }
        );

        // Processing the response body
        const createChatCompletionResBody = await createChatCompletionRes.json();// Error handling for the OpenAI endpoint
        console.log("you do", createChatCompletionResBody)
        if (createChatCompletionRes.status !== 200) {
          let error = new Error("Create chat completion request was unsuccessful.");
          // error.statusCode = createChatCompletionRes.status;
          // error.body = createChatCompletionResBody;
          throw error;
        }
    
        // Properties on the response body
        const completionText =
          createChatCompletionResBody.choices[0].message.content;
        const usage = createChatCompletionResBody.usage;

         // Logging the results
        // console.log(`Create chat completion request was successful. Results:
        //   Completion: 
          
        //   ${completionText}
          
        //   Token usage:
        //   Prompt: ${usage.prompt_tokens}
        //   Completion: ${usage.completion_tokens}
        //   Total: ${usage.total_tokens}
        // `);
    
        // Sending a successful response for our endpoint
        return res.status(200).json({ completion: completionText });




      // Make the API call to OpenAI to generate the description
      // const result = await openai.ChatCompletion.create(params);

      // const description = result.choices[0].message.content;
      // console.log('Generated Description:', description);

      // Rest of your code for further processing or response handling
      // For example, you can send a response with the generated description
      // return res.status(200).json({ description });
    });
  } catch (error) {
    console.error('Error:', error);
    // Handle the error as needed
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// export default async function handler(req: NextApiRequest,
//   res: NextApiResponse) {
//   console.log('Fetched:');
//   //if (req.method === "POST") {
   // const form = formidable();
  //  const fileSizeLimitGB = 2; // Maximum file size limit in gigabytes
  //  const maxFileSize = fileSizeLimitGB * 1024 * 1024 * 1024; // Convert gigabytes to bytes
 
  //  const form = new IncomingForm({
  //    maxFileSize,
  //  });
 

//   const data = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });

//   const file = data?.files?.file[0];
//             const readStream = fs.createReadStream(file.filepath);
//             console.log('Fetched:', file.originalFilename);
//   //return res.status(200).json({ message: 'File uploaded successfully' });

//   const selectedVideo = file.filepath;
  
//   try {
//     console.log('Fetched:', selectedVideo);

//     if (!selectedVideo) {
//       console.log('No video selected.');
//       return;
//     } else {
//       console.log('Video selected.', selectedVideo);
//     }

//     const videoCapture = new cv.VideoCapture(file.filepath); // Assuming `selectedVideo` is a file object with a `path` property
//     const base64Frames = [];

//     let frame = new cv.Mat();
//     let frameIndex = 0;

//     while (videoCapture.read(frame)) {
//       // Process the frame (e.g., encode to base64, save, etc.)
//       const buf = Buffer.from(frame.data);
//       const encodedFrame = buf.toString('base64');
//       base64Frames.push(encodedFrame);

//       frameIndex++;

//       // Break the loop if you want to extract a specific number of frames
//       // or if you have reached the end of the video
//       // ...
//     }

//     console.log(`${base64Frames.length} frames read.`);

//     const promptMessages = [
//       {
//         role: 'user',
//         content: [
//           'These are frames from a video that I want to upload. Generate a compelling description that I can upload along with the video.',
//           ...base64Frames.map((frame, index) => ({
//             image: frame,
//             resize: 768,
//           })),
//         ],
//       },
//     ];

//     const params = {
//       model: 'gpt-4-vision-preview',
//       messages: promptMessages,
//       maxTokens: 200,
//     };

//     const result = await openai.ChatCompletion.create(params);

//     const description = result.choices[0].message.content;
//     console.log('Generated Description:', description);

//     // Rest of your code for further processing or response handling

//   } catch (error) {
//     console.log("error", error);
//   }
// }