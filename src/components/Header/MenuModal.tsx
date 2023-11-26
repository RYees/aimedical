//@ts-nocheck
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { CgMediaLive } from "react-icons/cg"
import Link from "next/link";
//import { signOut } from "next-auth/react";

interface MenuModalProps {
  character: any; // Replace 'any' with the actual type of 'character'
  plan: any; // Replace 'any' with the actual type of 'plan'
}

export default function MenuModal() {
  // console.log(character, plan)
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []); // Run the effect only once on component mount

  const signOutFromGoogle = () => {
    signOut("google", {
      callbackUrl: window.location.href,
    });
   // router.push("/");
  };

  

  const LiveMode = () => {
    router.push("/livemode");
  };

  return (
    <div className="fixed z-10 w-56">
      <Menu as="div" className="relative z-10 inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-100 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {user?.image !== null ? (
              <img
                src={user?.image}
                alt={user?.name || "Avatar"}
                className=" h-10 w-10 rounded-full"
                about="1"
              />
            ) : null}
            {/* <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
          </Menu.Button>
        </div>
        <Transition
          //as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-gradient-to-bl from-white via-white to-yellow-200">
    
              <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/livemode">
                      <button
                      // onClick={() => LiveMode()}
                        className={`${
                          active
                            ? "bg-black bg-opacity-30 text-black"
                            : "text-gray-800"
                        } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm`}
                      >  
                        <CgMediaLive size={20} className="ml-1"/>                  
                        Set live mode
                        
                      </button>
                      </Link>
                    )}
                  </Menu.Item>
                    
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOutFromGoogle()}
                        className={`${
                          active
                            ? "bg-black bg-opacity-30 text-black"
                            : "text-gray-800"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-2 h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        Logout
                      </button>
                    )}
                  </Menu.Item>             
              </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

