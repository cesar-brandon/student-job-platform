import { Badge } from "../ui/badge";

export function ComingSoonWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pointer-events-none">
      <div className="opacity-40">{children}</div>
      <Badge className="absolute top-2 right-2 bg-orange">Muy pronto</Badge>
    </div>
  );
}
