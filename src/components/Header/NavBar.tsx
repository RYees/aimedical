/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { BsSearch } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import querystring from 'querystring';
import { FcGoogle } from "react-icons/fc";
import MenuModal from "./MenuModal";

function NavBar(props) {
  const router = useRouter();
  const [code, setCode] = useState();
  const { data: session, status } = useSession();
  const user = session?.user;

  const signOutFromGoogle = () => {
    signOut("google", {
      callbackUrl: window.location.href,
    });    
  };

  async function tg(){
    const usr = await fetch('/api/telegram', {
      method: 'POST',
      body: JSON.stringify({chatId: 504910259}) 
    })
    console.log("bab", usr);
  }

  async function tele() {
    const read = await fetch('/api/startBot');
    console.log("notoexpressyour");
  }

  useEffect(()=>{
    //tele()
  },[])

  return (
    <>
      <nav className="border-b-[1px] bg-[#16151a] text-white shadow-xl">
        <div className="px-2 sm:px-6 lg:px-8">
          <div className="relative  h-16 md:flex md:items-center md:justify-between sm:flex sm:items-center sm:justify-between flex">
           

            <div className="">
              <div className="flex flex-shrink-0 items-center">
                <h1 className=" text-[40px] font-bold">
                  <Link href="/">miaamor AI</Link>
                </h1>
              </div>
            </div>

             <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 text-[0.7rem] sm:ml-6 sm:pr-0">
            {/*  <button
                type="button"
                className=" rounded-sm  bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <BsSearch size={"25px"} />
              </button>
              <button
                type="button"
                className=" rounded-sm  bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={()=>tg}
              >
                <MdMenuBook size={"25px"} />
              </button>
              <button
                type="button"
                className=" rounded-sm  bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <FaRegQuestionCircle size={"25px"} /> 
              </button>
              <button onClick={withthingsCode}>codeTotoken</button><br />
              <button onClick={getUserHeartRate}>sleep</button><br />
              <select name="cars" id="cars" className="bg-transparent">
                <option className="bg-[#242525] " value="english">
                  English
                </option>
                <option className="bg-[#242525] " value="espanol">
                  Espanol
                </option>
                <option className="bg-[#242525] " value="french">
                  French
                </option>
                <option className="bg-[#242525]  " value="italiano">
                  Italinao
                </option>
              </select>*/}
                    
              {/* <div>
                {user ? (
                  <p
                    className="transform cursor-pointer underline"
                    //onClick={upd}
                    onClick={() => signOutFromGoogle()}
                  >
                    logout
                  </p>
                ) : null}
              </div> */}

              {user?.image ? (
                <div className="-mt-14 mr-20">
                  {/* <img
                    src={user?.image}
                    alt={user?.name || "Avatar"}
                    layout="fill"
                    className=" h-10 w-10 rounded-full"
                   about="1"
                  /> */}
                  <MenuModal />
                </div>
              ) : (
                <>
                    <button
                      onClick={props.openModal}
                      className="my-16 ml-36 flex h-[46px] justify-center space-x-2 rounded-md border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-gray-100 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                    >
                      <FcGoogle className="-mt-1" size={40}/>
                      <span className="text-sm mt-1 hidden  lg:block md:block xl:block 2xl:block">Login with Google</span>
                    </button>              
                </>
              )}

              {/* {user?.image ? (
                <div className=" ">
                  <img
                    src={user?.image}
                    alt={user?.name || "Avatar"}
                    layout="fill"
                    className=" h-10 w-10 rounded-full"
                  />
                </div>
              ) : (
                <> */}
                  {/* <button
                    type="button"
                    className=" rounded-sm  bg-black text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-800"
                    onClick={props.openModal}
                  >
                    Log In
                  </button> */}
                  {/* <button
                      onClick={props.openModal}
                      className="my-16 ml-36 flex h-[46px] justify-center space-x-2 rounded-md border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-gray-100 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                    >
                      <FcGoogle className="-mt-1" size={40}/>
                      <span className="text-sm mt-1">Login with Google</span>
                    </button>    
               </>
              )} */}
            </div>

          </div>
        </div>

        {/* <div className="sm:hidden" id="mobile-menu"></div> */}
      </nav>
    </>
  );
}

export default NavBar;
