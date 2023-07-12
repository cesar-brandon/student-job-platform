"use client";
import GoogleIcon from "@/components/common/GoogleIcon";
import RegisterForm from "@/components/layouts/RegisterForm";
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Únete
      </h1>

      <RegisterForm />
      <hr className="my-6 border-gray-300 w-full" />

      <button
        type="button"
        className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        onClick={() =>
          signIn("google", {
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/feed`,
          })
        }
      >
        <div className="flex items-center justify-center">
          <GoogleIcon />
          <span className="ml-4">Iniciar sesión con Google</span>
        </div>
      </button>

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
    </div>
  );
};

export default RegisterPage;
