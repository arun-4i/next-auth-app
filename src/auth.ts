import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./models/user-model";
import { compare } from "bcryptjs";
import { connectToDB } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and Password");
        }

        await connectToDB();
        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new CredentialsSignin({ cause: "Invalid Email or Password" });

        if (!user.password)
          throw new CredentialsSignin({ cause: "Invalid Email or Password" });

        const isMatch = await compare(password, user.password);

        if (!isMatch)
          throw new CredentialsSignin({
            cause: "Invalid Email or Password",
          });
        // if(!user.isVerified) throw new CredentialsSignin({ cause: "Please verify your email" });
          
        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/logout",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, id } = user;
          await connectToDB();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({
              email, name, googleId: id
            })
          }
          return true;
        } catch (error) {
          throw new AuthError("Error while creating user");
        }
      }
      else if (account?.provider === "credentials") {
        return true;
      }
      return false;
    }
  }
});
