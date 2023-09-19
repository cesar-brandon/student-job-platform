import "../globals.css";
import Footer from "@/components/layouts/Footer";
import AppBar from "@/components/layouts/AppBar";

export const metadata = {
  title: "Plataforma",
  description: "Plataforma de empleo de IFV",
}


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
}
