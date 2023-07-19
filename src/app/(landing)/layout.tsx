import AppBar from "@/layouts/AppBar";
import "../globals.css";
import Footer from "@/components/layouts/Footer";

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
