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
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const feedbackOptions = ["🤩", "😀", "😕", "😭"];

export function Feedback({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!visible) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
          <FeedbackForm
            userId={userId}
            setOpen={setOpen}
            setLoading={setLoading}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="feedback-form"
              className="w-full"
              variant="secondary"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
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
        <FeedbackForm
          userId={userId}
          setOpen={setOpen}
          setLoading={setLoading}
        />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">
              Cancelar
            </Button>
          </DrawerClose>
          <Button
            type="submit"
            form="feedback-form"
            className="w-full"
            variant="secondary"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
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

function FeedbackForm({
  userId,
  setOpen,
  setLoading,
}: {
  userId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [score, setScore] = useState(1);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!text) {
        setError(true);
        return;
      }
      await axios.post("/api/feedback", {
        userId,
        score,
        text,
      });

      toast({
        description: "Feedback enviado",
      });
      setOpen(false);
    } catch (error) {
      toast({
        description: "Error al enviar el feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="feedback-form" onSubmit={onSubmit}>
      <div className="flex gap-4 items-center justify-center">
        {feedbackOptions.map((option, index) => (
          <Button
            type="button"
            key={index}
            onClick={() => setScore(index + 1)}
            className={cn(
              `text-3xl hover:text-4xl rounded-full w-12 h-12 bg-background hover:bg-orange/20`,
              score === index + 1 &&
                "border border-orange text-orange bg-orange/20 text-4xl",
            )}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="mx-4 mt-8 md:mx-0 md:mt-4 flex flex-col gap-2">
        <Label htmlFor="comment">Comentario</Label>
        <Textarea
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu comentario"
        />
        {error && !text && (
          <span className="text-sm text-destructive">
            Por favor ingrese sus comentarios
          </span>
        )}
      </div>
    </form>
  );
}
