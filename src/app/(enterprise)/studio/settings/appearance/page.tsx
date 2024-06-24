import { AppearanceForm } from "@/components/studio/settings/appearance-form";

export const metadata = {
  title: "Configuración",
  description: "Página de configuración de cuenta",
};

export default function Page() {
  return (
    <div className="space-y-6 w-full">
      <AppearanceForm />
    </div>
  );
}
