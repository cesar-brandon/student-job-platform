import BackButton from "@/components/common/back-button";
import "../globals.css";

export const metadata = {
  title: "Encuesta",
  description: "Opiniones sobre la idea de una plataforma de empleo",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackButton type="chevron" route="back" />
      <div
        className="bg-background w-full md:mx-auto xl:w-1/2 h-screen px-6 lg:px-[10rem] xl:px-12
        flex items-center justify-center"
      >
        {children}
      </div>
    </>
  );
}
