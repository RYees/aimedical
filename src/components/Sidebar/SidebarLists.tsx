/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import Link from "next/link";
import DynamicHomeIcon from "../helper/DyamicHomeIcon.js";
import { useRouter } from "next/router.js";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import logopng from "../../../public/logopng.png";
import Image from "next/image.js";


function SidebarList(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []); // Run the effect only once on component mount

  return (
    <>
    {props?.link === "" ?
    //   <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   version="1.1"
    //   viewBox="0 0 800 800"
    //   width="1.5em"
    //   height="1.5em"
    //   style={{ overflow: "visible" }}
    //   role="presentation"
    //   className="text-[60px] md:text-[85px] lg:text-[100px] xl:text-[116px]"
    // >
    //   <defs>
    //     <linearGradient
    //       x1="50%"
    //       y1="0%"
    //       x2="50%"
    //       y2="100%"
    //       id="lllove-grad"
    //     >
    //       <stop
    //         stop-color="hsl(37, 99%, 67%)"
    //         stop-opacity="1"
    //         offset="0%"
    //       ></stop>
    //       <stop
    //         stop-color="hsl(316, 73%, 52%)"
    //         stop-opacity="1"
    //         offset="100%"
    //       ></stop>
    //     </linearGradient>
    //   </defs>
    //   <g
    //     fill="url(#lllove-grad)"
    //     id="heart"
    //     transform="matrix(1,0,0,1,0,-10)"
    //   >
    //     <path
    //       d="M393.0055915459052 244.79858249050747C573.0503821739783 103.51608089633757 629.4041748046875 689.4615580952251 390.20977783203125 379.7203185608337 142.6237922081582 657.293665319056 205.97063579425935 104.91468362874917 393.0055915459052 244.79858249050747Z"
    //       stroke-linecap="round"
    //       stroke-linejoin="round"
    //     ></path>
    //   </g>
    // </svg>
        <Image
          src={logopng}
          alt="helper image"
          height={100}
          width={100}
          className="w-20 h-32 rounded-full -mt-8"
        />
    :
      
    <li className="">
      {/* {props?.link === ""?
          <button
         // href="/"
          onClick={() => signOutFromGoogle()}
          className="mt-2 flex w-16 flex-col justify-center rounded-lg p-2 bg-black sm:bg-transparent md:bg-transparent lg:bg-transparent xl:bg-transparent 2xl:bg-transparent bg-opacity-50"
        >
          <div className="flex w-14 justify-center text-gray-300">
            <DynamicHomeIcon type={props.icon} size={30}/>
          </div>
          <div className=" w-14 text-center text-[12px] font-[400] text-white">
            {props.title}
          </div>
        </button>
      : */}
      <a
        href={props.link}
        className="mt-2 flex flex-col lg:flex-row md:flex-row xl:flex-row 2xl:flex-row gap-3 mb-5 hover:bg-gray-900 hover:border-r-2 hover:border-white p-4 sm:bg-transparent md:bg-transparent lg:bg-transparent xl:bg-transparent 2xl:bg-transparent bg-black bg-opacity-50"
      >
        <div className="flex gap-3 text-gray-300 mx-auto sm:mx-0 lg:mx-0 md:mx-0 xl:mx-0 2xl:mx-0">
          <DynamicHomeIcon type={props.icon} size={30}/>
        </div>
        <div className="text-center text-[12px] font-[400] text-white">
          {props.title}
        </div>
      </a>
      {/* } */}
    </li>
    }
    </>
  );
}

export default SidebarList;
