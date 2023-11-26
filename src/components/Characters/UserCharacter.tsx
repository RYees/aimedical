/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import React, {useState} from "react";
import { AiFillHeart , AiOutlineHeart, AiTwotoneDelete } from "react-icons/ai";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import axios from "axios";

function UserCharacter(props: {
  id:| number;
  name:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  image: string | undefined;
  behavior:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  description:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  creator:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  count:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  const router = useRouter();
  //const [show, setShow] = useState(false);

  function onCharacterClickHandler() {
    router.push(`/char/${props.name}`);
  }

  
  const unfavouriteAI = async (id:any) => {
    //e.preventDefault(); 
   // console.log("wedding", id);
    try {
      const res = await axios.delete(`/api/deleteusercompanions/${id}`)
      console.log('success deletion', res.data);
      router.reload();
    } catch(error){
      console.log("error", error);
    }
  }

  return (
    <div      
    className="relative flex"
    >   
    <div className="flex flex-col py-5 w-2 gap-24">
        <div      
          className="h-86 w-[58rem] bg-white shadow-xl border border-96 rounded-lg"
        >
              <div className="flex gap-44 overflow-hidden">
                <div onClick={()=>onCharacterClickHandler} className="cursor-pointer hover:bg-pink-700">
                  <div className="m-2 flex justify-center overflow-hidden">
                    <img
                      className="mt-3 rounded-[14px] "
                      width="308px"
                      height="508px"
                      src={props.image}
                    />
                  </div>
                </div>

                <div className="my-2 border px-10 shadow-2xl border-opacity-0.1 rounded"> 
                  <p className="flex justify-end my-4">
                    <AiTwotoneDelete 
                    size={25} 
                    className="text-red-600 cursor-pointer"
                    onClick={() => {unfavouriteAI(props.id)}}
                    />
                  </p>
                  <div className="flex justify-center text-3xl text-pink-400 font-bold">
                    <p>{props.name}</p>
                  </div>
                  <div className="mt-[4px] px-2 text-center text-xl text-pink-400 font-[400]">
                    <p>{props.description}</p>
                  </div>
                
                <div className="bottom-1 mt-14 flex w-full  items-end justify-between px-1 text-[12px]">
                  <p className="italic text-pink-400">@{props.creator}</p>
                  <p className="cursor-pointer">
                    <AiFillHeart 
                    className="text-pink-600" 
                    size={25}                   
                    />
                  </p>
                  <p className="text-pink-400">
                    {props.count}m
                  </p>
                </div>
                
              </div>

              {/* <div>
                <p><AiTwotoneDelete/></p>
              </div> */}

              </div>
        </div>


        {/* <div      
          className="h-86 w-[60rem] bg-black shadow-xl border border-96 rounded-lg"
        >
          <div className="flex gap-44 overflow-hidden">
            <div onClick={onCharacterClickHandler} className="cursor-pointer hover:bg-pink-700">
              <div className="m-2 flex justify-center overflow-hidden">
                <img
                  className="mt-3 rounded-[14px] "
                  width="308px"
                  height="508px"
                  src={props.image}
                />
              </div>
            </div>

            <div className="my-2 border py-20 px-10 shadow-2xl border-opacity-0.1 rounded"> 
              <div className="flex justify-center text-3xl text-pink-400 font-bold">
                <p>{props.name}</p>
              </div>
              <div className="mt-[4px] px-2 text-center text-xl text-pink-400 font-[400]">
                <p>{props.description}</p>
              </div>
            
            <div className="bottom-1 mt-14 flex w-full  items-end justify-between px-1 text-[12px]">
              <p className="italic text-pink-400">@{props.creator}</p>
              <p className="cursor-pointer">
                {!show ? <AiOutlineHeart 
                          size={25}
                          onClick={()=>{setShow(!false)}}
                          /> :
                <AiFillHeart 
                className="text-pink-600" 
                size={25}
                onClick={()=>{setShow(!true)}}
                />}
              </p>
              <p className="text-pink-400">{props.count}m</p>
            </div>
          </div>

          </div>
        </div> */}



    </div>
  </div>
  );
}

export default UserCharacter;
