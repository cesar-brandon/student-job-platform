"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FormEvent, useState } from "react";
import PasswordInput from "../common/PasswordInput";

const RegisterForm = () => {
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
  };

  return (
    <form className="mt-6" action="#" method="POST" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Email</label>
        <div className="relative ">
          <input
            type="email"
            name="email"
            id="input-email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese su dirección de correo electrónico"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="on"
            required
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-full px-3 pt-2 hover:bg-transparent"
          ></button>
        </div>
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

export default RegisterForm;
