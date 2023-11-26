//@ts-nocheck
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { sendResetPasswordEmail } from "../utils/customerIoService";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { getSession } from "next-auth/react";
import logo from "../../public/logo.svg"
import axios from "axios";
//import analytics from "~/utils/analytics";


export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const session = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (session.user) {
  //     // The session has been updated, redirect the user to the next step
  //     router.replace("/dashboard");
  //   } else {
  //     router.replace("/");
  //   }
  // }, [session]);

  useEffect(() => {
    if (!isLogin && !isForgotPassword) {
      // The user is on the registration section, track the event
      // analytics.track("page_viewed", {
      //   flow: "onboarding",
      //   time: new Date(),
      //   stage: "1",
      //   // email: user?.email,
      // });
    }
  }, [isLogin, isForgotPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const toastId = toast.loading("Logging you in...");
      const result = await signIn("credentials", {
        redirect: false,
        username: email, // use 'username' instead of 'email' to match the CredentialsProvider
        password: password,
      });
      if (result.error) {
        toast.dismiss(toastId);
        toast.error(result.error);
      } else {
        toast.dismiss(toastId);
        router.replace("/dashboard");
      }

      if (result && !result.error) {
        // analytics.identify(session.user?.id, {
        //   email: session?.user?.email,
        // });
        // analytics.track("Logged_In", {
        //   flow: "creator",
        //   email: session.user?.email,
        // });
       // router.replace("/dashboard");
      }
    } else {
      // Register user
      const toastId = toast.loading("Registering you...");

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          toast.dismiss(toastId);
          toast.success("Account created");
          //router.replace("/dashboard");
        } else {
          throw new Error(data.error || "Registration failed");
        }
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(error.message);
      }
    }
  };

  const signInWithGoogle = async () => {
    toast.loading("Redirecting...");
    // setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
    });
    // Get the user's session to access their email
    const session = await getSession();
    const userEmail = session?.user?.email;
    // if (!result.error) {
    router.push("/dashboard");
    // }
    if (userEmail) {
      // User has successfully signed in
      // Send registered event to Customer.io

      // analytics.identify(session.user?.id, {
      //   email: session.user?.email,
      // });
      // analytics.track("registered", {
      //   email: userEmail,
      //   time: new Date().toISOString(),
      //   flow: "fan",
      // });
    }

    // analytics.identify(session.user?.id, {
    //   email: session.user.email,
    // });
    // analytics.track("Logged_In", {
    //   flow: "creator",
    //   email: session.user?.email,
    // });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(
      "Sending password reset link to your email..."
    );

    // Generate a unique token
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    const token = Array.from(array, (val) => val.toString(16)).join("");

    // Send a POST request to the API route
    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, token: token }),
    });
console.log("eve", response)
    // Check the response
    if (response.ok) {
      toast.dismiss(toastId);
      const url = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/reset-password?token=${token}`;
    
      const response = await axios.post("/api/forgotMail", {
        email: email,
        url: url
      })
      console.log("many", response)

      // sendResetPasswordEmail(email, url);
      // console.group(email, url);
      toast.success("Check your email...");
    } else {
      toast.dismiss(toastId);
      toast.error("Failed to send password reset token.");
      console.error("Failed to send password reset token.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* <Image
          src={logo}
          width={200}
          height={200}
          className="mx-auto"
        ></Image> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 800"
              width="1.5em"
              height="1.5em"
              style={{ overflow: "visible" }}
              role="presentation"
              className="logo relative block mx-auto text-[60px] md:text-[85px] lg:text-[100px] xl:text-[116px]"
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
        <div>
          <h2 className="-mt-14 text-center text-2xl font-extrabold text-gray-900 md:text-5xl">
            {/* {isLogin ? "Sign in to your account" : "Register for an account"} */}
            Boost earnings and fan engagement. Register now to build your avatar
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="mb-6">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="inline-block w-full rounded border-2 border-indigo-900 bg-white p-4 text-lg font-extrabold leading-6 placeholder-indigo-900 shadow"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="inline-block w-full rounded border-2 border-indigo-900 bg-white p-4 text-lg font-extrabold leading-6 placeholder-indigo-900 shadow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isLogin ? "Need to register?" : "Already have an account?"}
              </button>
            </div>

            {isLogin && (
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(!isForgotPassword)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {isForgotPassword
                    ? "Back to Register"
                    : "Forgot your password?"}
                </button>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex h-[56px] w-full items-center  justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a2 2 0 00-2 2v4a2 2 0 104 0V4a2 2 0 00-2-2zm0 12a2 2 0 100 4 2 2 0 000-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isForgotPassword
                ? "Reset Password"
                : isLogin
                ? "Sign in"
                : "Register"}
            </button>
          </div>
        </form>
        <div className="mt-10">
          {/* Sign with Google */}
          <button
            // disabled={disabled}
            onClick={() => signInWithGoogle()}
            className="mx-auto flex h-[66px] w-full items-center justify-center space-x-2 rounded-md border bg-gray-50 p-2 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-700 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
          >
            <FcGoogle />
            <span className="text-lg">
              {/* Sign */}
              {/* {showSignIn ? "in" : "up"}  */}
              Continue with Google
            </span>
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
