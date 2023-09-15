"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import PasswordInput from "@/components/common/PasswordInput";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { UserCard, UserCardFallback } from "../common/UserCard";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon } from "../common/Icons";

interface Props {
  userDetails: null;
  setUserDetails: (userDetails: null) => void;
}

const LoginForm = ({ userDetails, setUserDetails }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCard, setIsLoadingCard] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginWithCredentials = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        username: formData.identifier,
        password: formData.password,
        redirect: false,
      });
      if (result?.error) {
        toast({
          title: "Error",
          description: "Credenciales inválidas.",
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
      console.log(error)
      toast({
        title: "Algo salió mal",
        description: "Error al iniciar sesión. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    userDetails ? loginWithCredentials() : getUser();
  };

  const getUser = async () => {
    setIsLoading(true);
    setIsLoadingCard(true);
    try {
      const result = await axios.get("/api/user/", {
        headers: {
          identifier: formData.identifier,
        },
      });
      toast({
        title: "Usuario encontrado",
        description: "Se encontró el usuario " + result.data.name,
        variant: "default",
      });

      setUserDetails(result.data);
    } catch (error) {
      toast({
        title: "Algo salió mal",
        description: "El usuario no fue encontrado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsLoadingCard(false);
    }
  };

  return (
    <form className="mt-6" method="POST" onSubmit={handleSubmit}>
      {!isLoading && !userDetails && (
        <input
          type="text"
          name="identifier"
          id="input-identifier"
          value={formData.identifier}
          onChange={handleChange}
          placeholder="Ingrese su nombre de usuario o correo"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          autoFocus
          autoComplete="on"
          required
        />
      )}
      {isLoadingCard && <UserCardFallback />}
      {userDetails && (
        <>
          <UserCard user={userDetails} setUser={setUserDetails} />
          <PasswordInput value={formData.password} onChange={handleChange} />

          <div className="text-right mt-2">
            <Link
              href="/login/reset-password"
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>
        </>
      )}
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-base mt-6"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderCircleIcon />
        ) : (
          <>{userDetails ? "Ingresar" : "Continuar"}</>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
