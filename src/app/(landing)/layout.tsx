import "../globals.css";
import AppBar from "@/components/layouts/app-bar";

export const metadata = {
  title: "Plataforma",
  description: "Plataforma de empleo de IFV",
};

//NOTE: se comento momentaneamente el footer
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
