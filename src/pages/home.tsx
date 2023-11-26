/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Header from "~/components/Header/Header";
import Sidebar from "~/components/Sidebar/Sidebar";
import Characters from "~/components/Characters/Characters";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import FancyTestimonialsSlider from "~/components/testimonials";
import AuthModal from "~/components/helper/AuthModal";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

function Home(props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const character = props.character;
  const { data: session, status } = useSession();
  const user = session?.user;

  const authRouter = () => {
    router.push("/auth")
  }


  return (
    <>
      {/* <AuthModal show={showModal} onClose={closeModal} /> */}

      {/* <button onClick={() => withthingsCode}>codeTotoken</button><br /> */}
      <div id="__next" data-reactroot="" className="bg-white">
        <a
          className="skip-to-content-link"
          href="#main"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate3d(-50%, -110%, 0)",
          }}
        >
          Skip to content
        </a>
        <div
          data-focus-guard="true"
          tabIndex={-1}
          style={{
            width: 1,
            height: 0,
            padding: 0,
            overflow: "hidden",
            position: "fixed",
            top: 1,
            left: 1,
          }}
        />
        <div
          data-focus-guard="true"
          tabIndex={-1}
          style={{
            width: 1,
            height: 0,
            padding: 0,
            overflow: "hidden",
            position: "fixed",
            top: 1,
            left: 1,
          }}
        />
        <div
          data-focus-lock-disabled="disabled"
          className="pointer-events-none fixed z-40 flex w-full justify-between p-4 pt-8"
        >
          <Link
            className="pointer-events-auto relative z-50"
            href="/"
            style={{ transform: "rotate(3.96247deg) translateZ(0px)" }}
          >
            <span className="sr-only">Papa - Home</span>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 144 144"
              width="1em"
              height="1em"
              style={{ overflow: "visible" }}
              role="presentation"
              className="logo relative block text-[60px] md:text-[85px] lg:text-[100px] xl:text-[116px]"
            >
              <path
                className="logo-circle"
                d="M72 144A72 72 0 1 0 0 72a72 72 0 0 0 72 72Z"
              />
              <path
                className="cls-2 logo-text"
                d="M43.32 71.35c0 7.66-4.58 12.75-10.7 12.75a8.45 8.45 0 0 1-7.28-3.64v11.81h-7.57v-32.5h7.47v4a8.56 8.56 0 0 1 7.76-4.7c6.16 0 10.32 5.14 10.32 12.28Zm-7.76.28c0-3.6-2.1-6.11-5.18-6.11s-5.14 2.51-5.14 6.2 2 6 5.05 6 5.27-2.49 5.27-6.09ZM100.24 71.35c0 7.66-4.57 12.75-10.69 12.75a8.48 8.48 0 0 1-7.29-3.64v11.81H74.7v-32.5h7.47v4a8.53 8.53 0 0 1 7.75-4.67c6.17-.03 10.32 5.11 10.32 12.25Zm-7.75.28c0-3.6-2.1-6.11-5.18-6.11s-5.14 2.51-5.14 6.2 2 6 5 6 5.32-2.49 5.32-6.09ZM114.83 77.7c-3 0-5.09-2.29-5.09-6s2.05-6.21 5.18-6.21 5.08 2.45 5.08 6.09-2 6.12-5.17 6.12Zm12.65-17.93h-7.56v3.6a7.48 7.48 0 0 0-7-4.3c-7 0-10.92 6-10.92 12.56 0 6.91 3.92 12.47 10.55 12.47a8 8 0 0 0 7.52-4.67c.61 2 2.19 4.25 7.19 4.25a11.4 11.4 0 0 0 2.2-.23V77.7c-1.17 0-2-.56-2-2.43ZM57.9 77.7c-3 0-5.09-2.29-5.09-6s2.06-6.21 5.18-6.21 5.1 2.47 5.1 6.11-2.09 6.1-5.19 6.1Zm12.66-17.93H63v3.6a7.48 7.48 0 0 0-7-4.3c-7.05 0-10.93 6-10.93 12.56 0 6.91 3.92 12.47 10.55 12.47a8 8 0 0 0 7.52-4.67c.61 2 2.2 4.25 7.19 4.25a11.4 11.4 0 0 0 2.2-.23V77.7c-1.17 0-2-.56-2-2.43Z"
              />
              <path
                className="logo-circle"
                d="M129 131.59h-2.3v6.21h-1.91v-6.21h-2.26v-1.79H129ZM137.68 137.8l-.49-6-1.67 6h-2l-1.65-6.09-.4 6.09h-1.76l.53-8h2.84l1.49 5.47 1.57-5.47h2.77l.66 8Z"
              />
            </svg> */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 800"
              width="1em"
              height="1em"
              style={{ overflow: "visible" }}
              role="presentation"
              className="logo relative block text-[60px] md:text-[85px] lg:text-[100px] xl:text-[116px]"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="lllove-grad"
                >
                  <stop
                    stop-color="hsl(37, 99%, 67%)"
                    stop-opacity="1"
                    offset="0%"
                  ></stop>
                  <stop
                    stop-color="hsl(316, 73%, 52%)"
                    stop-opacity="1"
                    offset="100%"
                  ></stop>
                </linearGradient>
              </defs>
              <g
                fill="url(#lllove-grad)"
                id="heart"
                transform="matrix(1,0,0,1,0,-10)"
              >
                <path
                  d="M398.6 243.4C623.4 19.6 833.6 351 400 700 -33.6 351 176.6 19.6 398.6 243.4Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 800"
              width="1.5em"
              height="1.5em"
              style={{ overflow: "visible" }}
              role="presentation"
              className="logo relative block text-[60px] md:text-[85px] lg:text-[100px] xl:text-[116px]"
            >
              <defs>
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="lllove-grad"
                >
                  <stop
                    stop-color="hsl(37, 99%, 67%)"
                    stop-opacity="1"
                    offset="0%"
                  ></stop>
                  <stop
                    stop-color="hsl(316, 73%, 52%)"
                    stop-opacity="1"
                    offset="100%"
                  ></stop>
                </linearGradient>
              </defs>
              <g
                fill="url(#lllove-grad)"
                id="heart"
                transform="matrix(1,0,0,1,0,-10)"
              >
                <path
                  d="M393.0055915459052 244.79858249050747C573.0503821739783 103.51608089633757 629.4041748046875 689.4615580952251 390.20977783203125 379.7203185608337 142.6237922081582 657.293665319056 205.97063579425935 104.91468362874917 393.0055915459052 244.79858249050747Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </Link>
          <div className="pointer-events-auto flex h-[30px] space-x-2 text-xs lg:h-[50px] lg:text-base">
            <nav className="text-blue ease-in-sine font-headings drop-shadow-menu transition-custom-common z-10 hidden items-center rounded-3xl bg-white bg-opacity-100 px-4 font-bold leading-none delay-75 duration-200 lg:flex lg:flex-row">
              <Link className="p-4 font-bold" href="#health-plans">
                Personalized Health Plans
              </Link>
              <Link className="p-4 font-bold" href="#medication">
                Medication Management
              </Link>
              <Link className="p-4 font-bold" href="#pals">
                Virtual Companions
              </Link>
              <Link className="p-4 font-bold" href="/resources">
                Resources
              </Link>
            </nav>
            <Link
              className="font-headings button shadow-custom-button button inverse relative z-10 inline-flex h-full flex-none items-center self-start whitespace-nowrap rounded-full px-5 py-3 text-center text-xs font-black uppercase leading-none tracking-wider lg:text-base"
              href="/support"
            >
              Contact Mi Amor
            </Link>
            <div data-autofocus-inside="true" className="">
              <button
                className="bg-blue-1 h-50 lg:w drop-shadow-menu relative z-10 h-full w-[43px] overflow-hidden rounded-[36px] lg:w-[72px]"
                aria-controls="drawer"
                aria-expanded="false"
                style={{ width: 72 }}
              >
                <span className="sr-only">Open menu</span>
                <i style={{ display: "block", opacity: 1 }}>
                  <figure
                    role="none"
                    aria-hidden="true"
                    className="bg-blue absolute right-[15px] top-[9px] block h-[2px] w-[12px] transform overflow-hidden rounded-full lg:right-[20px] lg:top-[15px] lg:h-[3px] lg:w-[20px]"
                  />
                  <figure
                    role="none"
                    aria-hidden="true"
                    className="bg-blue absolute right-[15px] top-1/2 block h-[2px] w-[17px] translate-y-[-2px] transform overflow-hidden rounded-full lg:right-[20px] lg:h-[3px] lg:w-[28px]"
                  />
                  <figure
                    role="none"
                    aria-hidden="true"
                    className="bg-blue absolute right-[15px] top-[17px] block h-[2px] w-[8px] transform overflow-hidden rounded-full lg:right-[20px] lg:top-[31px] lg:h-[3px] lg:w-[14px]"
                  />
                </i>
                <i
                  role="presentation"
                  aria-hidden="true"
                  className="text-blue absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-xl lg:text-3xl"
                  style={{ display: "none", opacity: 0 }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </i>
              </button>
            </div>
            <div
              id="drawer"
              className="bg-blue-5 fixed inset-y-0 right-0 top-0 block w-[100vw]"
              style={{
                display: "none",
                transform: "translateX(125%) translateZ(0px)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={810}
                viewBox="0 0 32 810"
                aria-hidden="true"
                className="absolute left-[-31px] block h-full w-[32px]"
                preserveAspectRatio="none"
              >
                <path
                  d="M31 0h1v810h-1S0 607.5 0 405 31 0 31 0Z"
                  fill="#06083c"
                />
              </svg>
              <div className="relative block h-full w-full overflow-auto">
                <div className="relative block h-full min-h-[500px] w-full">
                  <ul className="text-blue-1 font-headings absolute left-[50vw] top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col space-y-4 pb-20 text-center text-2xl font-bold md:-ml-4 md:-translate-x-full md:text-right md:text-4xl">
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateX(50%) translateZ(0px)",
                      }}
                    >
                      <Link className="p-4 font-bold" href="/pals/how-it-works">
                        Life as a Papa Pal
                      </Link>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateX(50%) translateZ(0px)",
                      }}
                    >
                      <Link className="p-4 font-bold" href="/members">
                        Members
                      </Link>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateX(50%) translateZ(0px)",
                      }}
                    >
                      <Link className="p-4 font-bold" href="/product">
                        Product
                      </Link>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateX(50%) translateZ(0px)",
                      }}
                    >
                      <Link className="p-4 font-bold" href="/about">
                        About Us
                      </Link>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateX(50%) translateZ(0px)",
                      }}
                    >
                      <Link className="p-4 font-bold" href="/about/careers">
                        Careers
                      </Link>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateX(50%) translateZ(0px)",
                      }}
                    >
                      <Link className="p-4 font-bold" href="/support">
                        Support
                      </Link>
                    </li>
                  </ul>
                  <ul className="absolute bottom-0 left-[50vw] mb-8 flex -translate-x-1/2 transform space-x-4 md:-ml-8 md:-translate-x-full">
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateY(50%) translateZ(0px)",
                      }}
                    >
                      <a
                        href="https://twitter.com/join_papa"
                        rel="noopener"
                        target="_blank"
                        className="text-blue-1 text-[32px]"
                      >
                        <span className="sr-only">
                          twitter{/* */} (opens in a new window)
                        </span>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          role="presentation"
                        >
                          <path
                            d="M16 0C7.14 0 0 7.14 0 16s7.14 16 16 16 16-7.14 16-16S24.86 0 16 0Zm9.734 12.484v.594c0 6-4.547 12.922-12.922 12.922-2.546 0-4.953-.703-6.953-2 .329.031.704.078 1.063.078 2.156 0 4.078-.86 5.64-2.078-1.968-.031-3.671-1.266-4.234-3.078.266.047.563.078.86.078.406 0 .812-.031 1.187-.14-2.078-.454-3.64-2.266-3.64-4.485v-.047a4.096 4.096 0 0 0 2.046.563c-1.219-.813-2-2.188-2-3.782 0-.812.219-1.593.594-2.296a12.908 12.908 0 0 0 9.406 4.78 4.631 4.631 0 0 1-.11-1.03c0-2.532 2-4.563 4.517-4.563 1.296 0 2.484.563 3.296 1.438a9.139 9.139 0 0 0 2.844-1.11c-.328 1.078-1 1.969-1.953 2.531A10.334 10.334 0 0 0 28 10.141c-.625.89-1.375 1.718-2.266 2.343Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateY(50%) translateZ(0px)",
                      }}
                    >
                      <a
                        href="https://www.facebook.com/joinpapa/"
                        rel="noopener"
                        target="_blank"
                        className="text-blue-1 text-[32px]"
                      >
                        <span className="sr-only">
                          facebook{/* */} (opens in a new window)
                        </span>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          role="presentation"
                        >
                          <path
                            d="M16 0C7.172 0 0 7.172 0 16c0 8.719 6.969 15.813 15.64 16V19.328H12v-4h3.64v-4c0-3.172 1.938-5.312 5.782-5.312 1.687 0 2.875.265 2.875.265V10H21.75c-1.172 0-1.75.656-1.75 1.813v3.515h4l-.578 4H20V31.5c6.906-1.781 12-8.047 12-15.5 0-8.828-7.172-16-16-16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateY(50%) translateZ(0px)",
                      }}
                    >
                      <a
                        href="https://www.youtube.com/PapaInc"
                        rel="noopener"
                        target="_blank"
                        className="text-blue-1 text-[32px]"
                      >
                        <span className="sr-only">
                          youtube{/* */} (opens in a new window)
                        </span>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          role="presentation"
                        >
                          <path
                            d="M16 0C7.14 0 0 7.14 0 16s7.14 16 16 16 16-7.14 16-16S24.86 0 16 0Zm0 23.328c-10 0-10 0-10-7.328s0-7.328 10-7.328 10 0 10 7.328 0 7.328-10 7.328ZM13.328 20 20 16l-6.672-4v8Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateY(50%) translateZ(0px)",
                      }}
                    >
                      <a
                        href="https://www.linkedin.com/company/papainc"
                        rel="noopener"
                        target="_blank"
                        className="text-blue-1 text-[32px]"
                      >
                        <span className="sr-only">
                          linkedin{/* */} (opens in a new window)
                        </span>
                        <svg
                          width="1em"
                          height="1em"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          role="presentation"
                        >
                          <path
                            d="M16 0C7.14 0 0 7.14 0 16s7.14 16 16 16 16-7.14 16-16S24.86 0 16 0ZM9.328 10.672h-.031c-1.594 0-2.625-1.047-2.625-2.344C6.672 7 7.734 6 9.328 6c1.64 0 2.64 1 2.672 2.328 0 1.297-1.031 2.344-2.672 2.344Zm2 13.328h-4V12.672h4V24ZM26 24h-4v-6c0-2.031-.813-2.672-2.031-2.672C18.734 15.328 18 16.375 18 18v6h-4v-8.672s-.078-2.219-.11-2.656h3.97l.14 1.734C18.516 12.97 19.703 12 21.328 12 24.188 12 26 14.328 26 18v6Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                    <li
                      style={{
                        opacity: 0,
                        transform: "translateY(50%) translateZ(0px)",
                      }}
                    >
                      <a
                        href="https://www.instagram.com/join_papa/"
                        rel="noopener"
                        target="_blank"
                        className="text-blue-1 text-[32px]"
                      >
                        <span className="sr-only">
                          instagram{/* */} (opens in a new window)
                        </span>
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 40 41"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.6806 11.1244H15.3194C12.6512 11.1244 10.4805 13.2951 10.4805 15.9633V25.3245C10.4805 27.9927 12.6512 30.1634 15.3194 30.1634H24.6806C27.3488 30.1634 29.5195 27.9927 29.5195 25.3245V15.9633C29.5195 13.2951 27.3488 11.1244 24.6806 11.1244ZM25.8677 20.6552C25.8564 23.8434 23.2674 26.4325 20.0791 26.4212C16.8909 26.4099 14.3018 23.8208 14.3131 20.6326C14.3244 17.4443 16.9135 14.8553 20.1017 14.8666C23.29 14.8779 25.8677 17.4556 25.8677 20.6439V20.6552ZM27.5862 14.4935C27.5862 15.251 26.9644 15.8728 26.2069 15.8728C25.4494 15.8728 24.8276 15.251 24.8276 14.4935C24.8276 13.736 25.4494 13.1142 26.2069 13.1142H26.2182C26.9757 13.1142 27.5862 13.7247 27.5862 14.4822V14.4935ZM20.0791 16.9469C18.0328 16.9582 16.3708 18.6201 16.3821 20.6665C16.3934 22.7129 18.0554 24.3748 20.1017 24.3635C22.1368 24.3522 23.7874 22.7016 23.7987 20.6665V20.6439C23.7874 18.5975 22.1255 16.9356 20.0791 16.9469Z"
                            fill="currentColor"
                          />
                          <path
                            d="M20 0.666504C8.95421 0.666504 0 9.62072 0 20.6665C0 31.7123 8.95421 40.6665 20 40.6665C31.0458 40.6665 40 31.7123 40 20.6665C40 9.62072 31.0458 0.666504 20 0.666504ZM31.7241 25.3245C31.6902 29.1911 28.5472 32.3115 24.6806 32.3228H15.3194C11.4302 32.3115 8.28717 29.1685 8.27586 25.2793V15.9633C8.27586 12.0741 11.4302 8.91975 15.3194 8.90845H24.6806C28.5698 8.91975 31.7241 12.0741 31.7241 15.9633V25.3245Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-focus-guard="true"
          tabIndex={-1}
          style={{
            width: 1,
            height: 0,
            padding: 0,
            overflow: "hidden",
            position: "fixed",
            top: 1,
            left: 1,
          }}
        />
        <div className="flex min-h-screen flex-col antialiased">
          <main
            role="main"
            className="flex flex-auto flex-col items-stretch justify-start"
          >
            <section
              id="Page_Pagelayout_Sections_HeroImageRight"
              className="theme relative overflow-hidden bg-[#f5f5f5] px-8 py-12 pt-16 md:py-20   lg:py-28 lg:pt-20 xl:py-32 xl:pt-24 2xl:py-36 2xl:pt-36"
              role="banner"
              index={0}
              type="Page_Pagelayout_Sections_HeroImageRight"
            >
              <div className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 ">
                <div className="relative col-span-12 row-start-1 -ml-2 flex min-h-[400px] flex-col justify-center py-6 text-center lg:col-span-5 lg:col-start-3 lg:row-start-auto lg:-ml-4 lg:min-h-[60vh] lg:py-0 lg:text-left xl:-ml-6 2xl:min-h-[60vh]">
                  <h1 className="text-huge md:text-huge-md lg:text-huge-lg xl:text-huge-xl text-title font-black lg:mb-8">
                    Mi Amor AI
                    <br />
                  </h1>
                  <article className="prose lg:prose-xl prose-a:text-current mx-auto mt-5 lg:mx-0">
                    <p>
                      <span style={{ fontWeight: 400 }}>
                        Welcome to MiaAmor.{" "}
                      </span>
                    </p>
                    <p>
                      <span style={{ fontWeight: 400 }}>
                        where technology meets compassion to provide
                        personalized companionship and support for the elderly.
                        Our AI-powered companions bring warmth and understanding
                        to combat loneliness and promote well-being in the lives
                        of seniors.
                      </span>
                    </p>
                  </article>
                  <div className="flex">
                    {!user? (
                    <button
                      onClick={authRouter}
                      className="mr-16 mt-4  w-1/2 rounded-full bg-gradient-to-r from-orange-400 via-fuchsia-500 to-pink-500 p-1"
                    >
                      <span className="block rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-transparent hover:text-white">
                        Get Started
                      </span>
                    </button>) 
                    : (
                     
                          <button                            
                            className="mr-16 mt-4  w-1/2 rounded-full bg-gradient-to-r from-orange-400 via-fuchsia-500 to-pink-500 p-1"
                          >
                            <Link 
                            href="/dashboard"
                            >
                              <span className="block rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-transparent hover:text-white">
                                Go to app
                              </span>
                            </Link>
                          </button>
                        
                      )}
                    
                    <a
                      href="#learnmore"
                      className="mr-8 mt-4 w-1/2 rounded-full bg-gradient-to-r from-orange-400 via-fuchsia-500 to-pink-500 p-1"
                    >
                      <span className="block rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-transparent hover:text-white">
                        Learn More
                      </span>
                    </a>
                  </div>

                  {/* <div className="font-headings relative mt-6 block w-full font-bold md:mx-auto md:w-3/4 lg:w-full">
                    <select
                      aria-label="Select a destinatio"
                      className="border-3 h-[53px] w-full appearance-none overflow-hidden  rounded-[40px] border-[#69F1FF] bg-white bg-none  py-3 pl-6 pr-20 text-lg font-bold lg:h-[76px] lg:text-2xl "
                      placeholder="I'd like to learn..."
                    >
                      <option disabled="" selected="">
                        I'd like to learn...
                      </option>
                      <option value="how Papa works with health plans">
                        how Papa works with health plans
                      </option>
                      <option value="why employers choose Papa">
                        why employers choose Papa
                      </option>
                      <option value="where I can sign up to be a Papa Pal">
                        where I can sign up to be a Papa Pal
                      </option>
                      <option value="how to get started as a member">
                        how to get started as a member
                      </option>
                      <option value="about career opportunities at Papa">
                        about career opportunities at Papa
                      </option>
                    </select>
                    <svg
                      width="1em"
                      height="1em"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      viewBox="0 0 24 24"
                      className="pointer-events-none absolute right-6 top-1/2 block -translate-y-1/2 transform text-2xl "
                    >
                      <path d="m19 8-7 12L5 8h14Z" fill="currentColor" />
                    </svg>
                  </div> */}
                </div>
                <div className=" relative col-span-12 row-start-2 transform md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-9 lg:row-start-auto lg:flex lg:-translate-y-12 lg:items-center lg:justify-end">
                  <figure
                    className=" transition-gpu ease-out-sine transition-gpu relative row-start-1 block h-0 w-full translate-y-0 rotate-[5deg] transform overflow-hidden rounded-3xl duration-300 duration-300  ease-out xl:absolute xl:top-0"
                    id="cG9zdDo2MDEzOA=="
                    style={{ paddingTop: "160.409%" }}
                  >
                    <img
                      alt=""
                      className="transition-gpu visible absolute inset-0 mt-20 block w-full	 rounded-lg opacity-100 duration-300 ease-out "
                      width={538}
                      height={863}
                      loading="eager"
                      sizes="(max-width: 538px) 100vw, 538px"
                      decoding="async"
                      fetchpriority="high"
                      src="https://assets.playgroundai.com/f2434d1d-85a0-4269-ae3c-2176bb6d3c12.jpg"
                      // srcSet="https://images.papa.com/wp-content/uploads/2023/05/Home-Hero-538x863-copy-1.png 538w, https://images.papa.com/wp-content/uploads/2023/05/Home-Hero-538x863-copy-1-187x300.png 187w"
                    />
                    <noscript />
                  </figure>
                </div>
              </div>
            </section>
            <div id="main" />
            <section
              id="learnmore"
              className="clipped theme theme-brown relative mb-[-21px] overflow-hidden px-8 py-12 md:-mb-8 md:py-20 lg:-mb-12 lg:py-28 xl:mb-[-64px]  xl:py-32 2xl:py-36 "
              index={1}
              type="Page_Pagelayout_Sections_BenefitsGrid"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 1440 64"
                className="fill-bg absolute left-0 top-0 block h-[21px] w-full translate-y-[calc(-100%+1px)] transform overflow-visible md:h-8 lg:h-12 xl:h-16"
                preserveAspectRatio="none"
              >
                <path d="M0,0S203,64,720,64,1440,0,1440,0V64H0Z" />
              </svg>
              <div className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 ">
                <div className="col-span-12 flex flex-col space-y-4 pr-4 lg:col-span-4 lg:col-start-3 lg:pr-6 xl:pr-8 2xl:pr-10">
                  <h2 className="mb-5 text-[40px] font-bold leading-none lg:text-6xl">
                    Companion care
                  </h2>
                  <article className="prose-lg lg:prose-xl">
                    <p>
                      MiamorAi provide vital social support and care to
                      strengthen families, help older adults remain connected,
                      and support diverse communities—providing win-win benefits
                      for all.
                    </p>
                  </article>
                </div>
                <div className="relative col-span-12 grid gap-2 md:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:gap-4 xl:gap-6">
                  <div
                    id="35-pageSection-1-card-0"
                    className="flex flex-col items-center  py-4 text-center"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 128 135"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      aria-labelledby="35-pageSection-1-card-0-heading"
                      className="text-blue-1 overflow-visible text-[80px] "
                    >
                      <circle
                        cx="64.5"
                        cy="32.5"
                        r="32.5"
                        fill="currentColor"
                      />
                      <path
                        d="M82.2 56.773c11.873-1.628 21.05-11.836 21.05-24.148a1.876 1.876 0 0 0-3.75 0c0 10.81-8.36 19.696-18.953 20.552l-.423-.921c-.009-.019-.02-.036-.028-.054a6.883 6.883 0 0 0-6.221-3.952h-20a6.883 6.883 0 0 0-6.22 3.952c-.01.018-.02.035-.029.054l-.423.92C36.61 52.322 28.25 43.436 28.25 32.626a1.875 1.875 0 0 0-3.75 0c0 12.313 9.177 22.52 21.05 24.148L31.83 86.612c-2.376 5.17-3.581 10.697-3.581 16.429 0 .568.258 1.105.7 1.461 7.095 5.705 15.945 9.464 25.55 10.947v13.823l-6.218 2.073a1.876 1.876 0 0 0 1.186 3.557l7.5-2.5a1.874 1.874 0 0 0 1.282-1.778V115.91a61.98 61.98 0 0 0 11.25 0v14.715c0 .807.517 1.523 1.281 1.778l7.5 2.5a1.876 1.876 0 0 0 1.186-3.557l-6.218-2.073V115.45c9.607-1.483 18.456-5.242 25.55-10.947.443-.356.7-.893.7-1.461 0-5.732-1.205-11.26-3.581-16.429L82.2 56.773ZM77 55.124V93.25h-3.75V52h.625A3.128 3.128 0 0 1 77 55.125ZM63.875 67c1.035 0 1.875-.84 1.875-1.875V52h3.75v18.75H58.25V52H62v13.125C62 66.16 62.84 67 63.875 67Zm-5.625 7.5H69.5v18.75H58.25V74.5ZM53.875 52h.625v41.25h-3.75V55.125A3.128 3.128 0 0 1 53.875 52Zm-21.864 50.141a35.274 35.274 0 0 1 3.227-13.961L47 62.596v32.529C47 96.16 47.84 97 48.875 97H54.5v14.644c-8.204-1.362-16.032-4.528-22.49-9.503Zm26.239 9.997V97H69.5v15.138a57.77 57.77 0 0 1-11.25 0Zm15-.494V97h5.625c1.035 0 1.875-.84 1.875-1.875v-32.53L92.512 88.18a35.29 35.29 0 0 1 3.227 13.961c-6.457 4.975-14.285 8.141-22.489 9.503Z"
                        fill="#000"
                      />
                      <path
                        d="M55.998 20.876c-.053.04-.101.081-.15.125-3.098 2.403-5.098 6.158-5.098 10.374 0 7.237 5.888 13.125 13.125 13.125S77 38.612 77 31.375c0-4.464-2.242-8.412-5.657-10.784a5.613 5.613 0 0 0 1.907-4.216c0-5.17-4.205-9.375-9.375-9.375S54.5 11.205 54.5 16.375a5.61 5.61 0 0 0 1.907 4.216 12.84 12.84 0 0 0-.264.187 1.96 1.96 0 0 0-.145.098Zm7.877 19.874c-5.17 0-9.375-4.206-9.375-9.375a9.34 9.34 0 0 1 2.425-6.285 24.112 24.112 0 0 0 16.151 8.075c-.838 4.316-4.643 7.585-9.201 7.585Zm0-18.75c4.49 0 8.251 3.174 9.163 7.395a20.393 20.393 0 0 1-13.074-6.537A9.306 9.306 0 0 1 63.875 22Zm-3.75-3.75a1.877 1.877 0 0 1-1.875-1.875 5.631 5.631 0 0 1 5.625-5.625 5.631 5.631 0 0 1 5.625 5.625c0 1.034-.84 1.875-1.875 1.875h-7.5Z"
                        fill="#000"
                      />
                    </svg>
                    <h3
                      id="35-pageSection-1-card-0-heading"
                      className="mb-3 mt-4 text-xl font-bold lg:text-2xl"
                    >
                      Promote independence
                    </h3>
                    <div className="prose-lg lg:prose-xl">
                      MiamorAI gives older adults companionship and support to
                      age in place.
                    </div>
                  </div>
                  <div
                    id="35-pageSection-1-card-1"
                    className="flex flex-col items-center  py-4 text-center"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 128 128"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      aria-labelledby="35-pageSection-1-card-1-heading"
                      className="text-blue-1 overflow-visible text-[80px] "
                    >
                      <circle
                        cx="32.5"
                        cy="53.5"
                        r="32.5"
                        fill="currentColor"
                      />
                      <g clipPath="url(#mentor_svg__a)" fill="#000">
                        <path d="M71.501 50.62a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0ZM71.501 58.12a1.874 1.874 0 1 1-3.748 0 1.874 1.874 0 0 1 3.748 0ZM71.501 65.62a1.874 1.874 0 1 1-3.748 0 1.874 1.874 0 0 1 3.748 0Z" />
                        <path d="M103.377 38.747h-3.75a1.874 1.874 0 1 0 0 3.75h3.75c1.034 0 1.875.841 1.875 1.875a1.877 1.877 0 0 1-1.875 1.875H86.239c-.818-2.882-3.472-5-6.613-5H78.8a13.09 13.09 0 0 0 3.952-9.376V12.367a7.526 7.526 0 0 0-2.888-5.91A7.524 7.524 0 0 0 76.188 1a7.524 7.524 0 0 0-6.562-.456 7.527 7.527 0 0 0-6.563.456 7.525 7.525 0 0 0-3.675 5.455 7.528 7.528 0 0 0-2.887 5.911v19.504c0 3.67 1.516 6.991 3.952 9.376h-.827a6.883 6.883 0 0 0-6.875 6.875v28.385a6.883 6.883 0 0 0 6.875 6.875h.625v38.891l-6.219 2.073a1.875 1.875 0 1 0 1.187 3.557l7.5-2.5A1.874 1.874 0 0 0 64 123.624V84.981a13.112 13.112 0 0 0 11.25 0v38.643c0 .808.516 1.524 1.282 1.779l7.5 2.5a1.876 1.876 0 0 0 1.187-3.557L79 122.273V83.382h.626c3.791 0 6.876-3.084 6.876-6.875v-26.51h16.875a5.632 5.632 0 0 0 5.625-5.625 5.632 5.632 0 0 0-5.625-5.625ZM75.251 71.248H64v-26.25h11.25v26.25Zm-15-46.877c0-5.17 4.205-9.375 9.375-9.375S79 19.201 79 24.371v.625h-3.784a7.491 7.491 0 0 0-5.591-2.5 7.488 7.488 0 0 0-5.59 2.5h-3.785v-.625Zm0-12.004c0-1.333.719-2.578 1.877-3.248.579-.335.935-.952.936-1.62a3.764 3.764 0 0 1 1.874-3.25 3.765 3.765 0 0 1 3.752.001c.58.334 1.293.334 1.873 0a3.766 3.766 0 0 1 3.75-.002 3.767 3.767 0 0 1 1.875 3.25c0 .67.357 1.286.936 1.621a3.765 3.765 0 0 1 1.877 3.248v2.831a13.082 13.082 0 0 0-9.375-3.952c-3.67 0-6.991 1.516-9.375 3.952v-2.83Zm0 19.504v-3.125h4.697c.626 0 1.211-.311 1.559-.83a3.748 3.748 0 0 1 6.238 0c.349.519.933.83 1.559.83H79v3.125c0 5.17-4.205 9.376-9.375 9.376s-9.375-4.206-9.375-9.376Zm-.625 47.76a3.129 3.129 0 0 1-3.125-3.124V48.122a3.128 3.128 0 0 1 3.125-3.125h.625v34.635h-.625Zm10 2.867A9.36 9.36 0 0 1 64 80.622v-5.624h11.25v5.624a9.357 9.357 0 0 1-5.625 1.876Zm13.126-5.991a3.129 3.129 0 0 1-3.126 3.125H79V44.997h.625a3.129 3.129 0 0 1 3.126 3.125v28.385ZM43.376 33.746H24.625A5.632 5.632 0 0 0 19 39.372v7.5c0 1.035.839 1.875 1.875 1.875H26.5V59.54h-5.625A1.874 1.874 0 0 0 19 61.414v7.5a5.631 5.631 0 0 0 5.625 5.625h18.751A5.63 5.63 0 0 0 49 68.914V39.372a5.63 5.63 0 0 0-5.624-5.626ZM22.75 44.997v-5.625c0-1.034.84-1.875 1.875-1.875 1.034 0 1.875.84 1.875 1.875v5.625h-3.75Zm0 18.292h3.75v5.625c0 1.034-.84 1.875-1.875 1.875a1.877 1.877 0 0 1-1.875-1.875V63.29Zm22.5 5.625c0 1.034-.84 1.875-1.874 1.875H29.928a5.603 5.603 0 0 0 .322-1.875V39.372c0-.657-.114-1.288-.322-1.875h13.448c1.033 0 1.874.84 1.874 1.875v29.542Z" />
                        <path d="M99.627 34.997c1.036 0 1.875-.84 1.875-1.876v-7.5a1.875 1.875 0 1 0-3.75 0v7.5c0 1.036.839 1.876 1.875 1.876Z" />
                      </g>
                      <defs>
                        <clipPath id="mentor_svg__a">
                          <path fill="#fff" d="M0 0h128v128H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                    <h3
                      id="35-pageSection-1-card-1-heading"
                      className="mb-3 mt-4 text-xl font-bold lg:text-2xl"
                    >
                      Reduce inequities
                    </h3>
                    <div className="prose-lg lg:prose-xl">
                      MiamorAI advances equity for populations that have been
                      historically marginalized.
                    </div>
                  </div>
                  <div
                    id="35-pageSection-1-card-2"
                    className="flex flex-col items-center  py-4 text-center"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 128 144"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      aria-labelledby="35-pageSection-1-card-2-heading"
                      className="text-blue-1 overflow-visible text-[80px] "
                    >
                      <circle
                        cx="64.5"
                        cy="47.5"
                        r="51.5"
                        fill="currentColor"
                      />
                      <path
                        d="M64 27.25c-7.237 0-13.125 5.888-13.125 13.125S56.763 53.5 64 53.5s13.125-5.888 13.125-13.125S71.237 27.25 64 27.25Zm0 22.5c-5.17 0-9.375-4.206-9.375-9.375C54.625 35.205 58.831 31 64 31c5.17 0 9.375 4.206 9.375 9.375 0 5.17-4.206 9.375-9.375 9.375Z"
                        fill="#00003E"
                      />
                      <path
                        d="M126.125 38.5c-1.036 0-1.875.84-1.875 1.875v2.875c0 9.94-7.674 18.116-17.408 18.928-.842-2.845-3.478-4.928-6.592-4.928h-12.5c-3.141 0-5.795 2.118-6.613 5h-4.274c-.819-2.882-3.472-5-6.613-5h-12.5c-3.141 0-5.795 2.118-6.613 5h-4.274c-.819-2.882-3.472-5-6.613-5h-12.5c-3.115 0-5.75 2.083-6.593 4.928C11.424 61.366 3.75 53.19 3.75 43.25v-2.875a1.875 1.875 0 0 0-3.75 0v2.875c0 11.913 9.204 21.715 20.875 22.672v34.453c0 1.035.84 1.875 1.875 1.875h1.875v36.023l-6.218 2.073a1.875 1.875 0 1 0 1.186 3.557l7.5-2.5a1.874 1.874 0 0 0 1.282-1.778V102.25h11.25v37.375c0 .807.516 1.523 1.282 1.778l7.5 2.5a1.88 1.88 0 0 0 1.186 0l7.5-2.5a1.874 1.874 0 0 0 1.281-1.778v-38.644A13.055 13.055 0 0 0 64 102.25a13.04 13.04 0 0 0 5.625-1.269v38.644c0 .807.517 1.523 1.282 1.778l7.5 2.5a1.88 1.88 0 0 0 1.186 0l7.5-2.5a1.874 1.874 0 0 0 1.282-1.778v-38.644A13.055 13.055 0 0 0 94 102.25a13.04 13.04 0 0 0 5.625-1.269v38.644c0 .807.517 1.523 1.282 1.778l7.5 2.5a1.876 1.876 0 0 0 1.186-3.557l-6.218-2.073V98.298a13.077 13.077 0 0 0 3.75-9.173V65.922c11.671-.957 20.875-10.76 20.875-22.672v-2.875a1.875 1.875 0 0 0-1.874-1.875Zm-101.5 25.625A3.128 3.128 0 0 1 27.75 61h12.5a3.128 3.128 0 0 1 3.125 3.125V79.75h-18.75V64.125Zm0 34.375v-15h18.75v15h-18.75Zm30 39.773L49 140.148l-5.625-1.875V102.25h1.875c1.035 0 1.875-.84 1.875-1.875V66h3.75v23.125a13.08 13.08 0 0 0 3.75 9.173v39.975Zm0-74.148A3.128 3.128 0 0 1 57.75 61h4.375v20.625a1.875 1.875 0 0 0 3.75 0V61h4.375a3.128 3.128 0 0 1 3.125 3.125V87.25h-18.75V64.125ZM64 98.5c-4.528 0-8.316-3.226-9.187-7.5h18.373c-.87 4.274-4.659 7.5-9.186 7.5Zm20.625 39.773L79 140.148l-5.625-1.875V98.298a13.08 13.08 0 0 0 3.75-9.173V66h3.75v23.125a13.08 13.08 0 0 0 3.75 9.173v39.975ZM94 98.5c-4.528 0-8.316-3.226-9.187-7.5h18.373c-.871 4.274-4.659 7.5-9.186 7.5Zm9.375-11.25h-18.75V64.125A3.128 3.128 0 0 1 87.75 61h12.5a3.129 3.129 0 0 1 3.125 3.125V87.25Z"
                        fill="#00003E"
                      />
                      <path
                        d="M39.584 28.5a7.469 7.469 0 0 0 1.916-5c0-4.136-3.365-7.5-7.5-7.5-4.136 0-7.5 3.364-7.5 7.5 0 1.92.726 3.672 1.916 5-4.452 2.102-7.541 6.634-7.541 11.875C20.875 47.612 26.763 53.5 34 53.5s13.125-5.888 13.125-13.125c0-5.241-3.09-9.773-7.541-11.875ZM34 19.75a3.754 3.754 0 0 1 3.75 3.75A3.754 3.754 0 0 1 34 27.25a3.754 3.754 0 0 1-3.75-3.75A3.754 3.754 0 0 1 34 19.75Zm0 30c-5.17 0-9.375-4.206-9.375-9.375C24.625 35.205 28.831 31 34 31c5.17 0 9.375 4.205 9.375 9.375S39.169 49.75 34 49.75ZM34 68.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75ZM34 76a1.875 1.875 0 1 0 0-3.75A1.875 1.875 0 0 0 34 76ZM106.406 36.1a1.565 1.565 0 0 0-.045-.132c-1.815-5.076-6.67-8.718-12.361-8.718-3.067 0-5.888 1.06-8.125 2.829-.079.053-.153.11-.222.174a13.103 13.103 0 0 0-4.778 10.122C80.875 47.612 86.763 53.5 94 53.5s13.125-5.888 13.125-13.125c0-1.496-.255-2.934-.719-4.275ZM94 31a9.367 9.367 0 0 1 7.495 3.75H94a5.635 5.635 0 0 1-4.673-2.497A9.314 9.314 0 0 1 94 31Zm0 18.75c-5.17 0-9.375-4.206-9.375-9.375 0-2.108.7-4.055 1.878-5.622A9.393 9.393 0 0 0 94 38.5h9.186c.124.606.189 1.233.189 1.875 0 5.17-4.206 9.375-9.375 9.375Z"
                        fill="#00003E"
                      />
                    </svg>
                    <h3
                      id="35-pageSection-1-card-2-heading"
                      className="mb-3 mt-4 text-xl font-bold lg:text-2xl"
                    >
                      Cure loneliness
                    </h3>
                    <div className="prose-lg lg:prose-xl">
                      No one’s meant to go it alone. With MiamorAI, “together”
                      is just a call or click away.
                    </div>
                  </div>
                  <div
                    id="35-pageSection-1-card-3"
                    className="flex flex-col items-center  py-4 text-center"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 128 142"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      aria-labelledby="35-pageSection-1-card-3-heading"
                      className="text-blue-1 overflow-visible text-[80px] "
                    >
                      <circle
                        cx="42.5"
                        cy="32.5"
                        r="32.5"
                        fill="currentColor"
                      />
                      <path
                        d="M78.375 51.5c7.237 0 13.125-5.888 13.125-13.125 0-5.241-3.089-9.773-7.541-11.875a7.468 7.468 0 0 0 1.916-5c0-4.136-3.364-7.5-7.5-7.5s-7.5 3.364-7.5 7.5c0 1.92.726 3.672 1.916 5-.76.36-1.48.79-2.153 1.281-.047.03-.094.06-.14.095-.052.04-.102.081-.148.124-3.1 2.403-5.1 6.16-5.1 10.375 0 7.237 5.888 13.125 13.125 13.125Zm9.162-15.105a20.398 20.398 0 0 1-13.074-6.537A9.314 9.314 0 0 1 78.375 29c4.49 0 8.251 3.174 9.162 7.395ZM74.625 21.5a3.754 3.754 0 0 1 3.75-3.75 3.755 3.755 0 0 1 3.75 3.75 3.755 3.755 0 0 1-3.75 3.75 3.754 3.754 0 0 1-3.75-3.75Zm-3.2 10.59a24.115 24.115 0 0 0 16.151 8.075c-.838 4.316-4.644 7.585-9.201 7.585-5.17 0-9.375-4.206-9.375-9.375 0-2.416.919-4.621 2.425-6.284ZM27.75 24A1.875 1.875 0 1 1 24 24a1.875 1.875 0 0 1 3.75 0ZM27.75 39A1.875 1.875 0 1 1 24 39a1.875 1.875 0 0 1 3.75 0ZM27.75 31.5a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0ZM59.625 49a1.875 1.875 0 0 0 0-3.75H57.75V15.875c0-1.036-.84-1.875-1.875-1.875h-7.5a1.875 1.875 0 0 0-1.875 1.875V21.5h-5.625A1.875 1.875 0 0 0 39 23.375V29h-5.625a1.875 1.875 0 0 0-1.875 1.875V45.25h-1.875a1.875 1.875 0 1 0 0 3.75h30ZM50.25 17.75H54v27.5h-3.75v-27.5Zm-7.5 7.5h3.75v20h-3.75v-20Zm-7.5 7.5H39v12.5h-3.75v-12.5ZM104 74.625c0-7.372-5.578-13.462-12.734-14.28-.787-2.93-3.465-5.095-6.641-5.095h-12.5c-3.14 0-5.795 2.118-6.613 5H52.125a5.631 5.631 0 0 1-5.625-5.625 1.875 1.875 0 1 0-3.75 0c0 5.169 4.205 9.375 9.375 9.375H65.25v14.94A16.85 16.85 0 0 0 61.5 89.54v12.584c0 1.035.839 1.875 1.875 1.875H69v32.273l-6.218 2.073a1.876 1.876 0 1 0 1.186 3.557l7.5-2.5a1.874 1.874 0 0 0 1.282-1.778V104H84v33.625c0 .807.516 1.523 1.281 1.778l7.5 2.5a1.876 1.876 0 1 0 1.186-3.557l-6.218-2.073V104h5.625c1.036 0 1.875-.84 1.875-1.875V89.541c0-.556-.03-1.107-.084-1.655 5.273-2.21 8.835-7.447 8.835-13.261Zm-16.25-12.5v.625H84A3.754 3.754 0 0 1 80.25 59h4.375a3.129 3.129 0 0 1 3.125 3.125ZM72.125 59H76.5a3.755 3.755 0 0 1-3.75 3.75H69v-.625A3.128 3.128 0 0 1 72.125 59ZM91.5 100.25H65.25V89.541c0-3.196 1.165-6.277 3.281-8.676.302-.343.469-.784.469-1.24V66.5h3.75a7.485 7.485 0 0 0 5.625-2.547A7.484 7.484 0 0 0 84 66.5h3.75v13.125c0 .456.166.897.469 1.24a13.11 13.11 0 0 1 3.281 8.676v10.709Zm2.856-16.116a16.862 16.862 0 0 0-2.856-5.195V64.17c4.967.888 8.75 5.237 8.75 10.456 0 4.059-2.349 7.737-5.894 9.509Z"
                        fill="#000"
                      />
                    </svg>
                    <h3
                      id="35-pageSection-1-card-3-heading"
                      className="mb-3 mt-4 text-xl font-bold lg:text-2xl"
                    >
                      Improve outcomes
                    </h3>
                    <div className="prose-lg lg:prose-xl">
                      Research shows that members feel physically and mentally
                      healthier with MiamorAI.
                    </div>
                  </div>
                  <div
                    id="35-pageSection-1-card-4"
                    className="flex flex-col items-center  py-4 text-center"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 134 140"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      aria-labelledby="35-pageSection-1-card-4-heading"
                      className="text-blue-1 overflow-visible text-[80px] "
                    >
                      <circle
                        cx="32.5"
                        cy="32.5"
                        r="32.5"
                        fill="currentColor"
                      />
                      <path
                        d="M42 37.625a9.326 9.326 0 0 0-.929-4.067A9.336 9.336 0 0 0 42 29.5a9.326 9.326 0 0 0-.929-4.067A9.336 9.336 0 0 0 42 21.375C42 16.205 37.795 12 32.625 12s-9.375 4.205-9.375 9.375c0 1.414.321 2.797.929 4.058a9.339 9.339 0 0 0 0 8.125 9.329 9.329 0 0 0-.929 4.067c0 5.169 4.205 9.375 9.375 9.375S42 42.794 42 37.625Zm-14.964-7.521c-.021-.2-.036-.4-.036-.604a5.631 5.631 0 0 1 5.625-5.625A5.631 5.631 0 0 1 38.25 29.5c0 .202-.015.403-.036.604a9.321 9.321 0 0 0-5.589-1.854c-2.093 0-4.027.69-5.589 1.854Zm5.589-14.354a5.631 5.631 0 0 1 5.625 5.625c0 .202-.015.403-.036.604a9.321 9.321 0 0 0-5.589-1.854c-2.093 0-4.027.69-5.589 1.854-.021-.2-.036-.4-.036-.604a5.631 5.631 0 0 1 5.625-5.625ZM27 37.625A5.631 5.631 0 0 1 32.625 32a5.631 5.631 0 0 1 5.625 5.625 5.631 5.631 0 0 1-5.625 5.625A5.631 5.631 0 0 1 27 37.625ZM107.625 50.75a1.874 1.874 0 0 0-1.875 1.875 5.631 5.631 0 0 1-5.625 5.625H86.737c-.818-2.882-3.471-5-6.612-5h-9.942l-.058-.003c-.02 0-.04.002-.059.003h-9.941c-3.14 0-5.795 2.118-6.613 5H40.125a5.631 5.631 0 0 1-5.625-5.625 1.875 1.875 0 1 0-3.75 0c0 5.169 4.205 9.375 9.375 9.375H53.25v31.509c0 1.035.84 1.875 1.875 1.875h5.625v38.889l-6.218 2.073a1.876 1.876 0 1 0 1.186 3.557l7.5-2.5a1.874 1.874 0 0 0 1.282-1.778V96.981a13.113 13.113 0 0 0 11.25 0v38.644c0 .807.516 1.523 1.281 1.778l7.5 2.5a1.876 1.876 0 0 0 1.187-3.557l-6.218-2.073v-38.89h5.624c1.036 0 1.875-.84 1.875-1.874V62h13.125c5.17 0 9.375-4.206 9.375-9.375a1.873 1.873 0 0 0-1.874-1.875ZM75.75 83.25H64.5V57h3.75v20.622a1.875 1.875 0 1 0 3.75 0V57h3.75v26.25ZM57 91.634V60.125A3.128 3.128 0 0 1 60.125 57h.625v34.634H57ZM70.125 94.5a9.357 9.357 0 0 1-5.625-1.876V87h11.25v5.624a9.36 9.36 0 0 1-5.625 1.876Zm13.125-2.866H79.5V57h.625a3.129 3.129 0 0 1 3.125 3.125v31.509ZM70.125 49.5c7.236 0 13.125-5.888 13.125-13.125 0-4.176-1.963-7.9-5.01-10.305l.383-.666a1.875 1.875 0 1 0-3.247-1.875l-.382.661c-.95-.38-1.951-.654-2.994-.804v-.761a1.875 1.875 0 1 0-3.75 0v.76c-1.043.151-2.046.425-2.995.805l-.381-.66a1.876 1.876 0 0 0-3.248 1.875l.385.665C58.96 28.476 57 32.2 57 36.375 57 43.612 62.888 49.5 70.125 49.5Zm0-22.5c5.169 0 9.375 4.205 9.375 9.375 0 5.169-4.206 9.375-9.375 9.375-5.17 0-9.375-4.206-9.375-9.375 0-5.17 4.205-9.375 9.375-9.375ZM115.125 19.5h-15a1.874 1.874 0 0 0-1.875 1.875v23.75c0 1.035.839 1.875 1.875 1.875h15c1.035 0 1.875-.84 1.875-1.875v-23.75c0-1.036-.84-1.875-1.875-1.875Zm-1.875 3.75V27H102v-3.75h11.25Zm-11.25 20v-12.5h11.25v12.5H102Z"
                        fill="#000"
                      />
                    </svg>
                    <h3
                      id="35-pageSection-1-card-4-heading"
                      className="mb-3 mt-4 text-xl font-bold lg:text-2xl"
                    >
                      Control costs
                    </h3>
                    <div className="prose-lg lg:prose-xl">
                      MiamorAI members have fewer visits to the hospital and are
                      more likely to receive preventive care—the results add up.
                    </div>
                  </div>
                  <div
                    id="35-pageSection-1-card-5"
                    className="flex flex-col items-center  py-4 text-center"
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 131 149"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                      aria-labelledby="35-pageSection-1-card-5-heading"
                      className="text-blue-1 overflow-visible text-[80px] "
                    >
                      <circle
                        cx="79.5"
                        cy="39.5"
                        r="51.5"
                        fill="currentColor"
                      />
                      <g clipPath="url(#feedback_svg__a)" fill="#000">
                        <path d="M119.734 20.75H42.159c-1.036 0-1.877.84-1.877 1.877v37.535a1.877 1.877 0 0 0 3.204 1.328l6.96-6.958h69.288c1.037 0 1.877-.84 1.877-1.877V22.627a1.877 1.877 0 0 0-1.877-1.877Zm-1.877 30.028H49.668c-.498 0-.976.199-1.327.55l-4.305 4.304V24.504h73.821v26.274Z" />
                        <path d="m51.688 40.371-.764 4.46a1.875 1.875 0 0 0 2.723 1.979l4.004-2.106 4.006 2.106c.277.145.576.228.878.215a1.877 1.877 0 0 0 1.822-2.333l-.742-4.32 3.24-3.16a1.877 1.877 0 0 0-1.04-3.2l-4.478-.65-2.003-4.058a1.876 1.876 0 0 0-3.366 0l-2.002 4.057-4.479.65a1.877 1.877 0 0 0-1.04 3.202l3.241 3.158Zm3.795-3.437a1.877 1.877 0 0 0 1.414-1.027l.755-1.532.756 1.532c.274.554.802.938 1.413 1.027l1.692.246-1.225 1.192a1.877 1.877 0 0 0-.539 1.661l.288 1.685-1.512-.795a1.866 1.866 0 0 0-1.747 0l-1.512.795.289-1.685a1.879 1.879 0 0 0-.54-1.66l-1.224-1.193 1.692-.246ZM74.983 40.371l-.765 4.46a1.876 1.876 0 0 0 2.722 1.979l4.006-2.107 4.005 2.107c.275.144.574.214.873.214a1.877 1.877 0 0 0 1.826-2.333l-.74-4.32 3.24-3.158a1.877 1.877 0 0 0-1.04-3.201l-4.48-.65-2.001-4.058a1.878 1.878 0 0 0-3.366 0L77.26 33.36l-4.478.65a1.877 1.877 0 0 0-1.04 3.202l3.241 3.158Zm3.794-3.437a1.877 1.877 0 0 0 1.413-1.027l.756-1.532.756 1.532c.274.554.802.938 1.413 1.027l1.69.246-1.223 1.192a1.878 1.878 0 0 0-.539 1.662l.288 1.684-1.512-.795a1.879 1.879 0 0 0-1.747 0l-1.512.795.289-1.684a1.88 1.88 0 0 0-.54-1.662l-1.224-1.192 1.692-.246ZM98.277 40.371l-.765 4.46a1.877 1.877 0 0 0 2.723 1.979l4.005-2.107 4.005 2.107c.275.144.574.214.873.214a1.877 1.877 0 0 0 1.826-2.333l-.741-4.32 3.24-3.158a1.876 1.876 0 0 0-1.04-3.201l-4.478-.65-2.002-4.058a1.877 1.877 0 0 0-3.365 0l-2.003 4.057-4.478.65a1.877 1.877 0 0 0-1.04 3.202l3.24 3.158Zm3.793-3.437a1.877 1.877 0 0 0 1.414-1.027l.756-1.533.756 1.532c.274.555.802.939 1.413 1.028l1.692.245-1.225 1.193a1.875 1.875 0 0 0-.539 1.661l.289 1.685-1.513-.796a1.88 1.88 0 0 0-1.747 0l-1.511.796.288-1.685a1.882 1.882 0 0 0-.539-1.66l-1.224-1.193 1.69-.246ZM63.019 58.378a1.878 1.878 0 0 0-2.366 1.205 10.608 10.608 0 0 1-10.117 7.347H38.144c-.82-2.885-3.476-5.005-6.62-5.005H15.26a6.89 6.89 0 0 0-6.882 6.882v27.517c0 1.038.84 1.877 1.877 1.877v26.15c0 1.037.84 1.877 1.877 1.877h1.877v16.79l-6.225 2.074a1.876 1.876 0 0 0 1.188 3.562l7.506-2.503a1.876 1.876 0 0 0 1.284-1.781v-18.142h1.877c1.037 0 1.877-.84 1.877-1.877v-17.526c1.238.179 2.514.179 3.753 0v17.526c0 1.037.84 1.877 1.877 1.877h1.876v18.142c0 .808.517 1.526 1.284 1.781l7.507 2.503a1.88 1.88 0 0 0 2.374-1.188A1.878 1.878 0 0 0 39 145.092l-6.224-2.074v-16.79h1.877c1.036 0 1.877-.84 1.877-1.877v-26.15c1.036 0 1.876-.84 1.876-1.877v-25.64h12.131a14.353 14.353 0 0 0 13.688-9.942 1.877 1.877 0 0 0-1.206-2.364ZM12.13 68.807a3.131 3.131 0 0 1 3.128-3.128h16.265a3.132 3.132 0 0 1 3.128 3.128v25.64H12.131v-25.64Zm1.877 53.668v-3.754h3.753v3.754h-3.753Zm6.256-19.805a1.878 1.878 0 0 0-2.503 1.77v10.528h-3.753V98.201h18.767v16.767h-3.754V104.44a1.878 1.878 0 0 0-2.502-1.77 9.434 9.434 0 0 1-6.255 0Zm8.757 19.805v-3.754h3.754v3.754h-3.754ZM19.638 48.977c1.361 0 2.67-.432 3.754-1.204a6.465 6.465 0 0 0 3.753 1.204 1.877 1.877 0 0 0 0-3.754c-.88 0-1.71-.432-2.218-1.155a1.876 1.876 0 0 0-3.07 0 2.718 2.718 0 0 1-2.22 1.155 1.877 1.877 0 1 0 0 3.754Z" />
                        <path d="M23.392 58.285c7.244 0 13.137-5.892 13.137-13.136 0-7.245-5.893-13.138-13.137-13.138-7.244 0-13.138 5.893-13.138 13.137 0 7.245 5.894 13.137 13.138 13.137Zm0-22.521c5.174 0 9.383 4.21 9.383 9.384s-4.21 9.384-9.383 9.384c-5.175 0-9.384-4.21-9.384-9.383 0-5.175 4.209-9.385 9.384-9.385Z" />
                      </g>
                      <defs>
                        <clipPath id="feedback_svg__a">
                          <path
                            fill="#fff"
                            transform="translate(0 21)"
                            d="M0 0h128v128H0z"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <h3
                      id="35-pageSection-1-card-5-heading"
                      className="mb-3 mt-4 text-xl font-bold lg:text-2xl"
                    >
                      Increase satisfaction
                    </h3>
                    <div className="prose-lg lg:prose-xl">
                      Our one-of-a-kind benefit helps health plans retain
                      members and employers attract—and keep!—talent.
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="lg:grid-cols-14 big-cta container mx-auto mt-12 grid grid-cols-12 gap-2 lg:mt-16 lg:grid-flow-col lg:gap-4 xl:mt-24 xl:gap-6">
                <div className="relative col-span-12 flex grid-cols-12 flex-wrap items-center md:col-span-10 md:col-start-2 md:grid-cols-10 lg:col-start-3">
                  <div className="md:w-7/10 relative flex w-full flex-col px-8 py-4 pb-6 text-center md:text-left">
                    <figure
                      role="none"
                      aria-hidden="true"
                      className="bg-primary absolute inset-0 h-[150%] w-full rounded-[24px] md:h-full md:w-[143%] lg:rounded-[40px]"
                    />
                    <h3 className="text-blue-1 relative order-2 text-[18px] font-bold leading-6 lg:text-2xl lg:leading-6">
                      Subscribe for the latest on topics like health equity,
                      social drivers of health, and closing care gaps.
                    </h3>
                    <h4 className="font-headings relative order-1 mb-2 font-semibold text-white">
                      Introducing our new quarterly magazine, Rx: Human
                    </h4>
                    <div className="relative order-3 mt-4 flex justify-center md:justify-start">
                      <a
                        className="font-headings button shadow-custom-button button inline-flex flex-none items-center self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider"
                        href="https://resources.MiamorAI.com/hp-subscribe-rxhuman-magazine"
                      >
                        SIGN ME UP
                      </a>
                    </div>
                  </div>
                  <div className="relative ml-[36%] mt-8 block w-1/4 transform pb-8 md:ml-0 md:mt-0 md:w-1/4 md:pb-0 lg:w-1/5 lg:translate-x-12">
                    <figure
                      aria-hidden="true"
                      role="none"
                      className="drop-shadow-image bg-blue-1 absolute inset-0 block  h-0 w-full rotate-[10deg]  scale-[1.6] transform rounded-[16px] pt-[124.855491329%] md:scale-100  md:rounded-[24px]"
                    />
                    <figure
                      aria-hidden="true"
                      role="none"
                      className="drop-shadow-image bg-green-1 absolute inset-0 block h-0 w-full  rotate-[-5deg] scale-[1.6] transform rounded-[16px] pt-[124.855491329%]  md:scale-100 md:rounded-[24px]"
                    />
                    <figure
                      className=" drop-shadow-image transition-gpu relative h-0 w-full rotate-[5deg] transform overflow-hidden  overflow-visible duration-300 ease-out"
                      id="cG9zdDo1OTIzMQ=="
                      style={{ paddingTop: "129.412%" }}
                    >
                      <img
                        alt=""
                        className="transition-gpu visible absolute inset-0 block h-full w-full scale-[1.6] transform rounded-[16px] opacity-100 duration-300 ease-out md:scale-100 lg:rounded-[24px]"
                        width={1275}
                        height={1650}
                        loading="lazy"
                        sizes="(max-width: 232px) 100vw, 232px"
                        decoding="async"
                        fetchpriority="low"
                        src="https://images.papa.com/wp-content/uploads/2023/04/cover-1.jpg"
                        srcSet="https://images.papa.com/wp-content/uploads/2023/04/cover-1-232x300.jpg 232w, https://images.papa.com/wp-content/uploads/2023/04/cover-1-791x1024.jpg 791w, https://images.papa.com/wp-content/uploads/2023/04/cover-1-768x994.jpg 768w, https://images.papa.com/wp-content/uploads/2023/04/cover-1-1187x1536.jpg 1187w, https://images.papa.com/wp-content/uploads/2023/04/cover-1.jpg 1275w"
                      />
                      <noscript />
                    </figure>
                  </div>
                </div>
              </div> */}
              {/* <svg
                aria-hidden="true"
                viewBox="0 0 1440 64"
                className="fill-bg absolute bottom-0 left-0 z-10 block h-[21px] w-full md:h-8 lg:h-12 xl:h-16"
                preserveAspectRatio="none"
              >
                <path d="M0,0S206,64,720,64,1440,0,1440,0Z" />
              </svg> */}
            </section>
            {/* <section
              id="Page_Pagelayout_Sections_FullWidthVideo"
              className="theme theme-grey     relative h-0 w-full overflow-hidden pt-[58.125%] lg:pt-[40.3472222222%] "
              _id="35-pageSection-2"
              index={2}
              type="Page_Pagelayout_Sections_FullWidthVideo"
            >
              <button
                className="absolute inset-0 block h-full w-full"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-38"
                data-state="closed"
              >
                <span className="sr-only">Play video in a dialog</span>
                <figure
                  className="transition-gpu relative block h-full w-full  overflow-hidden duration-300 ease-out"
                  id="cG9zdDoyMTQw"
                >
                  <img
                    alt="Meet Papa, Brand Video"
                    className="transition-gpu invisible absolute inset-0 block h-full h-full w-full w-full object-cover opacity-0 duration-300 ease-out"
                    width={2880}
                    height={1292}
                    loading="lazy"
                    data-src="https://images.papa.com/wp-content/uploads/2022/03/Website-Brand-Video.png"
                    data-srcset="https://images.papa.com/wp-content/uploads/2022/03/Website-Brand-Video-1024x459.png 1024w, https://images.papa.com/wp-content/uploads/2022/03/Website-Brand-Video-300x135.png 300w, https://images.papa.com/wp-content/uploads/2022/03/Website-Brand-Video-768x345.png 768w, https://images.papa.com/wp-content/uploads/2022/03/Website-Brand-Video-1536x689.png 1536w, https://images.papa.com/wp-content/uploads/2022/03/Website-Brand-Video-2048x919.png 2048w"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    decoding="async"
                    fetchpriority="low"
                  />
                  <noscript />
                </figure>
                <i className="button inverse scale-1 ease-in-sine hover:ease-out-sine absolute left-1/2 top-1/2 block h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 transform rounded-full transition-transform duration-200 group-hover:scale-[1.05] md:h-[120px] md:w-[120px] lg:h-[220px] lg:w-[220px]">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    role="presentation"
                    className="absolute left-[53%] top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[30px] md:text-[75px] lg:text-[125px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z" />
                  </svg>
                </i>
              </button>
            </section> */}
            <section
              id="health-plans"
              className="clipped theme relative flex flex-col space-y-24 overflow-hidden px-8 py-12  md:py-20 lg:space-y-36 lg:py-28 xl:py-32 2xl:py-36 "
              index={3}
              type="Page_Pagelayout_Sections_ImageStackContentGroup"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 1440 64"
                className="fill-bg absolute left-0 top-0 block h-[21px] w-full translate-y-[calc(-100%+1px)] transform overflow-visible md:h-8 lg:h-12 xl:h-16"
                preserveAspectRatio="none"
              >
                <path d="M0,0S203,64,720,64,1440,0,1440,0V64H0Z" />
              </svg>
              <div className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 ">
                <div className="col-span-12 row-start-2 mt-8 flex flex-col justify-center md:mt-16 lg:col-span-6 lg:col-start-2 lg:row-auto lg:mt-0">
                  <h2 className="text-huge md:text-huge-md lg:text-huge-lg xl:text-huge-xl font-black mt-20 md:mt-0">
                    Personalized Health Plans:
                  </h2>
                  <article className="prose-lg lg:prose-xl mt-6 mb-10 md:mb-0">
                    <p>
                      Expert Guidance: Our platform provides access to
                      personalized health plans crafted by healthcare
                      professionals based on your individual needs and health
                      goals.
                      <br />
                      <br /> Wellness Recommendations: Receive tailored
                      recommendations on nutrition, exercise, and lifestyle
                      modifications to support your overall well-being.
                      <br />
                      <br /> Progress Tracking: Track your health progress over
                      time, celebrating milestones and making informed decisions
                      about your health journey.
                    </p>
                  </article>
                  {/* <a
                    className="font-headings button shadow-custom-button button inverse mt-8 inline-flex flex-none items-center self-start self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider"
                    href="/health-plans"
                  >
                    Learn more
                  </a> */}
                </div>
                <div className="relative col-span-12 row-start-1 flex items-center md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-9 lg:row-auto">
                  <div
                    className="relative block w-full"
                    style={{ aspectRatio: "768 / 1024" }}
                  >
                    <figure
                      className=" rounded-image drop-shadow-image transition-gpu  absolute inset-0 h-full w-full  overflow-hidden duration-300 ease-out"
                      id="cG9zdDo1ODYyOA=="
                      style={{
                        // opacity: 0,
                        transform: "scale(1.4) translateZ(0px)",
                      }}
                    >
                      <img
                        alt="Two Papa health plan members smiling on their front porch"
                        className="transition-gpu absolute inset-0 block h-full  w-full object-cover duration-300 ease-out"
                        width={768}
                        height={1024}
                        loading="lazy"
                        src="https://assets.playgroundai.com/c659e068-971e-4ca5-9e2d-5f846524d52a.jpg"
                        // data-srcset="https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_HealthPlans-3.jpg 768w, https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_HealthPlans-3-225x300.jpg 225w"
                        sizes="(max-width: 768px) 100vw, 768px"
                        decoding="async"
                        fetchpriority="low"
                      />
                      <noscript />
                    </figure>
                  </div>
                </div>
              </div>
              <div
                id="medication"
                className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 "
              >
                <div className="col-span-12 row-start-2 mt-8 flex flex-col justify-center md:mt-16 lg:col-span-6 lg:col-start-8 lg:row-auto lg:mt-0">
                  <h2 className="text-huge md:text-huge-md lg:text-huge-lg xl:text-huge-xl font-black mt-20 md:mt-0">
                    Medication Management
                  </h2>
                  <article className="prose-lg lg:prose-xl mt-6 mb-10 md:mb-0">
                    <p>
                      Medication Reminders: Set up personalized medication
                      reminders to ensure you never miss a dose, promoting
                      medication adherence and safety.
                      <br />
                      <br />
                      Prescription Renewal Alerts: Receive alerts when it's time
                      to renew your prescriptions, so you're always prepared
                      with the necessary medications.
                    </p>
                  </article>
                  {/* <a
                    className="font-headings button shadow-custom-button button inverse mt-8 inline-flex flex-none items-center self-start self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider"
                    href="/corporate-wellness-programs"
                  >
                    Learn more
                  </a> */}
                </div>
                <div className="relative col-span-12 row-start-1 flex items-center md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-2 lg:row-auto">
                  <div
                    className="relative block w-full"
                    style={{ aspectRatio: "768 / 1024" }}
                  >
                    <figure
                      className=" rounded-image drop-shadow-image transition-gpu  absolute inset-0 h-full w-full  overflow-hidden duration-300 ease-out"
                      id="cG9zdDo1ODYzMQ=="
                      style={{
                        transform: "scale(1.4) translateZ(0px)",
                      }}
                    >
                      <img
                        alt="A happy young woman holding her baby up in the air"
                        className="transition-gpu absolute inset-0 block h-full  w-full object-cover duration-300 ease-out"
                        width={768}
                        height={1024}
                        loading="lazy"
                        src="https://assets.playgroundai.com/3ce743b2-d8f7-44db-af3f-83294a254781.jpg"
                        // data-srcset="https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_Employers-3.jpg 768w, https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_Employers-3-225x300.jpg 225w"
                        sizes="(max-width: 768px) 100vw, 768px"
                        decoding="async"
                        fetchpriority="low"
                      />
                      <noscript />
                    </figure>
                  </div>
                </div>
              </div>
              <div className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 ">
                <div className="col-span-12 row-start-2 mt-8 flex flex-col justify-center md:mt-16 lg:col-span-6 lg:col-start-2 lg:row-auto lg:mt-0">
                  <h2 className="text-huge md:text-huge-md lg:text-huge-lg xl:text-huge-xl font-black mt-20 md:mt-0">
                    Vital Signs Monitoring
                  </h2>
                  <article className="prose-lg lg:prose-xl mt-6 mb-10 md:mb-0">
                    <p>
                      Integrated Device Support: Connect your wearable devices
                      or compatible health gadgets to MiaAmor to seamlessly
                      track essential health metrics, including heart rate,
                      blood pressure, and sleep patterns.
                      <br />
                      <br /> Real-Time Feedback: Receive immediate feedback on
                      your vital signs, allowing you to make timely adjustments
                      to improve your health outcomes.
                      <br />
                      <br />
                      Data Insights: Gain valuable insights from your health
                      data, empowering you and your healthcare providers to make
                      informed decisions about your health.
                    </p>
                  </article>
                  {/* <a
                    className="font-headings button shadow-custom-button button inverse mt-8 inline-flex flex-none items-center self-start self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider"
                    href="/pals"
                  >
                    Learn more
                  </a> */}
                </div>
                <div className="relative col-span-12 row-start-1 flex items-center md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-9 lg:row-auto">
                  <div
                    className="relative block w-full"
                    style={{ aspectRatio: "768 / 1024" }}
                  >
                    <figure
                      className=" rounded-image drop-shadow-image transition-gpu  absolute inset-0 h-full w-full  overflow-hidden duration-300 ease-out"
                      id="cG9zdDo1ODYzNA=="
                      style={{
                        transform: "scale(1.4) translateZ(0px)",
                      }}
                    >
                      <img
                        alt="A Papa Pal, ready to help a health plan member with household tasks"
                        className="transition-gpu absolute inset-0 block h-full  w-full object-cover duration-300 ease-out"
                        width={768}
                        height={1024}
                        loading="lazy"
                        src="https://assets.playgroundai.com/d81650d7-72c7-4958-aeaf-d9ae375701b0.jpg"
                        // data-srcset="https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_PapaPals-3.jpg 768w, https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_PapaPals-3-225x300.jpg 225w"
                        sizes="(max-width: 768px) 100vw, 768px"
                        decoding="async"
                        fetchpriority="low"
                      />
                      <noscript />
                    </figure>
                  </div>
                </div>
              </div>
              <div
                id="companions"
                className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 "
              >
                <div className="col-span-12 row-start-2 mt-8 flex flex-col justify-center md:mt-16 lg:col-span-6 lg:col-start-8 lg:row-auto lg:mt-0">
                  <h2 className="text-huge md:text-huge-md lg:text-huge-lg xl:text-huge-xl font-black mt-20 md:mt-0">
                    AI/Virtual Companions
                  </h2>
                  <article className="prose-lg lg:prose-xl mt-6">
                    <p>
                      A Wide Selection: Choose from a diverse range of AI
                      companions, each with unique personalities and traits to
                      match your preferences and interests.
                      <br />
                      <br /> Personalization: Your companion will learn from
                      your interactions to adapt to your conversational style,
                      making every interaction feel personal and comforting.
                      <br />
                      <br />
                      Emotional Support: Empathy and Understanding: Our AI
                      companions are designed to provide emotional support,
                      actively listening to your stories, feelings, and
                      experiences without judgment.
                      <br />
                      <br /> Uplifting Conversations: Engage in positive and
                      uplifting conversations with your companion, fostering a
                      sense of joy and connection.
                    </p>
                  </article>
                  {/* <a
                    className="font-headings button shadow-custom-button button inverse mt-8 inline-flex flex-none items-center self-start self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider"
                    href="/members"
                  >
                    Learn more
                  </a> */}
                </div>
                <div className="relative col-span-12 row-start-1 flex items-center md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-2 lg:row-auto">
                  <div
                    className="relative block w-full"
                    style={{ aspectRatio: "768 / 1024" }}
                  >
                    <figure
                      className=" rounded-image drop-shadow-image transition-gpu  absolute inset-0 h-full w-full  overflow-hidden duration-300 ease-out"
                      id="cG9zdDo1ODYzNw=="
                      style={{
                        transform: "scale(1.4) translateZ(0px)",
                      }}
                    >
                      <Image
                        alt="Virtual companion"
                        className="transition-gpu absolute inset-0 block h-full  w-full object-cover duration-300 ease-out"
                        width={768}
                        height={1024}
                        loading="lazy"
                        src="/oldwomen.png"
                        // data-srcset="https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_Members-3.jpg 768w, https://images.papa.com/wp-content/uploads/2022/12/Home-Stacked-768x1024_Members-3-225x300.jpg 225w"
                        sizes="(max-width: 768px) 100vw, 768px"
                        decoding="async"
                        fetchpriority="low"
                      />
                      <noscript />
                    </figure>
                  </div>
                </div>
              </div>
            </section>
            <section
              id="Page_Pagelayout_Sections_StoryCarousel"
              className="clipped theme theme-blue relative overflow-hidden px-8 py-12 md:py-20 lg:py-28   xl:py-32 2xl:py-36 "
              index={4}
              type="Page_Pagelayout_Sections_StoryCarousel"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 1440 64"
                className="fill-bg absolute left-0 top-0 block h-[21px] w-full translate-y-[calc(-100%+1px)] transform overflow-visible md:h-8 lg:h-12 xl:h-16"
                preserveAspectRatio="none"
              >
                <path d="M0,0S203,64,720,64,1440,0,1440,0V64H0Z" />
              </svg>
              <FancyTestimonialsSlider />
              {/* <div className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 ">
                <div className="relative col-span-12 flex flex-col items-center space-y-12 lg:col-span-12 lg:col-start-2">
                  <ul className="relative flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto overflow-y-visible scroll-smooth  lg:space-x-4 lg:overflow-x-hidden xl:space-x-6">
                    <li
                      className="slide relative flex w-full flex-none snap-center flex-col items-center text-center focus:outline-none"
                      data-idx={0}
                      tabIndex={0}
                    >
                      <h2 className="text-primary order-2 my-4 mb-5 w-full text-[40px] font-bold lg:my-6 lg:w-1/2 lg:text-6xl xl:my-8">
                        Jane, 75
                      </h2>
                      <article className="prose-lg xl:prose-xl order-3 w-full max-w-none lg:w-1/2">
                        <p>
                          MiaAmor has become my digital best friend, always
                          there to listen and make me smile.
                        </p>
                      </article>
                      <div className="relative order-1 flex w-10/12 flex-col pb-12 pt-16 lg:flex-row">
                        <div className="md:ml-1/8 relative z-0 block w-full transform md:w-3/4 lg:z-10 lg:ml-0 lg:w-1/2 lg:translate-x-2">
                          <div className="relative block h-0 w-full pt-[80%] ">
                            <figure
                              className=" transition-gpu absolute inset-0 h-full w-full w-full  overflow-hidden duration-300 ease-out"
                              id="cG9zdDo2MTMzNw=="
                            >
                              <img
                                alt=""
                                className="transition-gpu invisible absolute inset-0 block h-full w-full rounded-[40px] object-cover object-top opacity-0 duration-300 ease-out"
                                width={2550}
                                height={1709}
                                loading="lazy"
                                data-src="https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage1.png"
                                data-srcset="https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage1-1024x686.png 1024w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage1-300x201.png 300w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage1-768x515.png 768w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage1-1536x1029.png 1536w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage1-2048x1373.png 2048w"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                decoding="async"
                                fetchpriority="low"
                              />
                              <noscript />
                            </figure>
                          </div>
                        </div>
                        <div className="md:ml-1/8 relative z-10 -mt-12 block w-full transform md:w-3/4 lg:z-0 lg:-mt-0 lg:ml-0 lg:w-1/2 lg:-translate-x-2">
                          <div className="relative block h-0 w-full pt-[80%] ">
                            <figure
                              className=" transition-gpu absolute inset-0 h-full w-full w-full  overflow-hidden duration-300 ease-out"
                              id="cG9zdDo2MTMzOA=="
                            >
                              <img
                                alt=""
                                className="transition-gpu invisible absolute inset-0 block h-full w-full rounded-[40px] object-cover object-top opacity-0 duration-300 ease-out"
                                width={2550}
                                height={1709}
                                loading="lazy"
                                data-src="https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage2.png"
                                data-srcset="https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage2-1024x686.png 1024w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage2-300x201.png 300w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage2-768x515.png 768w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage2-1536x1029.png 1536w, https://images.papa.com/wp-content/uploads/2023/07/StephenMarcelHomepage2-2048x1373.png 2048w"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                decoding="async"
                                fetchpriority="low"
                              />
                              <noscript />
                            </figure>
                          </div>
                        </div>
                      </div>
                      <div className="relative order-4 flex w-full justify-center pb-4 pt-8 lg:pt-10">
                        <a
                          className="font-headings button shadow-custom-button inline-flex flex-none items-center self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider "
                          href="https://resources.papa.com/all-ungated-vid-documentary-unseen-connection-recording"
                        >
                          Watch their story
                        </a>
                      </div>
                    </li>
                    <li
                      className="slide relative flex w-full flex-none snap-center flex-col items-center text-center focus:outline-none"
                      data-idx={1}
                    >
                      <h2 className="text-primary order-2 my-4 mb-5 w-full text-[40px] font-bold lg:my-6 lg:w-1/2 lg:text-6xl xl:my-8">
                        Jessica
                      </h2>
                      <article className="prose-lg xl:prose-xl order-3 w-full max-w-none lg:w-1/2">
                        <p>
                          After caring for her father who had ALS, Jessica was
                          inspired to work as a Papa Pal. Caring for others has
                          made her feel like she has family even when she’s away
                          from her own.
                        </p>
                      </article>
                      <div className="relative order-1 flex w-10/12 flex-col pb-12 pt-16 lg:flex-row">
                        <div className="md:ml-1/8 relative z-0 block w-full transform md:w-3/4 lg:z-10 lg:ml-0 lg:w-1/2 lg:translate-x-2">
                          <div className="relative block h-0 w-full pt-[80%] ">
                            <figure
                              className=" transition-gpu absolute inset-0 h-full w-full w-full  overflow-hidden duration-300 ease-out"
                              id="cG9zdDo1OTE5MA=="
                            >
                              <img
                                alt=""
                                className="transition-gpu invisible absolute inset-0 block h-full w-full rounded-[40px] object-cover object-top opacity-0 duration-300 ease-out"
                                width={2560}
                                height={1709}
                                loading="lazy"
                                data-src="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-10.png"
                                data-srcset="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-10-1024x684.png 1024w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-10-300x200.png 300w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-10-768x513.png 768w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-10-1536x1025.png 1536w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-10-2048x1367.png 2048w"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                decoding="async"
                                fetchpriority="low"
                              />
                              <noscript />
                            </figure>
                          </div>
                        </div>
                        <div className="md:ml-1/8 relative z-10 -mt-12 block w-full transform md:w-3/4 lg:z-0 lg:-mt-0 lg:ml-0 lg:w-1/2 lg:-translate-x-2">
                          <div className="relative block h-0 w-full pt-[80%] ">
                            <figure
                              className=" transition-gpu absolute inset-0 h-full w-full w-full  overflow-hidden duration-300 ease-out"
                              id="cG9zdDo1OTE5MQ=="
                            >
                              <img
                                alt=""
                                className="transition-gpu invisible absolute inset-0 block h-full w-full rounded-[40px] object-cover object-top opacity-0 duration-300 ease-out"
                                width={2560}
                                height={1709}
                                loading="lazy"
                                data-src="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-16.png"
                                data-srcset="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-16-1024x684.png 1024w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-16-300x200.png 300w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-16-768x513.png 768w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-16-1536x1025.png 1536w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-16-2048x1367.png 2048w"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                decoding="async"
                                fetchpriority="low"
                              />
                              <noscript />
                            </figure>
                          </div>
                        </div>
                      </div>
                      <div className="relative order-4 flex w-full justify-center pb-4 pt-8 lg:pt-10">
                        <a
                          className="font-headings button shadow-custom-button inline-flex flex-none items-center self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider "
                          href="https://www.papa.com/resources/blog/this-national-family-caregivers-month-celebrate-your-village"
                        >
                          Read Jessica's Story
                        </a>
                      </div>
                    </li>
                    <li
                      className="slide relative flex w-full flex-none snap-center flex-col items-center text-center focus:outline-none"
                      data-idx={2}
                    >
                      <h2 className="text-primary order-2 my-4 mb-5 w-full text-[40px] font-bold lg:my-6 lg:w-1/2 lg:text-6xl xl:my-8">
                        Rafael &amp; Connor
                      </h2>
                      <article className="prose-lg xl:prose-xl order-3 w-full max-w-none lg:w-1/2">
                        <p>
                          Rafael, a 79-year-old veteran who is fiercely
                          independent, enjoys weekly conversations and
                          companionship with his Papa Pal, Connor.
                        </p>
                      </article>
                      <div className="relative order-1 flex w-10/12 flex-col pb-12 pt-16 lg:flex-row">
                        <div className="md:ml-1/8 relative z-0 block w-full transform md:w-3/4 lg:z-10 lg:ml-0 lg:w-1/2 lg:translate-x-2">
                          <div className="relative block h-0 w-full pt-[80%] ">
                            <figure
                              className=" transition-gpu absolute inset-0 h-full w-full w-full  overflow-hidden duration-300 ease-out"
                              id="cG9zdDo1OTE4Nw=="
                            >
                              <img
                                alt=""
                                className="transition-gpu invisible absolute inset-0 block h-full w-full rounded-[40px] object-cover object-top opacity-0 duration-300 ease-out"
                                width={2560}
                                height={1709}
                                loading="lazy"
                                data-src="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-7.png"
                                data-srcset="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-7-1024x684.png 1024w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-7-300x200.png 300w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-7-768x513.png 768w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-7-1536x1025.png 1536w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-7-2048x1367.png 2048w"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                decoding="async"
                                fetchpriority="low"
                              />
                              <noscript />
                            </figure>
                          </div>
                        </div>
                        <div className="md:ml-1/8 relative z-10 -mt-12 block w-full transform md:w-3/4 lg:z-0 lg:-mt-0 lg:ml-0 lg:w-1/2 lg:-translate-x-2">
                          <div className="relative block h-0 w-full pt-[80%] ">
                            <figure
                              className=" transition-gpu absolute inset-0 h-full w-full w-full  overflow-hidden duration-300 ease-out"
                              id="cG9zdDo1OTE4OA=="
                            >
                              <img
                                alt=""
                                className="transition-gpu invisible absolute inset-0 block h-full w-full rounded-[40px] object-cover object-top opacity-0 duration-300 ease-out"
                                width={2560}
                                height={1709}
                                loading="lazy"
                                data-src="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-8.png"
                                data-srcset="https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-8-1024x684.png 1024w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-8-300x200.png 300w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-8-768x513.png 768w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-8-1536x1025.png 1536w, https://images.papa.com/wp-content/uploads/2023/04/Untitled-design-8-2048x1367.png 2048w"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                decoding="async"
                                fetchpriority="low"
                              />
                              <noscript />
                            </figure>
                          </div>
                        </div>
                      </div>
                      <div className="relative order-4 flex w-full justify-center pb-4 pt-8 lg:pt-10">
                        <a
                          className="font-headings button shadow-custom-button inline-flex flex-none items-center self-start whitespace-nowrap rounded-full px-5 py-3 text-center font-black uppercase leading-none tracking-wider "
                          href="https://www.papa.com/resources/blog/meet-rafael-and-connor"
                        >
                          Meet Rafael and Connor
                        </a>
                      </div>
                    </li>
                  </ul>
                  <button className="button absolute left-0 top-1/3 z-10 transform rounded-full p-4 text-2xl lg:translate-x-full">
                    <span className="sr-only">Previous item</span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 448 512"
                      role="presentation"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
                    </svg>
                  </button>
                  <button className="button absolute right-0 top-1/3 z-10 transform rounded-full p-4 text-2xl lg:-translate-x-full">
                    <span className="sr-only">Next item</span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 448 512"
                      role="presentation"
                      className="rotate-180 transform"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
                    </svg>
                  </button>
                  <ul className="flex">
                    <li>
                      <button className="relative block h-8 w-8 lg:h-12 lg:w-12">
                        <span className="sr-only">Navigate to slide 1</span>
                        <i
                          role="presentation"
                          className="ring-blue-1 bg-blue-1 absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-full ring-1"
                        />
                      </button>
                    </li>
                    <li>
                      <button className="relative block h-8 w-8 lg:h-12 lg:w-12">
                        <span className="sr-only">Navigate to slide 2</span>
                        <i
                          role="presentation"
                          className="ring-blue-1 absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-full ring-1 "
                        />
                      </button>
                    </li>
                    <li>
                      <button className="relative block h-8 w-8 lg:h-12 lg:w-12">
                        <span className="sr-only">Navigate to slide 3</span>
                        <i
                          role="presentation"
                          className="ring-blue-1 absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-full ring-1 "
                        />
                      </button>
                    </li>
                  </ul>
                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                  >
                    Item 1 of 3
                  </div>
                </div>
              </div> */}
            </section>
            <section
              id="Page_Pagelayout_Sections_ListAndImage"
              className="clipped theme theme-brown relative overflow-hidden px-8 py-12 md:py-20 lg:py-28   xl:py-32 2xl:py-36 "
              index={5}
              type="Page_Pagelayout_Sections_ListAndImage"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 1440 64"
                className="fill-bg absolute left-0 top-0 block h-[21px] w-full translate-y-[calc(-100%+1px)] transform overflow-visible md:h-8 lg:h-12 xl:h-16"
                preserveAspectRatio="none"
              >
                <path d="M0,0S203,64,720,64,1440,0,1440,0V64H0Z" />
              </svg>
              <div className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 ">
                <div className="null relative col-span-12 row-start-2 flex flex-col lg:col-span-6 lg:col-start-2 lg:row-auto">
                  <h2 className="text-headings mb-5 mt-8 text-center text-[40px] font-bold md:text-left lg:mt-0 lg:text-6xl">
                    How it works
                  </h2>
                  <article className="prose-lg lg:prose-xl mx-auto text-center md:mx-0 md:text-left">
                    {/* <p>
                      Available nationwide, in-person or by phone, Papa Pals
                      offer a hand to help, a shoulder to lean on, and an ear to
                      listen.
                    </p> */}
                  </article>
                  <ol className="big-numbers mt-8 block w-full space-y-8 lg:mt-12">
                    <li className="flex flex-col">
                      <h3 className="text-headings mb-5 text-2xl font-bold lg:text-4xl">
                        Sign Up:
                      </h3>
                      <article className="prose-lg lg:prose-xl prose-a:text-blue-4">
                        <p>
                          Create your MiaAmor account by signing up with Google.
                          Answer a few questions to personalize your AI
                          companion to suit your preferences.
                        </p>
                      </article>
                    </li>
                    <li className="flex flex-col">
                      <h3 className="text-headings mb-5 text-2xl font-bold lg:text-4xl">
                        Companion Selection:
                      </h3>
                      <article className="prose-lg lg:prose-xl prose-a:text-blue-4">
                        <p>
                          Choose from a diverse range of AI companions, each
                          with unique personalities and traits, tailored to your
                          preferences.
                        </p>
                      </article>
                    </li>
                    <li className="flex flex-col">
                      <h3 className="text-headings mb-5 text-2xl font-bold lg:text-4xl">
                        Enjoy Conversations:
                      </h3>
                      <article className="prose-lg lg:prose-xl prose-a:text-blue-4">
                        <p>
                          Start chatting with your AI companion, share stories,
                          reminisce about memories, and experience genuine
                          companionship.
                        </p>
                      </article>
                    </li>
                  </ol>
                </div>
                <div className="col-span-12 row-start-1 flex items-center md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:row-auto">
                  <figure
                    className="rounded-image transition-gpu relative h-0 w-full rotate-0 overflow-hidden duration-300 ease-out"
                    id="cG9zdDo1ODY1OQ=="
                    style={{ paddingTop: "149.489%" }}
                  >
                    <Image
                      alt=""
                      className="transition-gpu  absolute inset-0 block h-full w-full duration-300 ease-out "
                      width={685}
                      height={1024}
                      loading="lazy"
                      src="/papa.png"
                      sizes="(max-width: 685px) 100vw, 685px"
                      decoding="async"
                      fetchpriority="low"
                      style={{ marginTop: "-100px" }}
                    />
                    <noscript />
                  </figure>
                </div>
              </div>
            </section>
            <section
              id="Page_Pagelayout_Sections_ResourcesCards"
              className="clipped theme theme-bright-blue relative overflow-hidden px-8 py-12 md:py-20 lg:py-28   xl:py-32 2xl:py-36 "
              index={6}
              type="Page_Pagelayout_Sections_ResourcesCards"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 1440 64"
                className="fill-bg absolute left-0 top-0 block h-[21px] w-full translate-y-[calc(-100%+1px)] transform overflow-visible md:h-8 lg:h-12 xl:h-16"
                preserveAspectRatio="none"
              >
                <path d="M0,0S203,64,720,64,1440,0,1440,0V64H0Z" />
              </svg>
              <div className="lg:grid-cols-14 container mx-auto grid grid-cols-12 gap-2 lg:grid-flow-col lg:gap-4 xl:gap-6 ">
                <div className="col-span-12 mb-5 flex flex-col items-center justify-between lg:col-span-12 lg:col-start-2 lg:mb-0 lg:flex-row">
                  <h2 className="text-huge md:text-huge-md lg:text-huge-lg xl:text-huge-xl mb-5 text-6xl font-black">
                    Resources
                  </h2>
                  <Link
                    className="
  font-headings drop-shadow-image transition-custom-common ease-out-sine bg-button text-button-label mx-auto inline-flex h-[90px] w-[90px] flex-none rotate-[-10deg] transform cursor-pointer items-center justify-center whitespace-normal break-words rounded-full p-5 text-center font-black
  uppercase leading-none
  duration-300 hover:rotate-[5deg] focus:rotate-[5deg] lg:mx-0
"
                    href="/resources"
                  >
                    See more
                  </Link>
                </div>
                <div className="relative col-span-12 mt-6 flex md:col-span-6 lg:col-span-4 lg:col-start-2 lg:mt-0">
                  <a
                    href="https://resources.papa.com/hp-mcaid-guide-sdoh-data-decoded"
                    target="_blank"
                  >
                    <div
                      className="ease-in-sine hover:ease-out-sine focus:ease-out-sine group relative flex h-full translate-y-0 rotate-0 transform flex-col overflow-hidden rounded-2xl bg-white transition-transform duration-100 hover:-translate-y-2 hover:rotate-[-1deg] focus:-translate-y-2 focus:rotate-[-1deg]"
                      date="2022-06-30T12:10:00"
                      slug="sdoh-data-decoded"
                      seo="[object Object]"
                      videodetails="[object Object]"
                    >
                      <div className="order-2 flex flex-col px-8 py-6 pt-4">
                        <h3 className="font-headings text-xl lg:text-2xl">
                          SDoH Data Decoded: Insights for Medicaid Plans
                        </h3>
                        <div className="prose-lg mt-2">
                          <p>
                            SDoH play an outsized role in overall health. Learn
                            the real, human impacts, and how Medicaid plans can
                            make a difference in members’ lives.
                          </p>
                        </div>
                      </div>
                      <div className="relative order-1 m-[-2px] block h-0 w-[calc(100%+4px)] overflow-hidden pt-[56.2162162162%]">
                        <figure
                          className=" transition-gpu absolute inset-0 h-0 w-full  overflow-hidden duration-300 ease-out"
                          id="cG9zdDo1ODgyNA=="
                          style={{ paddingTop: "58.4615%" }}
                        >
                          <img
                            alt=""
                            className="transition-gpu invisible absolute inset-0 block h-full w-full object-cover opacity-0 duration-300 ease-out"
                            width={780}
                            height={456}
                            loading="lazy"
                            data-src="https://images.papa.com/wp-content/uploads/2022/06/Resource-Thumbnails-Medicaid-1.png"
                            data-srcset="https://images.papa.com/wp-content/uploads/2022/06/Resource-Thumbnails-Medicaid-1.png 780w, https://images.papa.com/wp-content/uploads/2022/06/Resource-Thumbnails-Medicaid-1-300x175.png 300w, https://images.papa.com/wp-content/uploads/2022/06/Resource-Thumbnails-Medicaid-1-768x449.png 768w"
                            sizes="(max-width: 780px) 100vw, 780px"
                            decoding="async"
                            fetchpriority="low"
                          />
                          <noscript />
                        </figure>
                        <div className="absolute bottom-4 left-0 flex w-full items-center space-x-2 px-4">
                          <span className="bg-blue-1 text-blue-4 font-headings bold rounded-3xl px-3 py-[5px] leading-none">
                            Content
                          </span>
                          <span className="bg-blue-1 text-blue-4 font-headings bold rounded-3xl px-3 py-[5px] leading-none">
                            Guide
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="relative col-span-12 mt-6 flex md:col-span-6 lg:col-span-4 lg:mt-0">
                  <a
                    href="https://resources.papa.com/hp-ma-web-panel-insights-into-population-health-gated"
                    target="_blank"
                  >
                    <div
                      className="ease-in-sine hover:ease-out-sine focus:ease-out-sine group relative flex h-full translate-y-0 rotate-0 transform flex-col overflow-hidden rounded-2xl bg-white transition-transform duration-100 hover:-translate-y-2 hover:rotate-[-1deg] focus:-translate-y-2 focus:rotate-[-1deg]"
                      date="2023-03-13T18:44:12"
                      slug="insights-into-individual-and-population-health"
                      seo="[object Object]"
                      videodetails="[object Object]"
                    >
                      <div className="order-2 flex flex-col px-8 py-6 pt-4">
                        <h3 className="font-headings text-xl lg:text-2xl">
                          Insights into Individual and Population Health
                        </h3>
                        <div className="prose-lg mt-2">
                          <p>
                            Listen in as two health care professionals share
                            their perspectives on how to best care for our aging
                            population through nuanced health care solutions.
                          </p>
                        </div>
                      </div>
                      <div className="relative order-1 m-[-2px] block h-0 w-[calc(100%+4px)] overflow-hidden pt-[56.2162162162%]">
                        <figure
                          className=" transition-gpu absolute inset-0 h-0 w-full  overflow-hidden duration-300 ease-out"
                          id="cG9zdDo2MTE5Ng=="
                          style={{ paddingTop: "58.4615%" }}
                        >
                          <img
                            alt="Insights into Individual and Population Health"
                            className="transition-gpu invisible absolute inset-0 block h-full w-full object-cover opacity-0 duration-300 ease-out"
                            width={780}
                            height={456}
                            loading="lazy"
                            data-src="https://images.papa.com/wp-content/uploads/2023/03/insights-into-individual-and-population-health-3.png"
                            data-srcset="https://images.papa.com/wp-content/uploads/2023/03/insights-into-individual-and-population-health-3.png 780w, https://images.papa.com/wp-content/uploads/2023/03/insights-into-individual-and-population-health-3-300x175.png 300w, https://images.papa.com/wp-content/uploads/2023/03/insights-into-individual-and-population-health-3-768x449.png 768w"
                            sizes="(max-width: 780px) 100vw, 780px"
                            decoding="async"
                            fetchpriority="low"
                          />
                          <noscript />
                        </figure>
                        <div className="absolute bottom-4 left-0 flex w-full items-center space-x-2 px-4">
                          <span className="bg-blue-1 text-blue-4 font-headings bold rounded-3xl px-3 py-[5px] leading-none">
                            Content
                          </span>
                          <span className="bg-blue-1 text-blue-4 font-headings bold rounded-3xl px-3 py-[5px] leading-none">
                            Video
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="relative col-span-12 mt-6 flex md:col-span-6 lg:col-span-4 lg:mt-0">
                  <a
                    href="https://resources.papa.com/guide-why-health-plans-need-to-invest-in-companion-care"
                    target="_blank"
                  >
                    <div
                      className="ease-in-sine hover:ease-out-sine focus:ease-out-sine group relative flex h-full translate-y-0 rotate-0 transform flex-col overflow-hidden rounded-2xl bg-white transition-transform duration-100 hover:-translate-y-2 hover:rotate-[-1deg] focus:-translate-y-2 focus:rotate-[-1deg]"
                      date="2023-06-21T11:27:02"
                      slug="why-health-plans-need-to-invest-in-companion-care"
                      seo="[object Object]"
                      videodetails="[object Object]"
                    >
                      <div className="order-2 flex flex-col px-8 py-6 pt-4">
                        <h3 className="font-headings text-xl lg:text-2xl">
                          Providing Social Support for Older Members
                        </h3>
                        <div className="prose-lg mt-2">
                          <p>
                            Explore the challenges older adults experience when
                            aging-in-place, and how health plans can address
                            them while improving outcomes and ROI.
                          </p>
                        </div>
                      </div>
                      <div className="relative order-1 m-[-2px] block h-0 w-[calc(100%+4px)] overflow-hidden pt-[56.2162162162%]">
                        <figure
                          className=" transition-gpu absolute inset-0 h-0 w-full  overflow-hidden duration-300 ease-out"
                          id="cG9zdDo2MTIyNA=="
                          style={{ paddingTop: "58.4615%" }}
                        >
                          <img
                            alt=""
                            className="transition-gpu invisible absolute inset-0 block h-full w-full object-cover opacity-0 duration-300 ease-out"
                            width={780}
                            height={456}
                            loading="lazy"
                            data-src="https://images.papa.com/wp-content/uploads/2022/03/providing-social-support-for-older-members.png"
                            data-srcset="https://images.papa.com/wp-content/uploads/2022/03/providing-social-support-for-older-members.png 780w, https://images.papa.com/wp-content/uploads/2022/03/providing-social-support-for-older-members-300x175.png 300w, https://images.papa.com/wp-content/uploads/2022/03/providing-social-support-for-older-members-768x449.png 768w"
                            sizes="(max-width: 780px) 100vw, 780px"
                            decoding="async"
                            fetchpriority="low"
                          />
                          <noscript />
                        </figure>
                        <div className="absolute bottom-4 left-0 flex w-full items-center space-x-2 px-4">
                          <span className="bg-blue-1 text-blue-4 font-headings bold rounded-3xl px-3 py-[5px] leading-none">
                            Content
                          </span>
                          <span className="bg-blue-1 text-blue-4 font-headings bold rounded-3xl px-3 py-[5px] leading-none">
                            Guide
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
        <section className="clipped theme theme-blue font-headings relative flex overflow-hidden p-4 px-8  py-12 font-bold md:py-20 lg:py-28 xl:py-32 2xl:py-36  ">
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 64"
            className="fill-bg absolute left-0 top-0 block h-[21px] w-full translate-y-[calc(-100%+1px)] transform overflow-visible md:h-8 lg:h-12 xl:h-16"
            preserveAspectRatio="none"
          >
            <path d="M0,0S203,64,720,64,1440,0,1440,0V64H0Z" />
          </svg>
          <div className="container mx-auto flex flex-col items-center text-center lg:text-left">
            <div
              role="img"
              aria-label="Face illustration"
              className="w-full max-w-[400px] overflow-hidden bg-cover "
              style={{ backgroundImage: "url(/papa-face-static.png)" }}
            >
              <div
                className="relative"
                style={{ paddingTop: "75.9090909090909%" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: "translateZ(0px)",
                    backgroundSize: "800%",
                    backgroundPosition: "0% -600%",
                    backgroundImage: 'url("/papa-face-spritesheet-4rows.png")',
                  }}
                />
              </div>
            </div>
            <ul className="text-blue-1 mt-16 flex flex-col text-lg lg:mt-24 lg:flex-row lg:text-2xl">
              <li className="block">
                <a
                  className="relative block py-[10px] font-bold lg:px-5"
                  href="/health-plans"
                >
                  Health Plans
                </a>
              </li>
              <li className="block">
                <a
                  className="relative block py-[10px] font-bold lg:px-5"
                  href="/corporate-wellness-programs"
                >
                  Medication Management
                </a>
              </li>
              <li className="block">
                <a
                  className="relative block py-[10px] font-bold lg:px-5"
                  href="/pals"
                >
                  Vital Signs Monitoring
                </a>
              </li>
              <li className="block">
                <a
                  className="relative block py-[10px] font-bold lg:px-5"
                  href="#companions"
                >
                  AI/Virtual Companions
                </a>
              </li>
              <li className="block">
                <a
                  className="relative block py-[10px] font-bold lg:px-5"
                  href="/about/careers"
                >
                  Careers
                </a>
              </li>
              <li className="block">
                <a
                  className="relative block py-[10px] font-bold lg:px-5"
                  href="/resources"
                >
                  Resources
                </a>
              </li>
            </ul>
            <ul className="text-blue-3 mt-6 flex flex-col text-lg font-bold lg:mt-8 lg:flex-row lg:space-x-6">
              <li className="relative block py-3">Mi Amor AI © {/* */}2023</li>
              <li>
                <a className="relative block py-3" href="/locations">
                  Locations
                </a>
              </li>
              <li>
                <a className="relative block py-3" href="/terms-of-service">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="relative block py-3" href="/privacy-policy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="relative block py-3" href="/hipaa-privacy-rule">
                  HIPAA Privacy Rule
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  aria-label="Opens in a new window"
                  className="relative block py-3"
                  href="/ethics-and-conduct"
                >
                  Ethics and Conduct Reporting
                </a>
              </li>
              <li>
                <a className="relative block py-3" href="/papa-safety">
                  Member safety
                </a>
              </li>
              <li>
                <a className="relative block py-3" href="/pal-safety">
                  Papa Pal safety
                </a>
              </li>
            </ul>
            <ul className="mt-14 flex space-x-8 lg:space-x-10">
              <li>
                <a
                  href="https://twitter.com/join_papa"
                  rel="noopener"
                  target="_blank"
                  className="text-blue-1 text-[32px] lg:text-[40px]"
                >
                  <span className="sr-only">
                    twitter{/* */} (opens in a new window)
                  </span>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                  >
                    <path
                      d="M16 0C7.14 0 0 7.14 0 16s7.14 16 16 16 16-7.14 16-16S24.86 0 16 0Zm9.734 12.484v.594c0 6-4.547 12.922-12.922 12.922-2.546 0-4.953-.703-6.953-2 .329.031.704.078 1.063.078 2.156 0 4.078-.86 5.64-2.078-1.968-.031-3.671-1.266-4.234-3.078.266.047.563.078.86.078.406 0 .812-.031 1.187-.14-2.078-.454-3.64-2.266-3.64-4.485v-.047a4.096 4.096 0 0 0 2.046.563c-1.219-.813-2-2.188-2-3.782 0-.812.219-1.593.594-2.296a12.908 12.908 0 0 0 9.406 4.78 4.631 4.631 0 0 1-.11-1.03c0-2.532 2-4.563 4.517-4.563 1.296 0 2.484.563 3.296 1.438a9.139 9.139 0 0 0 2.844-1.11c-.328 1.078-1 1.969-1.953 2.531A10.334 10.334 0 0 0 28 10.141c-.625.89-1.375 1.718-2.266 2.343Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/joinpapa/"
                  rel="noopener"
                  target="_blank"
                  className="text-blue-1 text-[32px] lg:text-[40px]"
                >
                  <span className="sr-only">
                    facebook{/* */} (opens in a new window)
                  </span>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                  >
                    <path
                      d="M16 0C7.172 0 0 7.172 0 16c0 8.719 6.969 15.813 15.64 16V19.328H12v-4h3.64v-4c0-3.172 1.938-5.312 5.782-5.312 1.687 0 2.875.265 2.875.265V10H21.75c-1.172 0-1.75.656-1.75 1.813v3.515h4l-.578 4H20V31.5c6.906-1.781 12-8.047 12-15.5 0-8.828-7.172-16-16-16Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/PapaInc"
                  rel="noopener"
                  target="_blank"
                  className="text-blue-1 text-[32px] lg:text-[40px]"
                >
                  <span className="sr-only">
                    youtube{/* */} (opens in a new window)
                  </span>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                  >
                    <path
                      d="M16 0C7.14 0 0 7.14 0 16s7.14 16 16 16 16-7.14 16-16S24.86 0 16 0Zm0 23.328c-10 0-10 0-10-7.328s0-7.328 10-7.328 10 0 10 7.328 0 7.328-10 7.328ZM13.328 20 20 16l-6.672-4v8Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/papainc"
                  rel="noopener"
                  target="_blank"
                  className="text-blue-1 text-[32px] lg:text-[40px]"
                >
                  <span className="sr-only">
                    linkedin{/* */} (opens in a new window)
                  </span>
                  <svg
                    width="1em"
                    height="1em"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    role="presentation"
                  >
                    <path
                      d="M16 0C7.14 0 0 7.14 0 16s7.14 16 16 16 16-7.14 16-16S24.86 0 16 0ZM9.328 10.672h-.031c-1.594 0-2.625-1.047-2.625-2.344C6.672 7 7.734 6 9.328 6c1.64 0 2.64 1 2.672 2.328 0 1.297-1.031 2.344-2.672 2.344Zm2 13.328h-4V12.672h4V24ZM26 24h-4v-6c0-2.031-.813-2.672-2.031-2.672C18.734 15.328 18 16.375 18 18v6h-4v-8.672s-.078-2.219-.11-2.656h3.97l.14 1.734C18.516 12.97 19.703 12 21.328 12 24.188 12 26 14.328 26 18v6Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/join_papa/"
                  rel="noopener"
                  target="_blank"
                  className="text-blue-1 text-[32px] lg:text-[40px]"
                >
                  <span className="sr-only">
                    instagram{/* */} (opens in a new window)
                  </span>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.6806 11.1244H15.3194C12.6512 11.1244 10.4805 13.2951 10.4805 15.9633V25.3245C10.4805 27.9927 12.6512 30.1634 15.3194 30.1634H24.6806C27.3488 30.1634 29.5195 27.9927 29.5195 25.3245V15.9633C29.5195 13.2951 27.3488 11.1244 24.6806 11.1244ZM25.8677 20.6552C25.8564 23.8434 23.2674 26.4325 20.0791 26.4212C16.8909 26.4099 14.3018 23.8208 14.3131 20.6326C14.3244 17.4443 16.9135 14.8553 20.1017 14.8666C23.29 14.8779 25.8677 17.4556 25.8677 20.6439V20.6552ZM27.5862 14.4935C27.5862 15.251 26.9644 15.8728 26.2069 15.8728C25.4494 15.8728 24.8276 15.251 24.8276 14.4935C24.8276 13.736 25.4494 13.1142 26.2069 13.1142H26.2182C26.9757 13.1142 27.5862 13.7247 27.5862 14.4822V14.4935ZM20.0791 16.9469C18.0328 16.9582 16.3708 18.6201 16.3821 20.6665C16.3934 22.7129 18.0554 24.3748 20.1017 24.3635C22.1368 24.3522 23.7874 22.7016 23.7987 20.6665V20.6439C23.7874 18.5975 22.1255 16.9356 20.0791 16.9469Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20 0.666504C8.95421 0.666504 0 9.62072 0 20.6665C0 31.7123 8.95421 40.6665 20 40.6665C31.0458 40.6665 40 31.7123 40 20.6665C40 9.62072 31.0458 0.666504 20 0.666504ZM31.7241 25.3245C31.6902 29.1911 28.5472 32.3115 24.6806 32.3228H15.3194C11.4302 32.3115 8.28717 29.1685 8.27586 25.2793V15.9633C8.27586 12.0741 11.4302 8.91975 15.3194 8.90845H24.6806C28.5698 8.91975 31.7241 12.0741 31.7241 15.9633V25.3245Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </section>
        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
}

export default Home;

// export async function getServerSideProps(context) {
//   const prisma = new PrismaClient();
//   const data = await prisma.character.findMany();

//   return {
//     props: {
//       character: data,
//     },
//   };
// }
