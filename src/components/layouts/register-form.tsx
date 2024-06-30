"use client";
import { toast } from "@/hooks/use-toast";
import { Student } from "@/types/db";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoaderCircleIcon } from "@/components/common/icons";
import OtpInput from "@/components/common/opt-input";
import PasswordInput from "@/components/common/password-input";
import { StudentCard, UserCardFallback } from "../user-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountRequest, AccountValidator } from "@/lib/validators/account";

interface Props {
  userDetails: Student;
  setUserDetails: (userDetails: Student) => void;
  setTitle: (title: string) => void;
}

const RegisterForm = ({ userDetails, setUserDetails, setTitle }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreatedUser, setIsCreatedUser] = useState<boolean>(false);
  const [isLoadingCard, setIsLoadingCard] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<AccountRequest>({
    resolver: zodResolver(AccountValidator),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const createAccount = async (data: AccountRequest) => {
    setIsCreatedUser(true);
    !isVerified &&
      toast({ title: "Tu correo no esta verificado", variant: "destructive" });
    try {
      const payload = {
        ...data,
        userId: userDetails.userId,
        email: userDetails.email,
        name: `${userDetails.name} ${userDetails.lastname}`,
      };

      await axios.post("/api/user/create/", payload);
      const result = await signIn("credentials", {
        username: data.username.toLowerCase(),
        password: data.password,
        redirect: false,
      });
      if (result?.error) return router.push("/login");
      toast({ title: "Cuenta creada exitosamente", variant: "default" });
      return router.push("/home");
    } catch (error) {
      toast({ title: "Error al crear la cuenta", variant: "destructive" });
    } finally {
      setIsCreatedUser(false);
    }
  };

  const getStudent = async () => {
    setIsLoading(true);
    setIsLoadingCard(true);
    try {
      const result = await axios.get("/api/student/", {
        headers: {
          identifier,
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
    <div className="mt-6">
      {!isLoading && !userDetails && (
        <Input
          value={identifier}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setIdentifier(e.target.value)
          }
          className="w-full h-12 text-md"
          placeholder="Ingrese su correo institucional o código de estudiante"
          autoFocus
        />
      )}
      {isLoadingCard && <UserCardFallback />}
      {userDetails && (
        <>
          {userDetails.userId ? (
            <p className="text-center">
              Ya existe una cuenta con este correo,{" "}
              <Link className="text-primary" href="/login">
                inicia sesión
              </Link>
            </p>
          ) : !isVerified ? (
            <>
              <StudentCard user={userDetails} setUser={setUserDetails} />
              <OtpInput
                user={userDetails}
                setIsVerified={setIsVerified}
                setTitle={setTitle}
              />
            </>
          ) : (
            <Form {...form}>
              <form
                className="mt-6"
                onSubmit={form.handleSubmit(createAccount)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Crea tu nombre de usuario"
                          className="w-full h-12 text-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="Registra una contraseña"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-base mt-6"
                  disabled={isLoading || isCreatedUser}
                  style={{
                    display:
                      userDetails &&
                      (userDetails.userId || !isVerified) &&
                      "none",
                  }}
                >
                  {isLoading || isCreatedUser ? (
                    <LoaderCircleIcon />
                  ) : (
                    <>{userDetails ? "Crea una cuenta" : "Continuar"}</>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </>
      )}
      <Button
        type="button"
        className="w-full text-base mt-6"
        disabled={isLoading || isCreatedUser}
        style={{
          display: userDetails && "none",
        }}
        onClick={getStudent}
      >
        {isLoading || isCreatedUser ? (
          <LoaderCircleIcon />
        ) : (
          <>{userDetails ? "Crea una cuenta" : "Continuar"}</>
        )}
      </Button>
    </div>
  );
};

export default RegisterForm;
