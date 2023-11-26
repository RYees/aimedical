import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "~/components/Header/Header";
import AuthModal from "~/components/helper/AuthModal";
import Head from 'next/head';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showModal, setShowModal] = useState(false);
  //const closeModal = () => setShowModal(false);
  const closeModal = (): null => {
    // Function implementation
    
    return null;
  };
  const openModal = () => setShowModal(true);
  const isHomePage = Component.name === "Page";
  const isChat = Component.name === "Chat";
  //const isSetup = Component.name === "SetReminder";
  const isAuth = Component.name === "AuthPage";
 
  return (
    <SessionProvider session={session}> 
     {/* <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}

      <div className="relative flex h-full overflow-x-hidden overflow-y-hidden">
        {!isHomePage && !isAuth && (
          <div className="w-1/6">
            <Sidebar/>
          </div>
        )}

        <div className="w-5/6 flex-1">
        {!isHomePage && !isChat &&  !isAuth && <Header openModal={openModal} />}
          <Component {...pageProps}  className="overflow-y-hidden"/>
        </div>

      {/* <div className="flex-1">
          {Component.name !== 'NewHomePage' ? (
            <Component {...pageProps} />
          ) : (
            <div className="w-full">
              <Component {...pageProps} />
            </div>
          )}
      </div> */}

      </div>

      {/* </Sidebar> */}
      <AuthModal 
      show={showModal} 
      onClose={closeModal} 
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
