import React from 'react';
import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import { Switch } from '@headlessui/react';
import Image from 'next/image';
import Health from '~/components/AInotification/Health';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Livemode = () => {
  const webcamRef = useRef(null);
  const [mirrored, setMirrored] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [base64St, setBase64] = useState(null);
  const [result, setResult] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [reminder, setReminder] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []); // Run the effect only once on component mount



  useEffect(() => {
    if (imgSrc) {
      handleSubmitImage();
    }
  }, [imgSrc]);

  const handleSubmitImage = async () => {
    setResult('');
    setStatusMessage('Sending request...');
    const base64S = imgSrc && (imgSrc as any).split(",")[1]; 
    const data = {
      model: "gpt-4-vision-preview",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "What’s in this image?"
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `data:image/jpeg;base64,${base64S}`
              }
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
          'Authorization': `Bearer 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` // Use environment variable for API key
        },
        body: JSON.stringify(data)
      });
  
      setUploadProgress(50); // Midway progress
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const apiResponse = await response.json();
      setUploadProgress(100); // Final progress
  
      if (apiResponse.choices && apiResponse.choices.length > 0) {
        const content = apiResponse.choices[0].message.content;
        setResult(content);
  
        // Check for distress, pain, sadness, etc. in the result
        const keywords = ['distress', 'pain', 'sadness'];
        const hasExpression = keywords.some(keyword =>
          content.toLowerCase().includes(keyword)
        );
  
        if (hasExpression) {
          // Perform action for patient condition evaluation
          console.log('Facial expression indicates distress, pain, or sadness.');
        } else {
          console.log('Facial expression does not indicate distress, pain, or sadness.');
        }
  
        setStatusMessage('Analysis complete.');
      } else {
        console.error('No choices returned from API');
        setStatusMessage('Failed to get a response from the API.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('An error occurred during the analysis.');
    }
  };

  const handleSubmit = async () => {
    setResult('')
    //event.preventDefault();
    setStatusMessage('Sending request...');
    const data = {
    model: "gpt-4-vision-preview",
    messages: [
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": "What’s in this image?"
            },
            {
            "type": "image_url",
            "image_url": "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg",
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
        'Authorization': `Bearer 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` // Use environment variable for API key
        },
        body: JSON.stringify(data)
    });

    setUploadProgress(50); // Midway progress

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    setUploadProgress(100); // Final progress

    if (apiResponse.choices && apiResponse.choices.length > 0) {
        const content = apiResponse.choices[0].message.content;
        setResult(content);
  
        // Check for distress, pain, sadness, etc. in the result
        const keywords = ['distress', 'pain', 'sadness', 'stress'];
        const hasExpression = keywords.some(keyword =>
          content.toLowerCase().includes(keyword)
        );
  
        if (hasExpression) {
          // Perform action for patient condition evaluation
          setReminder(true)
          console.log('Facial expression indicates distress, pain, or sadness.');
        } else {
          console.log('Facial expression does not indicate distress, pain, or sadness.');
        }
  
        setStatusMessage('Analysis complete.');
      } else {
        console.error('No choices returned from API');
        setStatusMessage('Failed to get a response from the API.');
      }

    } catch (error) {
    console.error('Error:', error);
    setStatusMessage('An error occurred during the analysis.');
    }
};

  const capture = useCallback(() => {
    const imageSrc = (webcamRef as any)?.current?.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    const interval = setInterval(capture, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [capture]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container font-abc">
        {reminder === true ?(
           <Health/> 
        ):null}     

      {/* <p className='text-white'>{result}</p> */}

      <div className='flex justify-center gap-2 my-5'>
        <h1 className='text-white font-abc'>Turn on live mode</h1>
        <Switch
            checked={webcamOpen}
            onChange={setWebcamOpen}
            className={`${
            webcamOpen ? 'bg-[#16151a]' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
            className={`${
                webcamOpen ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
      </div>
        
        {webcamOpen && (
            <div className='flex bg-gradient-to-t from-[#16151a] to-[#262a2d]'>
              <div className='mx-auto'>
                <Webcam
                // height={700}
                // width={700}
                className="flex justify-center border-4 border-[#16151a]  my-2 mx-auto rounded-lg shadow-xl"
                ref={webcamRef}
                mirrored={mirrored}
                screenshotFormat="image/jpeg"
                screenshotQuality={0.8}
                />   
              </div>         

            <div className='flex flex-col'>
                {imgSrc !== null ? (
                <div className='mt-5 mr-5 rounded-lg'>                
                    <img className='h-64 w-64' src={imgSrc as any} alt="captured image" />
                </div>
                ):null}

                <div className="controls">
                    <div className='flex justify-between py-1 px-3'>
                        <div className='bg-[#16151a] inline-block px-10 rounded mx-auto text-[#f4f4f5]'>
                            <input
                                type="checkbox"
                                checked={mirrored}
                                onChange={(e) => setMirrored(e.target.checked)}
                            />
                            <label className='ml-1 font-abc text-sm'>Mirror</label>
                        </div>
                        
                      {/* <button className='cursor-pointer bg-green-400 p-2 rounded' onClick={handleSubmit}>Test</button> */}
                    </div>
                </div>
            </div>
        </div>
        )}      
    </div>
  );
}

export default Livemode;