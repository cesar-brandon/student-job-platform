"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { type UserRole } from "@prisma/client";
import { normalRoles, privateRoles } from "@/config";

export async function autocompleteInput(
  writtenText: string,
  userRole: UserRole,
  title?: string,
) {
  let prompt = "";
  console.log(title);

  if (privateRoles.includes(userRole)) {
    prompt = `El usuario esta creando una oferta de trabajo en IFV Empleos. 
          * Titulo de la oferta: ${title}
          * El usuario ha escrito lo siguiente: ${writtenText}
          * El usuario nesesita que predigas lo demas.
          * Se conciso y preciso, completa con texto plano y sin signos`;
  }
  if (normalRoles.includes(userRole)) {
    prompt = `El estudiante esta creando su descripción profesional en la plataforma de empleo en IFV Empleos. 
          * El usuario ha escrito lo siguiente: ${writtenText}
          * El usuario nesesita que predigas lo demas
          * Se conciso y preciso, completa con texto plano y sin signos`;
  }

  const { text, finishReason, usage } = await generateText({
    model: google("models/gemini-1.5-pro-latest"),
    prompt,
  });

  return { text, finishReason, usage };
}
