"use client";
import GoogleIcon from "@/components/common/google-icon";
import { LoaderCircleIcon } from "@/components/common/icons";
import LoginForm from "@/components/layouts/login-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

//NOTE: se comento momentaneamente la funcion de RegisterUser
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState(null);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      return toast({
        title: "Algo salió mal",
        description: "No se pudo iniciar sesión con Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Inicie sesión en su cuenta
      </h1>
      <LoginForm userDetails={userDetails} setUserDetails={setUserDetails} />
      {!userDetails && (
        <>
          <Separator className="my-6" />

          <Button
            className="w-full text-base"
            onClick={loginWithGoogle}
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircleIcon />
            ) : (
              <>
                <GoogleIcon /> Iniciar sesión con Google
              </>
            )}
          </Button>

          {/* <p className="mt-8"> */}
          {/*   ¿Necesitas una cuenta? */}
          {/*   <Link */}
          {/*     href="/register" */}
          {/*     className="font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700" */}
          {/*   > */}
          {/*     {" "} */}
          {/*     Crear una cuenta */}
          {/*   </Link> */}
          {/* </p> */}
        </>
      )}
    </div>
  );
};

export default LoginPage;
