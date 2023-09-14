"use client";
import GoogleIcon from "@/components/common/GoogleIcon";
import { LoaderCircleIcon } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('google', {
        redirect: false,
      });
      if (result?.error) {
        toast({
          title: "Error",
          description: "Ocurrió un error al iniciar sesión con Google.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Éxito",
          description: "Inicio de sesión exitoso.",
          variant: "default",
        });
        router.push("/home");
      }
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
    <div className="w-full h-100 flex flex-col gap-4">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Inicie sesión en su cuenta
      </h1>
      <p >Al continuar, estás creando una cuenta en la plataforma del Instituto Federico Villarreal y aceptas nuestro Acuerdo de Usuario y Política de Privacidad</p>
      <Button
        className="w-full bg-white text-base hover:bg-gray-100 focus:bg-gray-100 text-gray-900 border border-gray-300"
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
    </div>
  );
};

export default LoginPage;
