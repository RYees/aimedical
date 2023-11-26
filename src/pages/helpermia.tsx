/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Header from "~/components/Header/Header";
import Sidebar from "~/components/Sidebar/Sidebar";
import Character from '~/components/Characters/Character';
import AuthModal from "~/components/helper/AuthModal";
import { useState, useEffect, use } from "react";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function HelperMia(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const charinfo = props?.charinfo;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []); 


  return (
    <>
      <div className="">         
          <Character character={charinfo}/> 
      </div>      
    </>
  );
}

export default HelperMia;

import { prisma } from "~/lib/prisma";
export async function getServerSideProps(context) {
  // const prisma = new PrismaClient();
  //const data = await prisma.character.findMany();
  const charinfo = await prisma.character.findMany();
  return {
    props: {
      //character: JSON.parse(JSON.stringify(data)),
      charinfo:  JSON.parse(JSON.stringify(charinfo))
    },
  };
}
