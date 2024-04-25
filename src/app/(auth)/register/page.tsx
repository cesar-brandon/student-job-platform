"use client";
import GoogleIcon from "@/components/common/google-icon";
import RegisterForm from "@/components/layouts/register-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Student } from "@/types/db";
import { LoaderCircleIcon } from "@/components/common/icons";
import { Separator } from "@/components/ui/separator";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<Student>();
  const [title, setTitle] = useState<string>("Únete");

  const registerProps = { userDetails, setUserDetails, setTitle };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      return toast({
        title: "Algo salió mal",
        description: "No se pudo iniciar sesión con Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-100">
      <h1
        className={`text-xl md:text-2xl font-bold leading-tight mt-12 ${
          userDetails && userDetails.userId && "hidden"
        }`}
      >
        {title}
      </h1>

      <RegisterForm {...registerProps} />

      {!userDetails && (
        <>
          <Separator className="my-6" />

          <Button
            className="w-full text-base"
            variant="outline"
            onClick={loginWithGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircleIcon />
            ) : (
              <>
                <GoogleIcon /> Iniciar sesión con Google
              </>
            )}
          </Button>

          <p className="mt-8">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700"
            >
              {" "}
              Inicia sesión
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
