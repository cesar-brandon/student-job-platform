import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/studio/settings/nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/studio/settings",
  },
  {
    title: "Cuenta",
    href: "/studio/settings/account",
  },
  {
    title: "Apariencia",
    href: "/studio/settings/appearance",
  },
  // {
  //   title: "Notificaciones",
  //   href: "/settings/notifications",
  // },
  // {
  //   title: "Display",
  //   href: "/settings/display",
  // },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Configuración de cuenta</h1>
      </div>
      <Separator />
      <div className="flex flex-col p-10 pb-16 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <ScrollArea className="flex-1 lg:max-w-2xl h-[40rem] px-4">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
