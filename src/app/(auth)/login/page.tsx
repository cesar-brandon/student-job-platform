"use client";
import Button from "@/components/common/Button";
import GoogleIcon from "@/components/common/GoogleIcon";
import LoginForm from "@/components/layouts/LoginForm";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/feed`,
      });
    } catch (error) {
      // toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Inicie sesión en su cuenta
      </h1>

      <LoginForm />
      <hr className="my-6 border-gray-300 w-full" />

      <Button
        className="w-full flex items-center justify-center gap-4 px-4 py-3
								   bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg border border-gray-300"
        onClick={loginWithGoogle}
        text={isLoading ? "Cargando..." : "Iniciar sesión con Google"}
        icon={<GoogleIcon />}
        disabled={isLoading}
      />
      <p className="mt-8">
        ¿Necesitas una cuenta?
        <Link
          href="/register"
          className="font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700"
        >
          {" "}
          Crear una cuenta
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
