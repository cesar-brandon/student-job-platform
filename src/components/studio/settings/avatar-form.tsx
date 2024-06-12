import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { simplifyName } from "@/lib/utils";
import { user } from "@/types/next-auth";

export function AvatarForm({ user }: { user: user }) {
  return (
    <Card>
      <CardContent className="flex justify-between gap-10 pt-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-lg font-medium">Avatar</h3>
          <p className="text-sm">
            Este es tu avatar. Haz clic en el avatar para cargar uno
            personalizado desde tus archivos.
          </p>
        </div>
        <Avatar className="w-28 h-28">
          <AvatarImage src={user.image || ""} alt="Foto de perfil" />
          <AvatarFallback>
            {simplifyName(user.name.toUpperCase())}
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <Separator />
      <CardFooter className="text-sm text-muted-foreground pt-6">
        Un avatar es opcional pero muy recomendable.
      </CardFooter>
    </Card>
  );
}
