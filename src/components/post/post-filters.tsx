"use client";
import React, { useState } from "react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "../ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "../ui/switch";
import { useMediaQuery } from "@mantine/hooks";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const filters = [
  {
    title: "Fecha de publicación",
    options: [
      {
        label: "Última hora",
        value: "4",
      },
    ],
  },
  {
    title: "Area",
    options: [
      {
        label: "Tecnologia",
        value: "12",
      },
    ],
  },
  {
    title: "Modalidad de trabajo",
    options: [
      {
        label: "Remoto",
        value: "12",
      },
    ],
  },
  {
    title: "Nivel laboral",
    options: [
      {
        label: "Sin experiencia",
        value: "5",
      },
    ],
  },
  {
    title: "Carga horaria",
    options: [
      {
        label: "Full time",
        value: "5",
      },
    ],
  },
];

const topics = ["Practicas", "Remoto", "Sin experiencia", "Full time"];

export default function PostFilters() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center justify-between gap-4 cursor-default px-4 sm:p-0">
      <div className="flex gap-4 overflow-x-scroll lg:overflow-hidden">
        {topics.map((topic, index) => (
          <Badge
            key={index}
            className="rounded-md flex items-center py-1 gap-1"
            variant="outline"
          >
            {topic}
            <XMarkIcon className="w-4 h-4 text-muted-foreground" />
          </Badge>
        ))}
      </div>
      {isDesktop ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div className="group w-20 flex gap-2 border rounded-full px-2 py-1 transition-all duration-300 hover:border-primary">
              <FunnelIcon className="w-4 group-hover:stroke-primary group-hover:fill-primary" />
              <p className="text-sm group-hover:text-primary">Filtrar</p>
            </div>
          </SheetTrigger>
          <SheetContent className="md:max-w-[35rem]">
            <SheetHeader className="mb-4">
              <SheetTitle> Filtros </SheetTitle>
            </SheetHeader>
            <div className="max-w-md">
              <Accordion type="single" collapsible className="w-full">
                {filters.map((filter, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="hover:no-underline lg:hover:underline">
                      <p className="text-sm">{filter.title}</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      {filter.options.map((option, index) => (
                        <div key={index} className="flex justify-between">
                          <p>{option.label}</p>
                          <p>({option.value})</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="flex items-center justify-between space-x-2 py-4 text-sm font-semibold">
                <p>Postulantes con discapacidad</p>
                <Switch />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <div className="group w-20 flex gap-2 border rounded-full px-2 py-1 transition-all duration-300 hover:border-primary">
              <FunnelIcon className="w-4 group-hover:stroke-primary group-hover:fill-primary" />
              <p className="text-sm group-hover:text-primary">Filtrar</p>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4 max-w-md mx-auto">
              <DrawerHeader>
                <DrawerTitle className="font-bold mb-4">Filtros</DrawerTitle>
              </DrawerHeader>
              <Accordion type="single" collapsible className="w-full">
                {filters.map((filter, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="hover:no-underline lg:hover:underline">
                      <p className="text-sm">{filter.title}</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      {filter.options.map((option, index) => (
                        <div key={index} className="flex justify-between">
                          <p>{option.label}</p>
                          <p>({option.value})</p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="flex items-center justify-between space-x-2 py-4 text-sm font-medium gap-3">
                <p>Postulantes con discapacidad</p>
                <Switch />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
