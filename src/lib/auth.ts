import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
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
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email as string
        const isVerified = await verifyGoogleEmail(email);
        if (!isVerified) {
          console.log('not verified')
          return false;
        }
      }
      return true;
    },

    async session({ token, session, user }) {
      if (user) {
        const email = user.email;
        const enterprise = await db.enterprise.findUnique({
          where: { email },
        });

        if (enterprise) {
          // Si se encuentra un registro en la tabla enterprise, actualiza el rol
          await db.user.update({
            where: { id: user.id }, // Ajusta esto según tu modelo de datos
            data: { role: "ENTERPRISE" },
          });
          // Actualiza la sesión del usuario con el nuevo rol
          session.user.role = "ENTERPRISE";
        }
      }
      return session;
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async redirect({ url, baseUrl }) {
      if (url === "/login") {
        return "/home";
      }
      if (url === "/login-enterprise") {
        return "/home";
      }

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    }
  },
};

export const getAuthSession = () => getServerSession(authOptions);

export const verifyGoogleEmail = async (email: string) => {
  try {
    console.log(email)

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
