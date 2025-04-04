// pages/api/auth/[...nextauth].ts

import NextAuth, { Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma"; 

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find the user by email, including the role relation
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
          include: {
            role: true, // Include the role relation
          },
        });

        if (user && user.password === credentials?.password) {
          // Return the user with the role mapped to a string (using user.role.name)
          return {
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role.name, // Map the role to a string here
            roleId: user.roleId,
            createdAt: user.createdAt,
          };
        } else {
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  // Cast the adapter to any to bypass the type mismatch for createUser.
  adapter: PrismaAdapter(prisma) as any,
  pages: {
    signIn: "/login", // Optional: specify a custom sign-in page
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: NextAuthUser }) {
      // Attach the user's role to the session for authorization checks
      session.user.id = user.id;
      session.user.role = user.role; // Attach the role string (not object) to the session
      return session;
    },
  },
};

export default NextAuth(authOptions);
