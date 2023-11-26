/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
//@ts-nocheck
import React, {useEffect, useState} from "react";
import Category from "./Catergory";
import CharacterList from "./CharacterList";
import Favourite from "./Favourite";
import "swiper/swiper-bundle.min.css";
import { EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination, Scrollbar } from "swiper";
import { Key } from "react";
import Image from "next/image";
import black from '../../../public/black.jpg';

function Characters(props: { character: any }) {
  const CHARACTER_LIST = props.character;
  const CHARACTER_STATUS = props.favourite;
  console.log("familey", CHARACTER_LIST);
 
  return (
    <>
    <div className="flex flex-col">
        <div 
        className="relative mt-4 z-10 h-16 bg-[rgba(0,0,0,0.7)] flex w-full flex-col justify-center border-b-[2px] border-[#606465] pb-7 pt-2"
        >
          <Image src={black} alt='loader' className='object-cover -z-10 absolute rounded h-20'/>
          <Category />               
        
        </div>

        <div className="bg-red-400">
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
                effect="fade"
                >
          
                    <SwiperSlide>
                      <CharacterList
                        character={CHARACTER_LIST}
                      />                  
                 </SwiperSlide>  
              </Swiper> 
          </div>
       

        {/* <div className="flex flex-row ml-40 py-5 w-2 gap-40">
              {CHARACTER_STATUS.map(
                (favourite: {
                  id: Key | null | undefined;
                  status: any;
                  characterId: any;
                }) => {
                  return (
                    <SwiperSlide key={favourite.id}>
                      <Favourite 
                      id={favourite.id}
                      status={favourite.status}
                      characterId={favourite.characterId}/>
                    </SwiperSlide>
                  )                 
              })}
        </div>  */}
    </div>
  </>
  );
}
export default Characters;
