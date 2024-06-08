import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Cuenta",
  description: "Account page",
};

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Cuenta</h1>
      </div>
      <Separator />
    </div>
  );
}
