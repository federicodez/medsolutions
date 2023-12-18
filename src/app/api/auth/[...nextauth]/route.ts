import NextAuth, { AuthOptions } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@email.com",
        },
      },
      async authorize(credentials, req) {
        try {
          // check to see if email and password is valid
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid Credentials");
          }
          // check to see if user exists
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user?.hashedPassword) {
            throw new Error("Invalid Credentials.");
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
            )

          console.log("credentials: ", credentials, 'user;', user, passwordsMatch);
          if (!passwordsMatch) {
            throw new Error("Wrong Password");
          }

          // return user object if everything is valid
          return { ...credentials, user } as any;
        } catch (error) {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
