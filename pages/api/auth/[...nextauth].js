import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credential, req) {
        const { email, password } = credential;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error In Connecting To DB!");
        }

        if (!email || !password) throw new Error("Invalid Data!");

        const user = await User.findOne({ email });
        if (!user) throw new Error("User Doesn't Exist!");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Username Or Password Is Incorrect!");

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
