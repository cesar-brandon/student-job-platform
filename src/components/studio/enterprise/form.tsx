import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Enterprise } from "@prisma/client";

interface EnterpriseFormProps {
  item?: Enterprise;
}

export function EnterpriseForm({ item }: EnterpriseFormProps) {
  return (
    <Dialog>
      {item ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Editar</TooltipContent>
        </Tooltip>
      ) : (
        <DialogTrigger asChild>
          <Button>
            Crear empresa
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item ? `Editar ${item.name}` : "Crear empresa"}
          </DialogTitle>
        </DialogHeader>
        hello
      </DialogContent>
    </Dialog>
  );
}
