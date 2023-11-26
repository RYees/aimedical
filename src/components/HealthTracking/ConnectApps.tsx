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

const ConnectApps = (props:any) => {
    const router = useRouter();
    const hdata = props.hdata;
    const [trend, showTrend] = useState(false);
    const [food, showFood] = useState(false);
    const [apps, showApp] = useState(false);
    const [codeChallenge, setcodeChallenge] = useState('')
    const [codeVerifier, setcodeVerifier] = useState('');
   
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
        <div className='relative bg-[#262a2d]'>
            <div className='flex flex-row gap-5'>                            
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-1 text-[#f4f4f5] bg-[#16151a] py-1 px-6 rounded cursor-pointer hover:brightness-110'                     
                    // onClick={() => showTrend(!trend)}
                    >
                        <FaArrowTrendUp className='mt-[5px] text-[#f4f4f5]'/>
                        <a href="/nutritionreport">Health Report</a> 
                    </div>

                    {/* {trend?
                    <div className='bg-white'>
                        <ul className=''>
                            <li className='hover:bg-gray-50 text-gray-500 p-1 cursor-pointer'>                                    
                                <a href="/nutritionreport">Health Report</a>
                            </li>
                        </ul>
                    </div>:null
                    }  */}
                </div>                    

                <div>
                    <div className='flex gap-1 font-abc text-[#f4f4f5] py-1 px-6 rounded cursor-pointer hover:brightness-110 bg-[#16151a]' onClick={() => showApp(!apps)}>
                        <AiFillAppstore className='mt-[5px] text-[#f4f4f5]'/>  
                        <p>Apps</p>
                    </div>

                    {apps?
                    <div className='bg-[#16151a] mt-1 rounded absolute px-3 py-3'>
                        <ul className=''>
                            <li className='font-abc text-[14px] font-[400] text-white p-1 hover:bg-[#262a2d] hover:bg-opacity-20 cursor-pointer' onClick={fitbit}>
                                Fitbit</li>
                            <li className='font-abc text-[14px] font-[400] text-white p-1 hover:bg-[#262a2d] hover:bg-opacity-20 cursor-pointer' onClick={withingsApiHandle}>
                                WithingsApi</li>
                            <li 
                            className='font-abc text-[14px] font-[400] text-white p-1 hover:bg-[#262a2d] hover:bg-opacity-20 cursor-pointer' onClick={googlefitHandle}>
                                GoogleFit
                            </li>                                
                        </ul>
                    </div>:null
                    }   
                </div>
            </div>   
         </div>
    </div>
  )
}

export default ConnectApps