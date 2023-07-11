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
