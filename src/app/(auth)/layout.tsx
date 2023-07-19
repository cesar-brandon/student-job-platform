import BackButton from "@/components/common/BackButton";
import Carousel from "@/components/layouts/Carousel";
import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <BackButton type="chevron" />
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {children}
      </div>
      <Carousel />
    </section>
  );
}
