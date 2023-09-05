import BackButton from "@/components/common/BackButton";
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
    <section className="flex flex-col md:flex-row h-screen items-center">
      <BackButton type="chevron" route="back" />
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {children}
      </div>
    </section>
  );
}
