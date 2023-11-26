import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

const generateCodeVerifier = () => {
  const codeVerifier = crypto.randomBytes(32).toString('hex');
  return codeVerifier;
};

const generateCodeChallenge = (codeVerifier:any) => {
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return codeChallenge;
};

export default (req:any, res:any) => {
  // Generate code verifier and code challenge
  const codeVerifier = generateCodeVerifier();
  //const codeVerifier = '01234567890123456789012345678901234567890123456789';
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Use the generated code verifier and code challenge as needed

  // Return the code verifier and code challenge in the API response
  res.status(200).json({ codeVerifier, codeChallenge });
};