"use server";

import VerificationCodeEmail from "@/components/email/VerificationCodeEmail";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export const sendEmail = async (
  code: string,
  name: string,
  career: {
    name: string;
    color: string;
  },
  email: string
) => {
  resend.emails.send({
    from: "ifvempleos <onboarding@resend.dev>",
    to: email,
    subject: "Bienvenido a IFV Empleos",
    react: React.createElement(VerificationCodeEmail, {
      code,
      name,
      career,
    }),
  });
};
