// import the required dependencies
require("dotenv").config();
//const OpenAI = require("openai");
import formidable, { Fields, Files } from "formidable";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import fs from "node:fs";
import { exec } from 'child_process';

// import {OpenAI}  from "openai";
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const secretKey = process.env.OPENAI_API_KEY;
// const openai = new OpenAI({
//   apiKey: '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',
// });

import { IncomingForm } from 'formidable';
import path from 'path';

// Assuming you have set up the OpenAI API credentials
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {    
        const {base64St} = req.query
          console.log('Fetched:', base64St);
    try {
            console.log('Fire:', process.env.NEXT_PUBLIC_OPEN_AI_APIKEY);
            // if (!base64St) {
            // console.log('No video selected.');
            // return;
            // } else {
            // console.log('Video selected.');
            // }
        
            const data = {
                model: "gpt-4-vision-preview",
                messages: [
                    {
                    "role": "user",
                    "content": [
                        {
                        "type": "text",
                        "text": "Detail description of the image"
                        },
                        {
                        // "type": "image_url",
                        // "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                        "image_url": base64St,
                        // "image_url": {
                        //     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                        // },
                        // "image_url": {
                        //     "url": `data:image/jpeg;base64,${base64St}`
                        // }
                        }
                    ]
                    }
                ],
                max_tokens: 300
            };

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_APIKEY}` // Use environment variable for API key
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const apiResponse = await response.json();

                if (apiResponse.choices && apiResponse.choices.length > 0) {
                    const result = apiResponse.choices[0].message.content
                    console.log("text", apiResponse.choices[0].message.content)
                    return res.status(200).json({ message: result });
                } else {
                    console.error('No choices returned from API');
                    return res.status(400).json({ error: 'Failed to get a response from the API.' });
                }
            } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'An error occurred during the analysis.' });
            }  
        }catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'An error occurred during the analysis.' });
        }  
}
