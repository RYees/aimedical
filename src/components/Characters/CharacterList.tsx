/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import React, {useState} from "react";
import { AiFillHeart , AiOutlineHeart } from "react-icons/ai";
import { BsFillHandThumbsUpFill} from "react-icons/bs";
import Loader from "../Loader";
import axios from "axios";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination, Scrollbar, EffectFade, EffectFlip } from "swiper";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";


function CharacterList(props: { character:any
  // id: number,
  // name:
  //   | string
  //   | number
  //   | boolean
  //   | ReactElement<any, string | JSXElementConstructor<any>>
  //   | Iterable<ReactNode>
  //   | ReactPortal
  //   | PromiseLikeOfReactNode
  //   | null
  //   | undefined;
  // image: string | undefined;
  // description:
  //   | string
  //   | number
  //   | boolean
  //   | ReactElement<any, string | JSXElementConstructor<any>>
  //   | Iterable<ReactNode>
  //   | ReactPortal
  //   | PromiseLikeOfReactNode
  //   | null
  //   | undefined;
  // creator:
  //   | string
  //   | number
  //   | boolean
  //   | ReactElement<any, string | JSXElementConstructor<any>>
  //   | Iterable<ReactNode>
  //   | ReactPortal
  //   | PromiseLikeOfReactNode
  //   | null
  //   | undefined;
  // count:
  //   | string
  //   | number
  //   | boolean
  //   | ReactElement<any, string | JSXElementConstructor<any>>
  //   | Iterable<ReactNode>
  //   | ReactPortal
  //   | PromiseLikeOfReactNode
  //   | null
  //   | undefined;
}) {
  const router = useRouter();
  const characters = props.character;
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setMessage] = useState('');
  function onCharacterClickHandler(name:any) {
    router.push(`/${name}`);
  }
  const [form, setForm] = useState({
    userId:'0907474a-8430-492f-8856-477fc2ace172', 
    characterId:'1'
    });
  console.log("listprops", props)

  const favouriteAI = async (characterId:any) => {
    console.log("hart", characterId);
    try {
      setIsLoading(true);
      const res = await axios.post('/api/usercompanions',
      {
          userId: form.userId,
          characterId: parseInt(characterId)
      }
    )
    //console.log("borobora",res);
    setIsLoading(false);
    //console.log('success', res.data);
    } catch(error){
        setIsLoading(false);
          setMessage('Already liked or connection problem!');
          gorg();
          
        console.log("error", error);
    }
  }

  function gorg() {
    setTimeout(() => {
      setMessage('');
    }, 5000);    
  }


  return (
    <div      
      className="bg-black w-[90rem] py-10 px-10"
    >
     
      {/* {isLoading && <Loader />} */}
      <Swiper
          modules={[Navigation, A11y, Pagination, Scrollbar, Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{clickable: true}}
          scrollbar={{draggable: true}}
          navigation
          autoplay={false}
          //effect="flip"
          >
      {/* {isLoading && <Loader />} */}
      {characters?.map((character:any, index:any) => (
        <SwiperSlide>

      <div className="w-96 mb-10 mx-2 overflow-hidden rounded-lg bg-[#2b2c2d] text-[#e5e0d8d9] hover:bg-[#393b3b]">
        <div onClick={() => onCharacterClickHandler(character.name)} className="cursor-pointer hover:bg-black">
          <div className="m-2 flex justify-center overflow-hidden">
            <img
              className="mt-3 rounded-[14px] "
              width="308px"
              height="108px"
              src={character.image}
            />
          </div>
          
          <div className="flex justify-center text-[14px] font-bold">
            <p>{character.name}</p>
          </div>
          <div className="mt-[4px] px-2 text-center text-[12px] font-[400]">
            <p>{character.description}</p>            
          </div>

        </div>
        {/* <div className="w-full flex justify-between px-1 text-[12px]">
          <p className="italic text-[#e5e0d880]">@{character.creator}</p>
          
          
          <p className="cursor-pointer">
           <BsFillHandThumbsUpFill 
              size={25}
              onClick={() => {favouriteAI(props.id)}}
           />          
          </p>
          <p>{character.count}m</p>
        </div> */}
        
        {/* <div>
          <p className="text-sm text-red-500 mx-3 my-1">
            {isMessage}
          </p>
        </div> */}
      </div>
   
      </SwiperSlide>
      ))}
   </Swiper>

      
    </div>
  );
}

export default CharacterList;
