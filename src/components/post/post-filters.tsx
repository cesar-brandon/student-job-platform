"use client";
import React from "react";
import {
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "../ui/badge";
import { Drawer } from "vaul";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "../ui/switch";

const PostFilters = () => {
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

  const topics = ["Practicas", "Remoto", "Sin experiencia", "Full time"]

  return (
    <div className="flex items-center justify-between gap-4 cursor-default px-4 sm:p-0">
      <div className="flex gap-4 overflow-x-scroll lg:overflow-hidden">
        {topics.map((topic, index) => (
          <Badge
            key={index}
            className="rounded-md flex items-center p-1 gap-1"
            variant="outline"
          >
            {topic}
            <XMarkIcon className="w-4 h-4 text-muted-foreground" />
          </Badge>
        ))}
      </div>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <div className="group w-20 flex gap-2 border rounded-full px-2 py-1 transition-all duration-300 hover:border-primary">
            <FunnelIcon className="w-4 group-hover:stroke-primary group-hover:fill-primary" />
            <p className="text-sm group-hover:text-primary">Filtrar</p>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-background rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-accent mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-bold mb-4">
                  Filtros
                </Drawer.Title>
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
                <Separator />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div >
  );
};

export default PostFilters;
