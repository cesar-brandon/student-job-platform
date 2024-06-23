import BackButton from "@/components/common/back-button";
import Carousel from "@/components/layouts/carousel-login";
import { redirect } from "next/navigation";
import "../globals.css";
import getSession from "@/lib/getSession";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Inicia sesión",
  description: "Iniciar session en la plataforma de empleo de IFV",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session && session.user) {
    redirect("/home");
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <BackButton type="chevron" />
      <div
        className="bg-background w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {children}
      </div>
      <Suspense fallback={<CarouselSkeleton />}>
        <Carousel />
      </Suspense>
    </section>
  );
}

function CarouselSkeleton() {
  return (
    <div className="hidden relative lg:block w-full md:w-1/2 xl:w-2/3 h-screen p-4">
      <Skeleton className="overflow-hidden rounded-tl-[2rem] rounded-br-[2rem] h-full" />
    </div>
  );
}
