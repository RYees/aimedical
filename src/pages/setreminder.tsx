import React from 'react';
import Reminder from '~/components/Reminder/Reminder';
import { PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import AiReminder from '~/components/AInotification/AiReminder';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"

interface ReminderData {
  reminders: any;
}

interface Props {
  reminders: ReminderData | null;
}

const SetReminder: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []); // Run the effect only once on component mount

  useEffect(() => {
     console.log('fetching....')
  },[props])


  let reminders: any; 
  if (props.reminders !== null) {
    reminders = props?.reminders?.reminders;   
  }

  return (
    <div className="">
      <div>
        <Reminder reminders={reminders}/>
      </div>       
    </div>
  );
};

export default SetReminder;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  const user = session?.user;  
  if(user){
    const userreminders = await prisma?.user?.findUnique(
      {
          where: {
              id: user?.id,
          },
          include: {
              reminders: true
          },
      }
    );
    return {
      props: {
        reminders: JSON.parse(JSON.stringify(userreminders))
      },
    };
  } 
  return {
    props: {}
  }
}