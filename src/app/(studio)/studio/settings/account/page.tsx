import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Configuración",
  description: "Página de configuración de cuenta",
};

export default function Page() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Cambia tu nombre de usuario o contraseña.
        </p>
      </div>
      <Separator />
    </div>
  );
}
