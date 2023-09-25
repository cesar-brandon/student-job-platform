import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

export interface user {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  image: string;
  role: UserRole;
  additionalInfo?: string;
}


declare module "next-auth" {
  interface Session {
    user
  }
}
