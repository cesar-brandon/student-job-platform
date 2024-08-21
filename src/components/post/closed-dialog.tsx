import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleMinusIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { closePost } from "@/actions/post/close-post";

export function ClosedDialog({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await closePost(id);
      toast({
        description: "Ofera cerrada",
      });
      setOpen(false);
      queryClient.invalidateQueries(["studio-posts"]);
    } catch (error) {
      toast({
        title: "Algo salió mal",
        description: "Hubo un error al cerrar la oferta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <CircleMinusIcon className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Cerrar</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Cerrar
            <span className="w-full ml-2 text-primary break-all">{`"${name}"`}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Deseas cerrar esta oferta?
            <br />
            Si cierras esta oferta, no se podrá volver a abrir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button type="submit" onClick={onDelete} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
