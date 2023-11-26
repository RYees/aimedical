import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Key } from "react";
import UserCharacter from "../components/Characters/UserCharacter";
import Char from "../components/Char";
import Loader from "../components/Loader";


const AI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
  userId:'9488e8dc-9756-465b-8345-0cf06a9d2400', 
  characterId:'1'
  });

  const [data, setData] = useState([]);

  const favouriteAI = async (e:any) => {
    e.preventDefault(); 
    
    try {
    const res = await axios.post('/api/usercompanions',
    {
        userId: form.userId,
        characterId: parseInt(form.characterId)
    }
    )
    //setIsLoading(true);
    console.log('success', res.data);
    } catch(error){
        console.log("error", error);
    }
  }

const fetchUser = async () => {
  //e.preventDefault(); 
  try {
      setIsLoading(true);
      const res = await axios.get('/api/fetchuser/1')
      setData(res.data.characters);
      console.log('success', res.data);
      setIsLoading(false);
  } catch(error){
      console.log("error", error);
  }
}

useEffect(() => {
  fetchUser();
},[]);
  return (
    <>
    <h1 onClick={()=>favouriteAI} className='mx-5 cursor-pointer my-4 text-2xl italic'>
      My AI Companions
    </h1>
    
    <div>
      {isLoading && <Loader />}
      <div className="ml-[7rem]">      
          <Char chardata={data}/>
      </div> 
    </div>
    </>
  )
}

export default AI