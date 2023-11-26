


import React, {useEffect} from 'react'
import { authOptions } from '~/server/auth'
import { getServerSession } from 'next-auth'
// import { useSession } from 'next-auth/react'
import { useSession, getSession } from 'next-auth/react'
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from 'next'


const Healthplan =  (props:any) => {
 const { data: sessionData } =  useSession();
 if (sessionData) {
  const { user } = sessionData
  const userId = user.id // Or user.sub, depending on config
  console.log("amir", userId)
}
//  const [session, loading] = useSession()
//  const sessionData = getSession()
//  const { user: {userId, name}, accessToken } = sessionData 



//   const session = await getServerSession(authOptions)

// async function fetchData (req:any, res:any) {
//       if (sessionData) {
//         // Call Prisma to find user
//         const user = await prisma.user.findUnique({ 
//           where: { email: JSON.stringify(sessionData.user.email) } 
//         })
        
//         if (user) {
//           return res.json({
//             userId: user.id  
//           }) 
//         }
//       }
// }

// if(sessionData) {
//   const user = await prisma.user.findUnique({ 
//     where: { email: JSON.stringify(sessionData.user.email) } 
//   })
  
//   if (user) {
//     return res.json({
//       userId: user.id  
//     }) 
// }
// }

 //  console.log(fetchData, "hey")
  return (
    <div>
      healthplan
      <pre>{JSON.stringify(sessionData)}</pre>
    </div>
  )
}

export default Healthplan

// export async function getServerSideProps() {
//   const { data: sessionData } =  useSession();
//   const session = await getServerSession(authOptions)
//   const prisma = new PrismaClient()
// //   const session = await getServerSession(authOptions)
//   if(sessionData) {
//   const user = await prisma.user.findUnique({ 
//     where: { email: JSON.stringify(sessionData.user.email) } 
//   })
  
//   if (user) {
//   return {
//     props: {
//       userId: user.id  
//     },
//   };
// }

// }
// }
  