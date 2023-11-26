import { NextApiRequest, NextApiResponse } from 'next' 
// import { prisma } from '../../../../prisma/client'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//import { AccountCreateInput } from '../generated/prisma'

import axios from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query

  // Exchange code for tokens
  const { data } = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {     
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,    
      client_secret: process.env.GOOGLE_CLIENT_SECRET,      
      redirect_uri: `${req.headers.origin}/api/auth/callback/google`,
      grant_type: 'authorization_code'
    }
  })

  const { access_token } = data

  // Get Google user profile  
  const { data: profile } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo', 
    headers: { Authorization: `Bearer ${access_token}` }  
  })

//   const profile = { /* ... */ } as GoogleProfile

  // Find or create User
  let user = await prisma.user.findUnique({
    where: {
        email: profile.email
    }
 });
    
//  interface GoogleProfile {
//     name: string;
//     email: string;
//     picture: string;
//     email_verified: boolean;
//     // Other fields
//   }


 //if (!user) {
    // user = await prisma.user.create({ 
    //     data: UserCreateInput = {
    //         name: profile.name,
    //         email: profile.email,
    //         image: profile.picture,
    //         email_verified: profile.email_verified
    //         // Other fields 
    //        } 
    //   })
  //}
  
  //if(user) {
//   const data: AccountCreateInput = {
//     accessToken: access_token,  
//     provider: 'google.com',
//     providerAccountId: profile.sub,
//     user: {      
//       connect: {      
//         id: user.id       
//       }  
//     }
//}

  // Create or update Account     
//   await prisma.account.upsert({
//     create: {         
//       access_token,     
//       provider: 'google.com',  
//       providerAccountId: profile.sub,
//       //type: 'google', 
//       user: { connect: { id: user.id } }       
//     }  
//   })  

//}
  
   
   // Sign in user         
  res.redirect(302, '/login')  
}