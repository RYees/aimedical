// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import nodemailer from "nodemailer";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import Handlebars from "handlebars";
import { readFileSync } from "fs";
import path from "path";
import { logger } from "next-auth";
import bcrypt from "bcrypt";



export default NextAuth({
  pages: {
    // signIn: "/dashboard",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   maxAge: 10 * 60,
    //   sendVerificationRequest,
    // }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });
        console.log(user);

        if (!user) {
          throw new Error("Email does not exist");
        }

        const isValidPassword = user.password
          ? await bcrypt.compare(credentials.password, user.password)
          : false;

        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  // events: { createUser: sendWelcomeEmail },
  callbacks: {
    async signIn(user, account, profile) {
      //console.log("jaded", user)  
      return true;
    },
    async function(error) {
      console.error(error) 
    },
    // async session({ session, token, user }) {
    //   // add user id to session
    //   session.user.id = user.id;
    //   return session;
    // },
    async session({ session, token, user }) {
      const userData = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      return {
        user: {
          id: userData.id,
          email: userData.email,
          image: userData?.image
        },
      };
    },
    async createUser(user) {
      //registrationSuccess();
      return user;
    },
  },

  // session: {
  //   jwt: true,
  // },
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  jwt: {
    secret: "dmfnlskdjfneafjrnwesdfovsdfbskdfs",
    maxAge: 7 * 24 * 60 * 60, // 1 week
  },
});
