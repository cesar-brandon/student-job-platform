import { toast } from "@/hooks/use-toast";
import { careerData, generateCode } from "@/lib/utils";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { LoaderCircleIcon } from "@/components/common/Icons";

interface OtpInputProps {
  user: {
    name: string;
    career: string;
    email: string;
  };
  setIsVerified: (value: boolean) => void;
  setTitle: (title: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  user,
  setIsVerified,
  setTitle,
}) => {
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
      await axios
        .post("/api/send", {
          code,
          name: user.name,
          career,
          email: user.email,
        })
        .then(() => {
          toast({ title: "Código enviado" });
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
    const enteredCode = e.target.value.toUpperCase();
    if (enteredCode.length === 6) {
      if (enteredCode === randomCode) {
        toast({
          title: "Código correcto",
          description: "Se ha verificado su identidad",
        });

        setTitle("Termina tu registro");
        return setIsVerified(true);
      } else {
        toast({
          title: "Código incorrecto",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
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
          className="w-24"
          onClick={sendCode}
          disabled={isSending || isDisabled}
        >
          {isSending ? <LoaderCircleIcon /> : "Enviar"}
        </Button>
      </div>
    </div>
  );
};

export default OtpInput;
