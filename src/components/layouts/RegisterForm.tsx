"use client";
import { toast } from "@/hooks/use-toast";
import { Student } from "@/types/db";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoaderCircleIcon } from "../common/Icons";
import OtpInput from "../common/OtpInput";
import PasswordInput from "../common/PasswordInput";
import { StudentCard, UserCardFallback } from "../common/UserCard";
import { Button } from "../ui/button";

interface Props {
  userDetails: Student;
  setUserDetails: (userDetails: Student) => void;
  setTitle: (title: string) => void;
}

const RegisterForm = ({ userDetails, setUserDetails, setTitle }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCard, setIsLoadingCard] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    identifier: "",
    username: "",
    password: "",
  });
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    userDetails ? createAccount() : getStudent();
  };

  const createAccount = async () => {
    setIsLoading(true);
    !isVerified &&
      toast({ title: "Tu correo no esta verificado", variant: "destructive" });
    try {
      await axios.post("/api/user/create/", {
        name: formData.username.toLowerCase(),
        email: userDetails.email,
        password: formData.password,
      });
      toast({ title: "Cuenta creada exitosamente", variant: "default" });
      const result = await signIn("credentials", {
        username: formData.username.toLowerCase(),
        password: formData.password,
        redirect: false,
      });
      if (result?.error) return router.push("/login");
      return router.push("/home");
    } catch (error) {
      toast({ title: "Error al crear la cuenta", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const getStudent = async () => {
    setIsLoading(true);
    setIsLoadingCard(true);
    try {
      const result = await axios.get("/api/student/", {
        headers: {
          identifier: formData.identifier,
        },
      });
      toast({ title: "Estudiante encontrado", variant: "default" });

      setTitle("Confirma tu identidad");
      setUserDetails(result.data);
    } catch (error) {
      toast({
        title: "Algo salió mal",
        description: "El estudiante no fue encontrado",
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
        <>
          <input
            type="text"
            name="identifier"
            id="input-identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Ingrese su correo institucional o código de estudiante"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="on"
            required
          />
        </>
      )}
      {isLoadingCard && <UserCardFallback />}
      {userDetails && (
        <>
          {!isVerified ? (
            <>
              <StudentCard user={userDetails} setUser={setUserDetails} />
              <OtpInput
                user={userDetails}
                setIsVerified={setIsVerified}
                setTitle={setTitle}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="username"
                id="input-username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Crea tu nombre de usuario"
                className="w-full lowercase px-4 py-3 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="on"
                required
              />
              <PasswordInput
                value={formData.password}
                onChange={handleChange}
                placeholder="Registra una contraseña"
              />
            </>
          )}
        </>
      )}
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={(userDetails || isLoading) && !isVerified}
      >
        {isLoading ? (
          <LoaderCircleIcon />
        ) : (
          <>{userDetails ? "Crea una cuenta" : "Continuar"}</>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
