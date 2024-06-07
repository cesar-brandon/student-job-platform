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
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import type { Enterprise } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

export function EnterpriseDeleteDialog({ item }: { item: Enterprise }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete("/api/enterprise/" + item.id);
      toast({
        title: "Empresa eliminada",
        description: "La empresa ha sido eliminada con éxito",
      });
      setOpen(false);
      queryClient.invalidateQueries(["enterprises"]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al eliminar la empresa",
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
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Eliminar</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Eliminar
            <span className="ml-2 text-primary">{`"${item.name}"`}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar esta empresa?
            <br />
            Si eliminas esta empresa, no podrás recuperarla.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={onDelete} variant="destructive" disabled={isLoading}>
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
