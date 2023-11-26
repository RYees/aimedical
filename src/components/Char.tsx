import React from 'react'
import UserCharacter from "./Characters/UserCharacter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Chars from './Chars';

const Char = (props: { chardata: any }) => {
    const CHAR_LIST = props.chardata;
    //console.log("doctor", props.chardata);
  return (
    <div>
        <div className="">
            {CHAR_LIST.map((item:any) => (
                    <Chars chadata={item.character}/>
            ))
            }
        </div> 
    </div>
  )
}

export default Char