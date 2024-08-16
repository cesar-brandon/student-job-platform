"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function getAnswer(writtenText: string) {
  const { text, finishReason, usage } = await generateText({
    model: google("models/gemini-1.5-pro-latest"),
    prompt: `El usuario esta crando una oferta de trabajo en IFV Empleos. 
            * El usuario ha escrito lo siguiente: ${writtenText}
            * El usuario nesesita que predigas lo demas.`,
  });

  return { text, finishReason, usage };
}
