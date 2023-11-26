import axios from "axios";
export default async function handler(req:any, res:any) {
    
    const {code, codeVerifier, codeChallenge} = req.body;
     
    if (typeof code === 'string') {
    const clientId = '23RD4S';
    const clientSecret = 'e9254a389409002adc65497743eb8bbb';
    const redirectUri = 'http://localhost:3000/callback';

    const tokenEndpoint = 'https://api.fitbit.com/oauth2/token';
    const requestBody = new URLSearchParams();
    requestBody.append('client_id', "23RD4H");
    requestBody.append('client_secret', 'b38fbe2c51ce5c0ea4525696af2b6909');
    requestBody.append('grant_type', 'authorization_code');
    requestBody.append('code', '8c3b4d93cf2c3b19144b053089fe8d367d669c97');
    requestBody.append('redirect_uri', 'http://localhost:3000/callback');
    requestBody.append('code_verifier', 'iJ_aoT9iBUsnTQ74r1T9PeUBCQJxIrMbuygvkilDiV~QNMICtblfvqBXIoeMApy_AmrIE.etbCcqdyvJwAHXrB_5ZLfdLpIbt0BacCEUKwq2DCGXVtPH6o1h-lF3Dw');
    requestBody.append('code_challenge', 'b460f3cfbb9357c76e93649baf702cdf410c8203e5b2f1484aa2debcee6c7cae');
    requestBody.append('code_challenge_method', 'S256');

    try {
      const response = await axios.post(tokenEndpoint, requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      // Do something with the access token and refresh token
      console.log('Access token:', accessToken);
      console.log('Refresh token:', refreshToken);

      // You can store the tokens in localStorage or state for later use
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
    }
  } else {
    console.error('Invalid authorization code');
  }

}