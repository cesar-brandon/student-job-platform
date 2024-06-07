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
import EnterpriseForm from "./form";
import { useState } from "react";

interface EnterpriseModalProps {
  item?: Enterprise;
}

export function EnterpriseModal({ item }: EnterpriseModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            {item ? (
              <p>
                Editar
                <span className="ml-2 text-primary">{`"${item.name}"`}</span>
              </p>
            ) : (
              "Crear empresa"
            )}
          </DialogTitle>
        </DialogHeader>
        <EnterpriseForm item={item} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
