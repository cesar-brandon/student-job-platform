import Providers from "@/common/Providers";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
