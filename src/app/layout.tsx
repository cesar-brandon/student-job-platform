import Providers from "@/components/providers";
import { TailwindIndicator } from "@/components/common/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://ifvempleos.vercel.app/",
  ),
  title: {
    default: "IFV",
    template: `%s - IFV`,
  },
  description: "Plataforma de empleo de IFV",
  manifest: "/manifest.json",
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: 'white' },
  //   { media: '(prefers-color-scheme: dark)', color: 'black' }
  // ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: "./opengraph-image.png",
  },
  twitter: {
    images: "./twitter-image.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className,
        )}
      >
        <Providers attribute="class" defaultTheme="light" enableSystem>
          {children}
          <TailwindIndicator />
        </Providers>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
