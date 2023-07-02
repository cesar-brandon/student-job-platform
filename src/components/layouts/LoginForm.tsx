import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import PasswordInput from "@/components/common/PasswordInput";
import Link from "next/link";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/feed`,
    });
  };

  return (
    <form className="mt-6" action="#" method="POST" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="input-email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingrese su email"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          autoFocus
          autoComplete="on"
          required
        />
      </div>

      <PasswordInput value={formData.password} onChange={handleChange} />

      <div className="text-right mt-2">
        <Link
          href="/login/reset-password"
          className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
        >
          ¿Olvidó su contraseña?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
      >
        Inicia sesión
      </button>
    </form>
  );
};

export default LoginForm;
