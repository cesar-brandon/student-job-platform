"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useMediaQuery } from "@mantine/hooks";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { X } from "lucide-react";

const feedbackOptions = ["🤩", "😀", "😕", "😭"];

export function Feedback() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!visible) return null;

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger>
          <FeedbackTrigger setVisible={setVisible} />
        </DialogTrigger>
        <DialogContent className="gap-8">
          <DialogHeader className="items-center">
            <DialogTitle className="text-2xl">Feedback</DialogTitle>
            <DialogDescription>
              Proporcione su opinión sobre la aplicación
            </DialogDescription>
          </DialogHeader>
          <FeedbackForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button className="w-full" variant="secondary">
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <FeedbackTrigger setVisible={setVisible} />
      </DrawerTrigger>
      <DrawerContent className="gap-8">
        <DrawerHeader className="items-center">
          <DrawerTitle>Feedback</DrawerTitle>
          <DrawerDescription>
            Proporcione su opinión sobre la aplicación
          </DrawerDescription>
        </DrawerHeader>
        <FeedbackForm />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">
              Cancelar
            </Button>
          </DrawerClose>
          <Button className="w-full" variant="secondary">
            Enviar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FeedbackTrigger({
  setVisible,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Card className="mt-4 overflow-hidden bg-background/30 backdrop-blur-md">
      <CardHeader className="relative max-w-[20rem]">
        <CardTitle className="text-md text-center">
          Envia tu comentario sobre la aplicación
        </CardTitle>
        <X
          onClick={() => setVisible(false)}
          className="absolute z-50 top-2 right-2 w-4 h-4 cursor-pointer"
        />
      </CardHeader>
      <CardContent>
        <ul className="flex items-center justify-center gap-2 text-3xl md:text-4xl ">
          {feedbackOptions.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function FeedbackForm() {
  return (
    <>
      <div className="flex gap-4 items-center justify-center">
        {feedbackOptions.map((option) => (
          <Button
            key={option}
            className="text-3xl hover:text-4xl focus:text-4xl rounded-full w-12 h-12
              focus:border border-orange bg-background hover:bg-orange/20 focus:bg-orange/20 hover:text-accent-foreground"
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="md:mx-4 flex flex-col gap-2">
        <Label htmlFor="comment">Comentario</Label>
        <Textarea id="comment" placeholder="Escribe tu comentario" />
      </div>
    </>
  );
}
