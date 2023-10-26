import { NextResponse } from "next/server";
import { Resend } from "resend";
import VerificationCodeEmail from "@/components/email-verification-code";

interface RequestBody {
  code: string;
  name: string;
  career: {
    name: string;
    color: string;
  };
  email: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  try {
    const data = await resend.emails.send({
      from: "ifvempleos <onboarding@resend.dev>",
      to: body.email,
      subject: `${body.code} es tu código de verificación`,
      react: VerificationCodeEmail({
        code: body.code,
        name: body.name,
        career: body.career,
      }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
