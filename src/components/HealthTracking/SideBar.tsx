import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { BiNote } from 'react-icons/bi';
import { AiFillAppstore } from 'react-icons/ai';
import oldwomen from "../../../public/oldwomen.png";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const SideBar = (props:any) => {
    const router = useRouter();
    const hdata = props.hdata;
    const [trend, showTrend] = useState(false);
    const [food, showFood] = useState(false);
    const [apps, showApp] = useState(false);
    const [codeChallenge, setcodeChallenge] = useState('')
    const [codeVerifier, setcodeVerifier] = useState('');

    const [waterData, setWater] = useState({
        labels: ['Water intake'],
        datasets: [
          {
            data: [60, 50], 
            backgroundColor: ['#9c9c05d9', '#f4f4b6d9']
          }
        ]
      });
    
        const result = async() => {
            const resp = await axios.post('/api/generator');
            //console.log("pizzabulber", resp.data);
            setcodeChallenge(resp.data.codeChallenge)
            setcodeVerifier(resp.data.codeVerifier)
        }
        useEffect(() => {
            result();
        },[])

        const fitbit = () =>{
            router.push(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RD4H&scope=activity%20heartrate%20location%20nutrition%20oxygen_saturation%20profile
            %20respiratory_rate%20settings%20sleep%20social%20temperature%20weight&redirect_uri=http://localhost:3000/callback&code_challenge_method=S256&code_challenge=${encodeURIComponent(
            codeChallenge
            )}&code_verifier=${encodeURIComponent(
            codeVerifier
            )}`)
        }
      
      
        const googlefitHandle = () => {
          const clientId = '676873617009-ns422uisclvimmomaqj7ainq9uhvj0ja.apps.googleusercontent.com';
          const clientSecret = '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';
          const redirectUri = 'http://example.com/redirect'; // Your desired redirect URI
          const scopes = ['https://www.googleapis.com/auth/fitness.activity.read'];    
          router.push(
              // ?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(' ')}`,
          {
            pathname: `https://accounts.google.com/o/oauth2/v2/auth`,      
            query: {
              client_id: clientId,
              // client_secret: clientSecret,
              redirect_uri: 'http://localhost:3000/callback',
              response_type: 'code',
              scope: `${scopes.join(' ')}`,
            }
          }
          );
        }
      
        const withingsApiHandle = () => {
          const clientId = '6f57a2f6ca8a038b04e2acfe0187b9587dc0e645773ec566f88881a86d0b074b';
          const clientSecret = '47f5b422af1aedc921fe3a1953269bd35bbaa4d02b626f365042ab063b253cb4';
          const redirectUri = 'http://localhost:3000/callback'; 
          const state = "activate"
          router.push(
            // `https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${clientId}&scope=user.info,user.metrics,user.activity&redirect_uri=${redirectUri}&state=${state}`
            `https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${clientId}&scope=user.info,user.metrics,user.activity&redirect_uri=${redirectUri}&state=${state}`
          );
        }
    
  return (
    <div>
        <div className='relative bg-gray-100 p-4 h-screen shadow-xl w-[30rem] md:w-72'>
                    <div className='flex justify-center'>
                        <div className=''>
                            <h1 className='text-center mb-2 font-bold'>{(hdata as any)?.name}</h1>
                            {/* <Image src={oldwomen} alt="profile"
                            className='rounded-full' 
                            width={70} height={70} 
                            /> */}
                            {/* <p className='text-gray-400 text-sm my-3'>@helen_ff</p> */}
                        </div>          
                    </div> 

                    <div className='absolute h-20 w-full bg-gray-50 mb-20 rounded-xl -ml-4 shadow-sm'>

                    </div>

                    <div className='mr-3 rounded-full mt-8'>
                    {/* <Calendar onChange={onChange} value={value} /> */}
                    <h1 className='text-sm text-gray-500 transform capitalize text-center mb-8'>
                        connect with your choice of provdier to track your health</h1>
                      
                      <div className='flex flex-col justify-center text-center gap-3 mx-3'>
                        {/* <div className='flex justify-between bg-white p-1 cursor-pointer rounded-lg'>
                          <div className='flex px-4 '>
                            <BiNote className='mt-[5px] text-yellow-900' />
                            <a href="/dairy">Dairy</a>
                          </div>
                          <div>
                            <IoMdArrowDropdown className='mt-1' size={20}/>
                          </div>
                        </div> */}

                          <div 
                          onClick={() => showTrend(!trend)}
                          className='flex justify-between cursor-pointer bg-white p-1 rounded-lg'>
                            <div className='flex gap-1 px-4'>
                              <FaArrowTrendUp className='mt-[5px] text-yellow-900'/>Report</div>
                              <div>
                                <IoMdArrowDropdown className='mt-1' size={20}/>
                              </div>
                          </div>
                          {trend?
                          <div className='bg-white -mt-3'>
                            <ul className=''>
                                {/* <li className='hover:bg-gray-50 text-gray-500 p-1 cursor-pointer'>                                   
                                    <a href="/charts">Charts</a>
                                </li> */}
                                <li className='hover:bg-gray-50 text-gray-500 p-1 cursor-pointer'>                                    
                                    <a href="/nutritionreport">Health Report</a>
                                </li>
                            </ul>
                          </div>:null
                          }

                        <div 
                          onClick={() => showApp(!apps)}
                          className='flex justify-between cursor-pointer bg-white p-1 rounded-lg'>
                            <div className='flex px-4 gap-1'>
                              <AiFillAppstore className='mt-[5px] text-yellow-900'/>
                              Connect Apps
                            </div>
                            <div>
                              <IoMdArrowDropdown className='mt-1' size={20}/>
                            </div>
                          </div>
                          {apps?
                          <div className='bg-white -mt-3'>
                            <ul className=''>
                                <li className='hover:bg-gray-50 text-gray-500 p-1 cursor-pointer' onClick={fitbit}>
                                    Fitbit</li>
                                <li className='hover:bg-gray-50 text-gray-500 p-1 cursor-pointer' onClick={withingsApiHandle}>
                                    WithingsApi</li>
                                <li 
                                className='hover:bg-gray-50 text-gray-500 p-1 cursor-pointer' onClick={googlefitHandle}>
                                    GoogleFit
                                </li>                                
                            </ul>
                          </div>:null
                          }

                          {/* <div 
                          onClick={() => showFood(!food)}
                          className='flex justify-between cursor-pointer bg-white p-1 rounded-lg'>
                            <div className='flex px-4'>
                              <IoFastFoodOutline className='mt-[5px] text-yellow-900'/>Foods</div>
                            <div>
                              <IoMdArrowDropdown className='mt-1' size={20}/>
                            </div>
                          </div>
                          {food?
                          <div className='bg-white -mt-3'>
                            <ul className=''>
                                <li className='hover:bg-gray-50 p-1 cursor-pointer'>
                                    Custom Meal</li>
                                <li className='hover:bg-gray-50 p-1 cursor-pointer'>
                                    Custom Receipe</li>
                            </ul>
                          </div>:null
                          } */}
                      </div>
                        
                    </div> 
              </div>
    </div>
  )
}

export default SideBar