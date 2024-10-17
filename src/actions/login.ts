"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const loginHandler = async (email:string, password:string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export const userDetails = async () => { 
  const LoggedUser = cookies().get("authjs.session-token");
  
   const userDetails = await decode({
     token: LoggedUser?.value!,
     salt: LoggedUser?.name!,
     secret: process.env.AUTH_SECRET!,
   });
  
  return userDetails;
}