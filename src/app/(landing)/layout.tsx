import "../globals.css";
import Footer from "@/components/layouts/footer";
import AppBar from "@/components/layouts/app-bar";

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
