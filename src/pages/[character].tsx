import Head from "next/head";
import { Menu } from "@headlessui/react";
import { MdSend } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { HiMoon, HiOutlineMoon } from "react-icons/hi"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillRightCircle } from "react-icons/ai"
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsMicMuteFill, BsMicFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useWhisper } from "@chengsokdara/use-whisper";
import { PrismaClient } from "@prisma/client";
import {GoBellFill} from "react-icons/go"

import type { NextPage } from "next";
import { useChat } from "ai/react";
import axios from "axios";
import { request } from "http";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState, useRef, useCallback  } from "react";
import { isWeakMap } from "util/types";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import React from "react"
import ContentLoader from "react-content-loader"
import SetRemind from "~/components/AInotification/SetRemind";
import { Transition } from '@headlessui/react'
import { useTimeoutFn } from 'react-use'
import {IoDocumentAttachSharp} from "react-icons/io5"
import { v4 as uuidv4 } from 'uuid';




interface FormState {
    fullname: string;
    age: string;
    medicinename: string;
    dosage: string;
    days: string;
    time: string[]; // Define the type of 'time' as an array of strings
    description: string;
    phoneNumber: string;
    type: string;
    startDate: string;
    endDate: string;
  }

type Message = {
    id: string;
    role: string;
    content: string;
  };
  
  // Assuming messages is an array of type Message[]
  const fetchedMessages: Message[] = [
    // Array items with id, role, and content properties
  ];

const Chat = (props:any) => {
        const character = props.character;
        const aiSdkChat = `/api/aiSdkChat`;
        const langChainChat = `/api/langChainChat`;
        const [fetchedMessages, setFetchedMessages] = useState([]); 
        const [fetchedHealth, setFetchedHealth] = useState([]); 
        const [fetchedReminder, setFetchedReminder] = useState([]); 
        const [note, setNote] = useState('previous history'); 
        const [answers, setAnswers] = useState([]);
        const [loader, setLoader] = useState(false);

        const [isFetching, setIsFetching] = useState(true);
        const [context, setContext] = useState({});
        const [gradientColor, setGradientColor] = useState('bg-gradient-to-br from-[#eeb35bf1] via-[#ee5bc2f1] to-[#eeb35bf1]');
        const [isFirstGradient, setIsFirstGradient] = useState(true);
        const [isLoad, setLoad] = useState(true);
        const [isloading, setLoading] = useState(false);
        const [isShow, setShow] = useState(true);
        const [isView, setView] = useState(false);
        const text = 'Set me up a health reminder?';

        const [isRecording, setIsRecording] = useState(false);
        const { data: session, status } = useSession();
        const user = session?.user;
        const router = useRouter();
      
        // useEffect(() => {
        //   if (!user) {
        //     router.push("/");
        //   }
        // }, []); // Run the effect only once on component mount
      
      

        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleAttachIconClick = useCallback((event:any) => {
            event.stopPropagation();
            if (fileInputRef.current) {
            fileInputRef.current.click();            
            }

        }, []);

          
        const [form, setForm] = useState<FormState>({            
            fullname: '', 
            age:'', 
            medicinename:'', 
            dosage:'', 
            days:'',
            time: [],
            description:'',              
            phoneNumber: '', 
            type:'', 
            startDate: '',
            endDate: ''
        });
        const isFormValid = Object.values(form).every(value => value !== '');
        // const [input, setInput] = useState();
         console.log("revert", isFormValid)
         //console.log("form", form)
            
        let { messages, input, isLoading, stop, handleInputChange, setInput, handleSubmit} =
        useChat({
        api: langChainChat,  
            body: {userId: user?.id, fetchedHealth, fetchedReminder}
        });
        const truncateInput = (text:any) => {
            return text.slice(0, 4096);
          };
        
        //console.log("Message Data", messages);

        const {
            recording,
            speaking,
            transcribing,
            transcript,
            pauseRecording,
            startRecording,
            stopRecording,
        } = useWhisper({
            apiKey: "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", // YOUR_OPEN_AI_TOKEN
        });

        const userdata = async() => {
            const response = await axios.get(`/api/fetchuser?userId=${user?.id}`)
            setFetchedHealth(response?.data?.healthtracking)
            setFetchedReminder(response?.data?.reminders)
        }

        useEffect(() => {
            const timer = setTimeout(() => {
                userdata();
            }, 2000); // Change this value to adjust the delay
        
            return () => clearTimeout(timer);
        }, [2000]);

        useEffect(() => {
            const saveMessageToDatabase = async (message:any) => {
            try {
                const requestinputs = [{
                    chatid: message.id,
                    role: message.role,
                    content: message.content,
                    userId: user?.id,
                    characterId: character?.id,
                }]
                const response = await axios.post('/api/characterchat', requestinputs)
                console.log("New message saved to database");
                if(response){
                    // messages = [];
                    //console.log("fall asleep", messages)
                }
            } catch (error) {
                console.error("Error saving message to database:", error);
            }
            };
        
            if (!isLoading && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            saveMessageToDatabase(lastMessage);
            }
        }, [messages, isLoading, user]);
    
    //console.log("test", user?.id, character?.id)event: any
        const handlerSendIcon = async () => {       
                try {
                    setAnswers([]);
                const requestinputs = [{
                    chatid: '',
                    role: "user",
                    content: input,
                    userId: user?.id,
                    characterId: character?.id,
                }]
                const response = await axios.post('/api/characterchat', requestinputs)
                console.log("saved to database", response);
                if(response.data === null){
                    toast.error('connection problem!');
                    //router.push('/Stacey'); 
                                
                } else {
                    handleRelated(input);  
                }
                
            } catch (error) {
                console.error("Error saving message to database:", error);
            }
            
        };       

 
        const handler = async (event: any) => {
            if (event.keyCode === 13) {
                try {
                    // const truncatedInput = truncateInput(input);
                    // setInput(truncatedInput);
                    //setAnswers([]);
                const requestinputs = [{
                    chatid: '',
                    role: "user",
                    content: input,
                    userId: user?.id,
                    characterId: character?.id,
                }]
                const response = await axios.post('/api/characterchat', requestinputs)
                console.log("New message saved to database", response);
                if(response.data === null){
                    toast.error('connection problem!');
                    //router.push('/Stacey'); 
                } else {
                    handleRelated(input);  
                    if(form.fullname === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            fullname: input,
                        }));
                    } else if(form.age === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            age: input,
                        }));
                    } else if(form.medicinename === '' && input !== text){
                        setForm((prevFF) => ({
                            ...prevFF,
                            medicinename: input,
                        }));
                    } else if(form.dosage === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            dosage: input,
                        }));
                    } else if(form.days === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            days: input,
                        }));
                    } else if(form.time.length === 0 && input !== text){      
                        // setForm((prevForm) => ({
                        //     ...prevForm,
                        //     time: [...prevForm.time, input]
                        //   }));       
                        // setForm((prevFF) => ({
                        //     ...prevFF,
                        //     time: input,
                        // }));
                        const newTimes = input.split(',').map((time) => time.trim()); 
                            setForm((prevForm) => ({
                                ...prevForm,
                                time: [...prevForm.time, ...newTimes], 
                            }));
                    } 
                    else if(form.description === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            description: input,
                        }));
                    } else if(form.phoneNumber === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            phoneNumber: input,
                        }));
                    } else if(form.type === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            type: input,
                        }));
                    }  else if(form.startDate === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            startDate: input,
                        }));
                    } else if(form.endDate === '' && input !== text){             
                        setForm((prevFF) => ({
                            ...prevFF,
                            endDate: input,
                        }));
                    } 
                }
                
            } catch (error) {
                console.error("Error saving message to database:", error);
            }
            }
        };

        const setReminder = async () => {
            try {    
                const timer = setTimeout(async() => {             
                    const res = await axios.post('/api/reminders', 
                    {
                        userId: user?.id,                      
                        medicinename: form.medicinename,    
                        dosage: form.dosage,           
                        days: form.days,            
                        description: form.description,     
                        age: parseInt(form.age),             
                        phoneNumber: form.phoneNumber,     
                        type: form.type,            
                        timeArray: form.time,    
                        fullname: form.fullname,
                        startDate: form.startDate,
                        endDate: form.endDate, 
                        opted: true, 
                    })
                    console.log('success', res.data);            
                    if(res){
                            form.type='', 
                            form.fullname = '', 
                            form.medicinename ='', 
                            form.description = '', 
                            form.phoneNumber = '', 
                            form.dosage ='', 
                            form.age ='', 
                            form.days ='',
                            form.time = []
                            form.startDate = '',
                            form.endDate = ''
                    } 
                }, 3000); // Change this value to adjust the delay
            
                return () => clearTimeout(timer);
            } catch(error){
                console.log("error", error);
            }
        }

        if(isFormValid === true){
            setReminder();
        }           

        const handleRelated = async(query:any) => {
            setLoader(true)
            try{
            const response = await axios.post('/api/openai', {
                //query: 'what are related questions to how can i make a sandwich?', // Replace with your desired question
                // Additional parameters if required
                query: `what are related questions to ${query}`
              });
              const { data } = response;
              const { answer } = data;
                //console.log("related_questions:", answer.text)

                let text = answer.text;
                const lines = text.split('\n');        
                const items = lines
                        .map((line:any) => line.trim().replace(/^\d+\.\s*/, '').replace(/[_-]/g, ''))
                        .filter((line:any) => line !== '');
                const newItem = "tell me more";
                items.unshift(newItem);
                //console.log(items);
                const displayItems = items.slice(0, 4);
                setAnswers(displayItems);
                if(items.length !== 0){
                    setLoader(false)
                }

            } catch(error){
                console.log(error)
            }
        }

      
        const handleAnswerClick = (answer:any) => {
            //console.log("book", answer)
            console.log(handleInputChange);
            setInput(answer);    
            setBase64String('');
            setBase64('');     
            setResult('')          
        };

        const changeGradientColor = () => {
            if (isFirstGradient) {
                setGradientColor('bg-gradient-to-br from-[#eeb35bf1] via-[#ee5bc2f1] to-[#eeb35bf1]');
            } else {
                setGradientColor('bg-gradient-to-br from-[#16151a] via-[#262a2d] to-[#16151a]');
            }
            setIsFirstGradient(!isFirstGradient);
        };

        const fetchStoredMessages = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/fetchcharacterchat?userId=${user?.id}&characterId=${character?.id}`); 
                const fetchedMessages = response.data; 
                setFetchedMessages(fetchedMessages);  
                
                if(fetchedMessages.length !== 0){
                    setShow(false)                
                    setLoading(false);
                } else {
                    setLoading(false);
                    toast.error('Nothing found, start chatting!', { duration: 5000 });
                }        
            } catch (error) {
                console.error("Error fetching stored messages:", error);
            } finally {
                setIsFetching(false);
            }
        };

        const [base64String, setBase64String] = useState("");
        const [base64St, setBase64] = useState("");
        const [result, setResult] = useState('');
        const [statusMessage, setStatusMessage] = useState('');
        const [uploadProgress, setUploadProgress] = useState(0);
        const [imageanalysis, setImageAnalysis] = useState('')
    

        const handleFileUpload = async (event:any) => {
            const file = event.target.files[0];
            const files = event.target.files[0];

            // Check if the file is an image file
            if (!files.type.startsWith("image/")) {
              toast.error("The selected file is not an image file");
              event.preventDefault();
              return;
            }
            const imageData = new FormData()
            imageData.append("file", files);
      
            const upload = await fetch("/api/uploadFile", {
              method: "POST", // changed from GET
              body: imageData,
            }).then((r) => r.json());
            if (upload) {
              setLoading(false);
              console.log("die", upload.image)
              setBase64(upload.image);
              ProcessImage()
            }
            // const reader = new FileReader();        
            // reader.onload = () => {
            //   const base64 = reader.result;
            //   const base64s = (reader.result as string)
            //     .replace("data:", "")
            //     .replace(/^.+,/, "");
            //   console.log("more land", base64s)
            //   setBase64String(base64 as string);
            //    setBase64(base64s);
            // };            
            // //handleSubmitImage(event);
            // reader.readAsDataURL(file);
        };
        
        const handleSubmitImage = async (event:any) => {
            setResult('')
            event.preventDefault();
            setStatusMessage('Sending request...');
            const data = {
            model: "gpt-4-vision-preview",
            messages: [
                {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": "write the html code of the image design"
                    },
                    {
                    "type": "image_url",
                    //"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                    "image_url": {
                        "url": `data:image/jpeg;base64,${base64St}`
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
                setResult(apiResponse.choices[0].message.content);
                console.log("text", apiResponse.choices[0].message.conten)
                setStatusMessage('Analysis complete.');
                callTheChat()
            } else {
                console.error('No choices returned from API');
                setStatusMessage('Failed to get a response from the API.');
            }
            } catch (error) {
            console.error('Error:', error);
            setStatusMessage('An error occurred during the analysis.');
            }
        };

        const callTheChat = async() => {
            const val = "Analysis"
            // console.log("help you", {result})
            const finalresult = val + ": " + result;
            console.log(finalresult);
            setInput(finalresult);
            //console.log("let me help you", {input})
            //handleSubmit({input}) 
        }

        const ProcessImage = async() => {
            try {
            setLoad(true)
            const url = 'https://pub-e23c9e8d742940a68f4f4bfc8ea2d387.r2.dev/inchy/charttt.JPG'
            const api = `/api/imagegpt4vision?base64St=${url}`          
            const upload = await axios.post(api)
            if(upload){
                setLoad(false)
                console.log("response", upload)
                handleChatSubmit(upload.data.message)
            }          
            } catch (error) {
            console.log("error", error);
            }
        }   
    
    const handleChatSubmit = async(value:any) => {
        console.log("sweet")
        const response = await axios.post('/api/langChainChat', {
            messages: [{content: value, role:'Image'}]
        })
        if(response){
            //console.log("kidbe", response.data)
            setImageAnalysis(response.data)
            callDatabase(value)
        }
    };

    const callDatabase = async(value:any) => {  
        console.log("allday")      
        const requestinputs = [
            {
                chatid: '',
                role: "user",
                content: "Analays medication prescription",
                userId: user?.id,
                characterId: character?.id,
            }, 
            {
                chatid: uuidv4(),
                role: "Image",
                content: value,
                userId: user?.id,
                characterId: character?.id,
            }
        ]
        const response = await axios.post('/api/characterchat', requestinputs)
        console.log("New message saved to database");
    }
    
    const love = async() =>{
        const requestinputs = [{
            chatid: '',
            role: "user",
            content: "input",
            userId: user?.id,
            characterId: character?.id,
        }]
        const response = await axios.post('/api/characterchat', requestinputs)
        console.log("New message saved to database", response);
        if(response.data === null){
            toast.error('connection problem!');
            //router.push('/Stacey'); 
        } 
    }
    console.log("vision", messages)
    
  return (
    <>
 
    <div className="flex w-full sm:h-full md:h-full lg:h-full xl:h-full 2xl:h-full h-screen -ml-2 sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0 flex-col items-center justify-center overflow-hidden pb-5 text-[#f4f4f5] font-abc rounded">  
        <div className={`relative flex w-full max-w-6xl flex-grow cursor-pointer flex-col overflow-hidden shadow-5xl border-2 border-gray-100 m-2 rounded-xl ${gradientColor}`}>
            <div className="flex w-full justify-between border-b-[1px] border-yellow-600">
                <div className="flex h-full flex-col justify-center p-2">
                    {/* <p className="text-white" onClick={ProcessImage}>baba</p>
                    <p className="cursor-pointer text-white bg-green-700 " onClick={()=>handleChatSubmit("white mormon children")}>doct</p> */}
                    <div className=" text-[16px] font-[600]">
                        {/* {character?.name} */}
                        {character?.name === null || character?.name === '' || character?.name === undefined || character?.name === 'null'  ? (
                            <ContentLoader
                            speed={2}
                            width={150}
                            height={30} // Adjust the height and make it equal to the width for a square box
                            viewBox="0 0 150 30" // Adjust the viewBox accordingly
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            className="ml-4 inline-block"
                            >
                            <rect x="0" y="0" rx="3" ry="3" width="150" height="30" /> 
                            </ContentLoader>
                            ):(
                                character?.name
                        )}
                        {/* <span className="mx-1 text-[12px] font-[400]">
                        {character?.count}m
                        </span> */}
                    </div>
                    {/* <div className="text-[13px] font-[400] italic text-gray-900">
                        Created by
                        <span className="text-[12px] font-[600]">
                        @{character?.creator}
                        </span>
                    </div> */}
                </div>
        
                <div className="relative flex h-full items-center gap-2">              
                    <FaShare />
                    <Menu>
                        <Menu.Button>
                        {" "}
                        <BiDotsVerticalRounded />
                        </Menu.Button>
                    </Menu>
                    <button className="" onClick={changeGradientColor}>
                        {isFirstGradient?<HiOutlineMoon size={30}/>:
                        <HiMoon size={30} className="text-yellow-400"/>}
                    </button>
                </div>
            </div>
       
       
            <div className="relative flex h-0 max-w-[100%] flex-col flex-grow overflow-auto p-4">
                <div className="mt-2 flex w-full">                    
                    <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
                        {/* <img alt="charimage" src={character?.image}  className="rounded-full"/> */}
                        {character?.image === null  || character?.image === '' || character?.image === undefined || character?.image === 'null' ? (
                            <ContentLoader
                            speed={2}
                            width={50}
                            height={50} // Adjust the height and make it equal to the width for a square box
                            viewBox="0 0 50 50" // Adjust the viewBox accordingly
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            className="-mt-2 -ml-2 rounded-full inline-block"
                            >
                            <rect x="0" y="0" rx="3" ry="3" width="50" height="50" /> 
                            </ContentLoader>
                            ):(                              
                                <img alt="charimage" src={character?.image}  className="rounded-full"/>
                        )}
                    </div>

                    <div>
                        <div className="rounded-r-lg rounded-bl-lg p-3">
                            <div className="text-[15px] font-[650]">
                            {character?.name === null || character?.name === '' || character?.name === undefined || character?.name === 'null' ? (
                                <ContentLoader
                                speed={2}
                                width={150}
                                height={25} // Adjust the height and make it equal to the width for a square box
                                viewBox="0 0 150 25" // Adjust the viewBox accordingly
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                                className="ml-4 mb-2 inline-block"
                                >
                                <rect x="0" y="0" rx="3" ry="3" width="150" height="25" /> 
                                </ContentLoader>
                                ):(
                                    character?.name
                            )}
                                {/* <span className="h-4 w-14 text-gray-900 rounded-sm p-[1px] text-[12px] font-[600] italic">
                                @{character?.creator}
                                </span> */}
                            </div>
                            <p className="text-[15px] font-[400]">
                                {/* {character?.description} */}
                                {character.description === null || character.description === '' || character.description === undefined || character?.description === 'null' ? (
                                    <ContentLoader
                                    speed={2}
                                    width={1000}
                                    height={60} // Adjust the height and make it equal to the width for a square box
                                    viewBox="0 0 1000 60" // Adjust the viewBox accordingly
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                    className="ml-4 inline-block"
                                    >
                                    <rect x="0" y="0" rx="3" ry="3" width="1000" height="60" /> 
                                    </ContentLoader>
                                    ):(
                                        character?.description
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {isShow? 
                    <div className="flex justify-center mx-auto">
                        <button className="relative text-center text-sm bg-white p-2 w-36 rounded-full text-gray-200 hover:text-gray-400" onClick={fetchStoredMessages}>
                            previous history
                        </button>
                        
                        {isloading?                
                        <div role="status relative">
                            <svg
                                aria-hidden="true"
                                className="absolute -ml-5 mt-3 h-4 w-4 animate-spin fill-black text-gray-200 dark:text-gray-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                                />
                                <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                                />
                            </svg>
                        </div>                    
                        : null}
                    </div>
                :null}
            
                <div>
                    {fetchedMessages.map((m: any) => (
                        
                    <div key={m?.id} className="mt-2 flex w-full">
                        {m.role === "user" ? (
                        <>
                            <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
                                {user && (
                                    <img
                                    alt="charimage"
                                    src={session.user.image || ""}
                                    className="rounded-full h-10 w-10"
                                    />
                                )}
                            </div>

                            <div>
                                <div className="rounded-r-lg rounded-bl-lg  p-3">
                                    <div className="text-[15px] font-[650]">
                                        {user ? session.user.name : "Guest"}
                                    </div>

                                    <div className="bg-white bg-opacity-50 rounded p-2">
                                        <p className="text-[15px] font-[400] text-[#16151a]">{m?.content}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        ) : (
                        <>
                            <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-white">
                                <img alt="charimage" src={character?.image} className="rounded-full"/>
                            </div>

                            <div>
                                <div className="rounded-r-lg rounded-bl-lg p-3">
                                    <div className="text-[15px] font-[650]">
                                        {character?.name}
                                        {/* <span className="h-4 w-14 rounded-sm bg-white p-[1px] text-[12px] font-[600] italic">
                                        @{character?.creator}
                                        </span> */}
                                    </div>

                                    <div className="bg-white bg-opacity-100 rounded p-2">
                                        <p className="text-[15px] font-[400] text-[#16151a]">{m?.content}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        )}
                    </div>
                    ))}

                    {messages.map((m) => (
                    <div key={m.id} className="mt-2 flex w-full">
                        {m.role === "user" ? (
                        <div>
                            <div className="mt-3  flex gap-3 mb-2 ">
                                <div className="h-10 w-10 rounded-full bg-gray-300">
                                    {user && (
                                        <img
                                        alt="charimage"
                                        src={session.user.image || ""}
                                        className="rounded-full h-10 w-10"
                                        />
                                    )}
                                </div>

                                <div className="text-[15px] font-[650]">
                                    {user ? session.user.name : "Guest"}
                                </div>
                            </div>

                            <div>

                                <div className="rounded-r-lg rounded-bl-lg  p-3">                             
                                    <div className="bg-white bg-opacity-50 rounded p-2">
                                        <p className="text-[15px] font-[400] text-[#16151a]">{m?.content}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        ) : (
                        <div>
                            <div className="flex gap-3 mb-2">
                                <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-white">
                                    <img alt="charimage" src={character?.image} className="rounded-full" />
                                </div>

                                <div className="text-[15px] mt-6 font-[650]">
                                    {character?.name}
                                    {/* <span className="h-4 w-14 rounded-sm bg-white p-[1px] text-[12px] font-[600] italic">
                                    @{character?.creator}
                                    </span> */}
                                </div>
                            </div>

                            <div>
                                <div className="rounded-r-lg rounded-bl-lg  p-3">
                                
                                    <div className="bg-white bg-opacity-100 rounded p-2">
                                        <p className="text-[15px] font-[400] text-[#16151a]">{m?.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    ))}
                    
                    {imageanalysis === '' ? (
                        null
                        ) : (
                        <div>
                            <div className="flex gap-3 mb-2">
                                <div className="mt-3 h-10 w-10 flex-shrink-0 bg-white bg-opacity-50 rounded">
                                    <img alt="charimage" src={character?.image} className="rounded-full" />
                                </div>

                                <div className="text-[15px] mt-6 font-[650]">
                                    {character?.name}
                                </div>
                            </div>

                            <div>
                                <div className="rounded-r-lg rounded-bl-lg p-3">                                
                                    <div className="bg-opacity-100 rounded p-2">
                                        <p className="bg-white inline-block p-2 text-[15px] text-[#16151a] font-[400]">{imageanalysis}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                
                    
                </div>                


                <div className="-ml-10">
                    {loader ?
                    <ContentLoader 
                        speed={2}
                        width={800}
                        height={260}
                        viewBox="0 0 400 160"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        {...props}
                    >                   
                        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
                        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
                        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />                    
                    </ContentLoader>
                    :null}
                </div>

                <div className='flex flex-col items-start mt-10 justify-start float-left text-left gap-5'>
                {answers &&
                    answers?.map((answer, index) => (
                        <div className="">
                            <button key={index}
                            className='flex justify-between text-[#16151a] gap-5 border-3 p-2 bg-gray-50 rounded mx-6 hover:bg-gray-100'
                            onClick={() => handleAnswerClick(answer)}
                            >
                                {answer !== '?' ? answer: null}
                                {/* That is the job */}
                                <AiFillRightCircle className="text-yellow-600 mt-1"/>   
                            </button> 
                        </div>
                     ))}
                </div>
                

                {/* <div className="">
                    {isView?
                    <div className="absolute right-0 bottom-0 m-5 p-1 px-3 bg-black bg-opacity-25 rounded text-white font-extrabold">
                        <div className="flex gap-2">
                            <p className="" onClick={() => handleAnswerClick(text)}>
                            set a reminder 
                            </p>

                            <MdCancel onClick={()=>setView(false)} className="text-yellow-300 cursor-pointer"/>
                        </div>
                    </div> :null}
                    <div className="fixed right-0 bottom-0 m-1 p-1 px-3 bg-black bg-opacity-25 rounded text-white font-extrabold">
                        <GoBellFill onClick={()=>setView(!isView)} className="text-yellow-300 cursor-pointer"/>
                    </div> 
                </div> */}
            </div>

            {statusMessage && <p className="status-message w-full">{statusMessage}</p>}
                {uploadProgress > 0 && (
                    <progress value={uploadProgress} max="100"></progress>
                )}
                {/* <button onClick={handleSubmitImage} className="analyze-button">
                        Analyze Image
                    </button> */}
                {result && (
                    <div className="result my-5 mx-5">
                        <strong>Prescription Analysis:</strong>                    
                        <p className="bg-gray-100 rounded-sm p-2">{result}</p>
                    </div>
            )}  

          
            <form onSubmit={handleSubmit}>
                <div className="flex h-14 shadow-2xl overflow-hidden rounded border-[1px] bg-gradient-to-tl from-bg-[#16151a] via-bg-[#16151a] to-bg-[#16151a] px-[3px]">
                    <div className="flex h-full items-center justify-center">
                        <AiOutlinePlusCircle size={"30px"} />
                    </div>

                    <input
                        value={recording ? transcript.text : input}
                        className="text-black flex h-10 md:w-full sm:w-full md:mx-20 sm:mx-20 lg:mx-20 xl:mx-20 2xl:mx-20 rounded-full px-10 my-2 items-center bg-white shadow-6xl text-sm outline-none"
                        type="text"
                        placeholder="Type your message…"
                        onChange={handleInputChange}
                        onKeyDown={(e) => handler(e)}
                    />

                    <div>
                        <label htmlFor="fileInput">
                            <IoDocumentAttachSharp
                            size={25}
                            className="mt-3 mr-4 cursor-pointer"
                            onClick={(event)=>handleAttachIconClick}
                            />
                        </label>
                        <input
                            id="fileInput"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: "none" }}
                        /> 
                    </div>

                    <div className="flex h-full items-center justify-center gap-6">
                        {isLoading && (
                            <div role="status">
                            <svg
                                aria-hidden="true"
                                className="mr-2 h-8 w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                                />
                                <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        {/* <MdSend
                            onClick={handlerSendIcon}
                            className="mx-3 fill-black hover:fill-gray-700"
                            size={"25px"}

                        /> */}
                        {isRecording ? (
                            <BsMicFill
                            onClick={() => {
                                setIsRecording(false);
                                stopRecording();
                            }}
                            size={"20px"}
                            className="mr-6 cursor-pointer fill-black"
                            />
                        ) : (
                            <BsMicMuteFill
                            onClick={() => {
                                setIsRecording(true);
                                startRecording();
                            }}
                            size={"20px"}
                            className="mr-6 cursor-pointer fill-rose-500"
                            />
                        )}
                    </div>
                </div>
            </form>
        </div>
    </div>

    <Toaster />
    </>
  );
};

export default Chat;

export async function getServerSideProps(context: any) {
  const currentCharacter = context.params.character;
  const prisma = new PrismaClient();
  const data = await prisma.character.findFirst({
    where: {
      name: currentCharacter,
    },
  });

  return {
    props: {
      character: JSON.parse(JSON.stringify(data)),
    },
  };
}

