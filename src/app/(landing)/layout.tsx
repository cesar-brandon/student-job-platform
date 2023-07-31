import "../globals.css";
import Footer from "@/components/layouts/Footer";
import AppBar from "@/components/layouts/AppBar";

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
