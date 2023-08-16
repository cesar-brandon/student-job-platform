import { toast } from "@/hooks/use-toast";
import { sendEmail } from "@/lib/resend";
import { careerData, generateCode } from "@/lib/utils";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { LoaderCircleIcon } from "./Icons";

interface OtpInputProps {
  user: {
    name: string;
    career: string;
    email: string;
  };
}

const OtpInput: React.FC<OtpInputProps> = ({ user }) => {
  const [randomCode, setRandomCode] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const career = careerData[user.career];

  const sendCode = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const code = generateCode(6);
      setRandomCode(code);
      await sendEmail(code, user.name, career, user.email);
      toast({
        title: "Código enviado",
        description: "Se ha enviado el código a su correo electrónico",
      });
    } catch (error) {
      toast({
        title: "Algo salió mal",
        description: "Ocurrió un error al enviar el código",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
      setIsDisabled(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    const enteredCode = e.target.value;
    if (enteredCode.length === 6) {
      if (enteredCode === randomCode) {
        toast({
          title: "Código correcto",
          description: "Se ha verificado su identidad",
        });
      } else {
        toast({
          title: "Código incorrecto",
          description: "El código ingresado es incorrecto",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 mt-4">
      <label className="text-gray-499">
        El código sera enviado a su correo electrónico
      </label>
      <div className="flex items-center gap-4 mt-2">
        <input
          type="text"
          name="otp"
          maxLength={6}
          value={code}
          onChange={handleChange}
          placeholder="------"
          className="w-full text-center uppercase font-bold tracking-[.8rem] 
								px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500
								focus:bg-white focus:outline-none"
        />
        <Button
          className="w-20"
          onClick={sendCode}
          disabled={isSending || isDisabled}
        >
          {isSending ? <LoaderCircleIcon /> : "Enviar"}
        </Button>
      </div>
    </form>
  );
};

export default OtpInput;
