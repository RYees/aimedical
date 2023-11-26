// pages/callback.js

import { useRouter } from 'next/router'
import axios from 'axios'
import crypto from 'crypto';
import base64url from 'base64url';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import { SHA256 } from 'crypto-js';
import btoa  from 'btoa';
import React,{useEffect, useState} from 'react';
import querystring from 'querystring';

const clientId = '23RD4H';
const clientSecret = 'b38fbe2c51ce5c0ea4525696af2b6909';

// Base64 encode the credentials
const credentials = `${clientId}:${clientSecret}`;
const encodedCredentials = Buffer.from(credentials).toString('base64');

export default function Callback() {
  const [accesstoken, setToken] = useState('');
  const [userid, setUserId] = useState('');
  const [token, setAccessToken] = useState()

  const router = useRouter()
  const codefetch = router.query;
  let {code, code_verifier} = codefetch;
  console.log("never", code, code_verifier)
  const verifier = 'c90294f99aa416334258d5d4429745dcdd87078aeeec42ed2c4e98347f8ba5cb'

  async function handleCallback() {
    try {
      const code = router.query.code 
          
      const tokenResponse = await axios({
        method: 'post',
        url: 'https://api.fitbit.com/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            '23RD4H:b38fbe2c51ce5c0ea4525696af2b6909'
          ).toString('base64')}`,
        },
        data: `client_id=${clientId}&code=${code}&code_verifier=${verifier}&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code`,
      })
      
        .then(response => {
          // Handle the response
          console.log(response.data);
          setToken(response.data.access_token);
          setUserId(response.data.user_id)
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

    } catch (error) {
      console.error('Error handling callback', error)
    }
  }
  const [goal, setGoal] = useState({});
  const userSleep = async () => {    
    try {
          
      const tokenResponse = await axios({
        method: 'post',
        url: `https://api.fitbit.com/1.2/user/${userid}/sleep/goal.json`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accesstoken}`,
        },
        data: `client_id=23RD4H&code=${code}&code_verifier=${verifier}&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code`,
      })
      
        .then(response => {
          // Handle the response
          console.log(response.data);
          setGoal(response?.data?.goal)
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

    } catch (error) {
      console.error('Error handling callback', error)
    }
  };

  const favouriteFood = async () => {    
    try {
          
      const tokenResponse = await axios({
        method: 'get',
        url: `https://api.fitbit.com/1/user/${userid}/foods/log/favorite.json`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accesstoken}`,
        },
        data: `client_id=23RD4H&code=${code}&code_verifier=${verifier}&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code`,
      })
      
        .then(response => {
          // Handle the response
          console.log(response.data);
          setGoal(response?.data?.goal)
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

    } catch (error) {
      console.error('Error handling callback', error)
    }
  };
  
  const ECGreading = async () => {    
    try {
          
      const tokenResponse = await axios({
        method: 'get',
        url: `https://api.fitbit.com/1/user/${userid}/ecg/list.json?afterDate=2022-09-28&sort=asc&limit=1&offset=0`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accesstoken}`,
        },
        data: `client_id=23RD4H&code=${code}&code_verifier=${verifier}&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code`,
      })
      
        .then(response => {
          // Handle the response
          console.log(response.data);
          setGoal(response?.data?.goal)
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

    } catch (error) {
      console.error('Error handling callback', error)
    }
  };

  const GetTemperature = async () => {    
    try {
          
      const tokenResponse = await axios({
        method: 'get',
        url: `https://api.fitbit.com/1/user/${userid}/temp/core/date/2021-10-04.json`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accesstoken}`,
        },
        data: `client_id=23RD4H&code=${code}&code_verifier=${verifier}&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code`,
      })
      
        .then(response => {
          // Handle the response
          console.log(response.data);
          setGoal(response?.data?.goal)
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

    } catch (error) {
      console.error('Error handling callback', error)
    }
  };
  
  const HEALTHKIT_AUTHORITY = 'healthkit'; 
  const healthHandle = () => {
    router.push({
      pathname: '/authorize',
      query: {
        client_id: process.env.HEALTHKIT_CLIENT_ID,
        redirect_uri: process.env.HEALTHKIT_REDIRECT_URI,
        response_type: 'code',
        scope: 'activity, fitness', 
        nonce: 'random_string',
        state: HEALTHKIT_AUTHORITY
        }
        });
    }


    // withings
    async function withthingsCode() {
    
      try {
        console.log("you see baby");
        const requestData = querystring.stringify({
          action: 'requesttoken',
          grant_type: 'authorization_code',
          client_id: '6f57a2f6ca8a038b04e2acfe0187b9587dc0e645773ec566f88881a86d0b074b',
          client_secret: '3e795c718b9016c8d0c038c24d6f454629b39ac232ded7cc387f4768d94f1692',   
          code: code,
          redirect_uri: 'http://localhost:3000/callback'
        });
        console.log("corner");
        const response = await axios.post('https://wbsapi.withings.net/v2/oauth2', requestData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
    
        console.log("chicago", response.data);
        console.log("chicago", response.data.body.access_token);
        setAccessToken(response.data.body.access_token)
        // Handle the response here
        
      } catch (error) {
        console.error("spoke", error);
        // Handle the error here
      }
    }
  
    
  async function getUserHeartRate() {
    const accessToken = token;
    const requestData = {
      action: 'getgoals'
    };
  
    try {
      const response = await axios.post('https://wbsapi.withings.net/v2/user', requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      console.log(response.data);   
      //res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      //res.status(500).json({ error: 'An error occurred' });
    }
  }

  async function getUserDevices() {
    const accessToken = token;
    const requestData = {
      action: 'getdevice'
    };
  
    try {
      const response = await axios.post('https://wbsapi.withings.net/v2/user', requestData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      console.log(response.data);   
      //res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      //res.status(500).json({ error: 'An error occurred' });
    }
  }

  const [codeChallenge, setcodeChallenge] = useState('')
  const [codeVerifier, setcodeVerifier] = useState('')

  const result = async() => {
    console.log("testing")
    const resp = await axios.post('/api/generator');
    console.log("generatedCodes:", resp.data);
    setcodeChallenge(resp.data.codeChallenge)
    setcodeVerifier(resp.data.codeVerifier)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      result();
    }, 5000);    
    return () => clearTimeout(timer);    
  },[])

  const fitbit = () =>{
    console.log("staywarm", codeVerifier)
    router.push(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RD4H&scope=activity%20heartrate%20location%20nutrition%20oxygen_saturation%20profile
    %20respiratory_rate%20settings%20sleep%20social%20temperature%20weight&redirect_uri=http://localhost:3000/callback&code_challenge_method=S256&code_challenge=${encodeURIComponent(
      codeChallenge
    )}&code_verifier=${encodeURIComponent(
      codeVerifier
    )}`)
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
      <div className='px-10'>
          <p className='my-5 text-center'>Authenticating with Fitbit...</p><br />
          <div className='flex flex-row justify-center text-center gap-4 mb-5 ml-5'>
                <button 
                onClick={fitbit}
                className='rounded-full shadow-sm hover:brightness-110 py-4 px-8 w-[10rem] bg-gradient-to-tl from-yellow-200 via-white to-yellow-100 border-4 border-gray-200 text-gray-600 font-sans transform lowercase text-lg'>
                    FitBit
                </button>

                {/* <button 
                onClick={googlefitHandle}
                className='rounded-full shadow-sm hover:brightness-110 py-4 px-8 w-[10rem] bg-gradient-to-tl from-yellow-200 via-white to-yellow-100 border-4 border-gray-200 text-gray-600 font-sans transform lowercase text-lg'>
                    GoogleFit
                </button> */}

                <button 
                onClick={withingsApiHandle}
                className='rounded-full shadow-sm hover:brightness-110 py-4 px-8 w-[10rem] bg-gradient-to-tl from-yellow-200 via-white to-yellow-100 border-4 border-gray-200 text-gray-600 font-sans transform lowercase text-lg'>
                    WithingsApi
                </button>
          </div>

          <div className='mb-10 bg-gray-100 p-2'>
            <h1 className='mb-5'>TESTING FITBIT</h1>
            <div className='flex'>
              <button className='bg-green-800 p-4 rounded-xl mx-4 text-white mb-5' onClick={handleCallback}>fitbitToken</button><br />
              <button className='bg-yellow-800 p-4 rounded-xl mx-4 text-white mb-5' onClick={userSleep}>fitbitUserSleep</button><br />
              <button className='bg-purple-500 p-4 rounded-xl mx-4 text-white mb-5' onClick={favouriteFood}>FavouriteFood</button><br />
              {/* <button className='bg-cyan-500 p-4 rounded-xl mx-4 text-white mb-5' onClick={ECGreading}>ECG Reading</button><br />
              <button className='bg-cyan-500 p-4 rounded-xl mx-4 text-white mb-5' onClick={GetTemperature}>Temperature</button><br /> */}
            </div>
          </div>

          <p className='bg-white mb-4'>
            {/* {goal} */}
          </p>

          <div className='bg-gray-100 p-2'>
            <h1 className='mb-5'>TESTING WITHTHINGS</h1>
            <button className='bg-yellow-500 p-4 rounded-xl mx-4 text-white mb-5' onClick={withthingsCode}>Access Token</button>
            <button className='bg-blue-800 p-4 rounded-xl mx-4 text-white mb-5' onClick={getUserHeartRate}>Heart Value</button>
            <button className='bg-green-400 p-4 rounded-xl mx-4 text-white mb-5' onClick={getUserDevices}>Get Devices</button>
          </div>

          <p className='bg-white mb-4'>
            {/* {goal} */}
          </p>
      </div>
  )
}