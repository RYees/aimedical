/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import Head from "next/head";
import { useState, Fragment, useEffect } from "react";
import { Menu } from "@headlessui/react";

import { useSession, getSession } from "next-auth/react";
import { MdSend } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { HiMoon, HiOutlineMoon } from "react-icons/hi"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsMicMuteFill, BsMicFill } from "react-icons/bs";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";

import { useRouter } from "next/router";
import { useWhisper } from "@chengsokdara/use-whisper";

// import axios from "axios";
export default function Chat(props) {
  const character = props.character;
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [context, setContext] = useState({});
  const [behavior, setbehavior] = useState(character?.behavior);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const user = session?.user?.email;
  const router = useRouter();
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

  const menus = [
    { behavior: "Shy" },
    { behavior: "Moderate" },
    { behavior: "Aggressive" },
    { behavior: "Confident" },
  ];

  function handleChatInput() {
    const input = inputText;
    const data = { sender: "user", text: input, userId: session?.user?.id };
    if (input !== "") {
      setContext(character.message);
      setChatHistory((history) => [...history, data]);
      chatWithOpenai(input);
      setInputText("");
      saveChat(data);
    }
  }

  async function chatWithOpenai(text: string) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: text,
        context: JSON.stringify(context),
        behavior: JSON.stringify(behavior),
      }),
    };

    // const apiUrl = `${protocol}//${domain}:8000/api/chat`;

    // const chat = {
    //   sender: "user",
    //   text: input,
    //   userId: session?.user?.id,
    //   characterId: character?.id,
    // };

    const apiUrl = "/api/chat";
    setIsLoading(true);
    const response = await fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.log(err));

  console.log("compromise", response);
  //   const data = {
  //     sender: "bot",
  //     text: response.answer.text,
  //     userId: session?.user?.id,
  //   };
  //   setChatHistory((history) => [...history, data]);
    // saveChat(data);
    // setIsLoading(false);
  }

  function saveChat(data: any) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    };
    fetch("/api/chat", requestOptions);
  }

  const handler = (event) => {
    if (event.keyCode === 13) {
      handleChatInput();
    }
  };

  const [gradientColor, setGradientColor] = useState('bg-gradient-to-br from-[#ffffffd9] via-yellow-50 to-[#ffffffd9]');
  const [isFirstGradient, setIsFirstGradient] = useState(true);

  const changeGradientColor = () => {
    if (isFirstGradient) {
      setGradientColor('bg-gradient-to-br from-white via-yellow-100 to-white');
    } else {
      setGradientColor('bg-gradient-to-br from-[#ffffffd9] via-yellow-50 to-[#ffffffd9]');
    }
    setIsFirstGradient(!isFirstGradient);
  };

  return (
    <>
      <Head>
        <title>{`Chat with ${character?.name}`}</title>

        {/*
        	Open graph meta tags.
    	*/}
      </Head>
      {/* <Header /> */}
      
      <div className="flex w-full sm:h-full md:h-full lg:h-full xl:h-full 2xl:h-full h-screen mt-12 -ml-2 sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0 flex-col items-center justify-center overflow-hidden pb-5 bg-gradient-to-r from-white via-yellow-100 to-white text-black rounded">
     
        <div className={`relative flex w-full max-w-6xl flex-grow cursor-pointer flex-col overflow-hidden shadow-5xl border-2 border-gray-100 m-2 rounded-xl ${gradientColor}`}>
          <div>
            {/* <IoIosArrowBack
              onClick={() => {
                router.push("/");
              }}
              size={"29px"}
              className="absolute left-1 top-7"
            /> */}
          </div>
          <div className="flex w-full justify-between border-b-[1px] border-yellow-600">
            <div className="flex h-full flex-col justify-center p-6">
              <div className=" text-[16px] font-[600]">
                {character?.name}
                <span className="mx-1 text-[12px] font-[400]">
                  {character?.count}m
                </span>
              </div>
              <div className="text-[13px] font-[400] italic text-gray-900">
                Created by
                <span className="text-[12px] font-[600]">
                  @{character?.creator}
                </span>
              </div>
            </div>
           
            <div className="relative mt-5 flex h-full items-center gap-2 p-6">              
              <FaShare />
              <Menu>
                <Menu.Button>
                  {" "}
                  <BiDotsVerticalRounded />
                </Menu.Button>
                {/* <Menu.Items>
                  <div className="absolute left-0 top-0 flex flex-col ">
                    <h1 className="font-bold">Customize</h1>
                    {menus.map((menu) => (
                      <Menu.Item key={menu.behavior} as={Fragment}>
                        {({ active }) => (
                          <button
                            onClick={() => setbehavior(menu.behavior)}
                            className={` p-[2px] text-sm ${
                              active
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                            }`}
                          >
                            {menu.behavior}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items> */}
              </Menu>
              <button className="" onClick={changeGradientColor}>
                {isFirstGradient?<HiOutlineMoon size={30}/>:
                <HiMoon size={30} className="text-yellow-400"/>}
              </button>
            </div>
          </div>
          
          <div className="flex h-0 max-w-[100%] flex-col flex-grow overflow-auto p-4">
            <div className="mt-2 flex w-full  ">
              <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
                {/* <Image alt="charimage"e src={character?.image} width={100} height={100} className="rounded-full" /> */}
                <img alt="charimage"e src={character?.image}  className="rounded-full" />
              </div>
              <div>
                <div className="rounded-r-lg rounded-bl-lg  p-3">
                  <div className="text-[15px  font-[650]">
                    {character?.name}
                    <span className="h-4 w-14 text-gray-900 rounded-sm p-[1px] text-[12px] font-[600] italic">
                      @{character?.creator}
                    </span>
                  </div>
                  <p className="text-[15px] font-[400]">{character?.message}</p>
                </div>
              </div>
            </div>
            {chatHistory.map((chat, index) => (
              <div key={index} className="mt-2 flex w-full  ">
                {chat.sender === "user" ? (
                  <>
                    <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-gray-300">
                      {user && (
                        // <Image
                        //   alt="charimage"
                        //   src={session.user.image}
                        //   width={100} height={100}
                        //   className="rounded-full"
                        // />
                        <img
                          alt="charimage"
                          src={session.user.image}
                          className="rounded-full"
                        />
                      )}
                    </div>
                    <div>
                      <div className="rounded-r-lg rounded-bl-lg  p-3">
                        <div className="text-[15px  font-[650]">
                          {user ? session.user.name : "Guest"}
                        </div>

                        <div className="bg-white bg-opacity-50 rounded p-2">
                          <p className="text-[15px] font-[400]">{chat?.text}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                      <div className="mt-3 h-10 w-10 flex-shrink-0 rounded-full bg-white">
                        {/* <Image alt="charimage" src={character?.image} width={100} height={100} className="rounded-full" /> */}

                        <img alt="charimage" src={character?.image} className="rounded-full" />

                      </div>
                      <div>
                        <div className="rounded-r-lg rounded-bl-lg  p-3">
                          <div className="text-[15px  font-[650]">
                            {character?.name}
                            <span className="h-4 w-14 rounded-sm bg-white p-[1px] text-[12px] font-[600] italic">
                              @{character?.creator}
                            </span>
                          </div>

                          <div className="bg-white bg-opacity-100 rounded p-2">
                            <p className="text-[15px] font-[400]">{chat?.text}</p>
                          </div>
                        </div>
                      </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex h-14 shadow-2xl overflow-hidden rounded border-[1px] bg-gradient-to-tl from-white via-yellow-200 to-white px-[3px]">
            <div className="flex h-full items-center justify-center">
              <AiOutlinePlusCircle size={"30px"} />
            </div>
            <input
              value={recording ? transcript.text : inputText}
              className="text-black flex h-10 md:w-full sm:w-full md:mx-20 sm:mx-20 lg:mx-20 xl:mx-20 2xl:mx-20 rounded-full px-10 my-2 items-center bg-white shadow-6xl  text-sm outline-none"
              type="text"
              placeholder="Type your message…"
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => handler(e)}
            />

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
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              <MdSend
                onClick={()=>handleChatInput}
                className="mx-3 fill-black hover:fill-gray-700"
                size={"25px"}
              />
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
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
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
