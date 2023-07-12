"use client";

import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <div className="w-full h-100">
      <h1 className="text-4xl font-medium">Restablecer contraseña</h1>
      <p className="text-slate-500 mt-2">
        Introduce tu dirección de correo electrónico y te enviaremos un código
        de verificación
      </p>

      <form action="" className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">
              Correo electrónico
            </p>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingrese su email"
            />
          </label>

          <button className="w-full py-3 font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg border-blue-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Continuar</span>
          </button>
          <p className="text-center">
            Aún no estas registrado?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700"
            >
              {" "}
              Registrarse ahora
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
