import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.BASE_URL + "/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login/error"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email as string
        const isVerified = await verifyGoogleEmail(email);
        if (!isVerified) {
          return false;
        }
      }
      return true;
    },

    async session({ token, session }) {
      if (token) {
        const enterprise = await db.enterprise.findUnique({
          where: { email: token.email as string },
        });

        if (enterprise) {
          await db.user.update({
            where: { id: token.id as string },
            data: { role: "ENTERPRISE" },
          });
          session.user.role = "ENTERPRISE";
        }
      }
      session.user = token as any;
      return session;
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

export const verifyGoogleEmail = async (email: string) => {
  try {
    const existingUser = await db.student.findUnique({
      where: {
        email,
      },
    });

    const existingEnterprise = await db.enterprise.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser && !existingEnterprise) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
