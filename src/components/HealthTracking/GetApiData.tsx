import React, {useState, useEffect} from 'react'
import axios from 'axios'
import querystring from 'querystring';
import { useRouter } from 'next/router';

const GetApiData = (props:any) => {
    const router = useRouter();
    //const code = props.code;
    const [code, setCode] = useState('');
    const codeVerifier = props.codeVerifier;
    const codeChallenge = props.codeChallenge;
    const [token, setAccessToken] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codes = urlParams.get('code');
        if(codes !== null){
          setCode(codes);
        }

        withthingsCode();
    }, []);
  
      
    console.log("sara is dead", code, "verifier", codeVerifier, "challenge", codeChallenge);

    async function withthingsCode() {
      
      try {
        console.log("you see baby");
        const requestData = querystring.stringify({
          action: 'requesttoken',
          grant_type: 'authorization_code',
          client_id: '6f57a2f6ca8a038b04e2acfe0187b9587dc0e645773ec566f88881a86d0b074b',
          client_secret: '3e795c718b9016c8d0c038c24d6f454629b39ac232ded7cc387f4768d94f1692',   
          code: code,
          redirect_uri: 'http://localhost:3000/healthtrack'
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
  
    // useEffect(() => {
    //     withthingsCode();
    // },[])
    
  async function getUserHeartRate() {
    console.log("prison", token)
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

    // const resultWiththings = async() => {
    //     const resp = await axios.post('/api/generator');
    //     console.log("pizzabulber", resp.data);
    //     setcodeChallenge(resp.data.codeChallenge)
    //     setcodeVerifier(resp.data.codeVerifier)
    // }

    // useEffect(() => {
    //     resultWiththings();
    // },[])

    const userSleep = async () => {    
        try {
              
          const tokenResponse = await axios({
            method: 'post',
            url: 'https://api.fitbit.com/1.2/user/-/sleep/goal.json',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(
                '23RD4H:b38fbe2c51ce5c0ea4525696af2b6909'
              ).toString('base64')}`,
            },
            data: `client_id=23RD4H&code=${code}&code_verifier=${codeVerifier}&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code`,
          })
          
            .then(response => {
              // Handle the response
              console.log(response.data);
            })
            .catch(error => {
              // Handle the error
              console.error(error);
            });
    
        } catch (error) {
          console.error('Error handling callback', error)
        }
    };

  return (
    <>
    <div>GetApiData</div>
    <div>{code}</div>
    <div>token = {token}</div>
    <div>{codeChallenge}</div>
    <div>{codeVerifier}</div>
    </>
  )
}

export default GetApiData