import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative mt-4">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="input-password"
        value={value}
        onChange={onChange}
        placeholder="Ingrese su contraseña"
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
								focus:bg-white focus:outline-none"
        required
      />
      <button
        type="button"
        className="absolute right-0 top-0 h-full px-3 pt-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={!value}
      >
        {showPassword ? (
          <EyeSlashIcon className="w-6" />
        ) : (
          <EyeIcon className="w-6" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
