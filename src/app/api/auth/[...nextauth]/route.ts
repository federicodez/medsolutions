import { query } from "@/libs/db";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
      },
      async authorize(credentials) {
        // check to see if email and password is valid
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        // check to see if user exists
        const user = await query({
          query: "select * from staff where email = values (?)",
          values: [credentials.email],
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        // check to see if passwords match
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!passwordsMatch) {
          throw new Error("Invalid Credentials");
        }

        // return user object if everything is valid
        return user;
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
