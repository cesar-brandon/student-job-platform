import AppBar from "@/layouts/AppBar";
import Providers from "@/common/Providers";
import "../globals.css";
import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "Plataforma",
  description: "Pagina de Inicio de la plataforma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AppBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
