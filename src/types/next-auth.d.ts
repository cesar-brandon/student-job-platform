import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

export interface user {
  id: string;
  name: string;
  username?: string;
  email: string;
  image: string;
  role: UserRole;
}


declare module "next-auth" {
  interface Session {
    user
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
  }
}
