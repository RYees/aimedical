import React from 'react'
import UserCharacter from "./Characters/UserCharacter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Chars = (props: { chadata: any }) => {
    const CHAR = props.chadata;

  return (
    <div>
    <div className="">
        <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={10}
            slidesPerView={7}
            navigation
            >
                <SwiperSlide key={CHAR.id}>
                <UserCharacter
                    id = {CHAR.id}
                    behavior={CHAR.behavior}
                    name={CHAR.name}
                    description={CHAR.description}
                    image={CHAR.image}
                    creator={CHAR.creator}
                    count={CHAR.count}
                />
                </SwiperSlide>
            </Swiper>
        </div> 
    </div>
  )
}

export default Chars