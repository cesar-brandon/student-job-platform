"use client";
import React, { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
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

  const topics = ["Desarrollador", "Backend", "Fullstack", "Devops", "Devops", "Devops", "Devops", "Devops", "Devops"];

  return (
    <div className="flex items-center justify-between gap-4 cursor-default px-4 sm:p-0">
      <div className="flex gap-4 overflow-x-scroll lg:overflow-hidden">
        {topics.map((topic, index) => (
          <Badge
            key={index}
            className="rounded-md flex items-center p-1 gap-1"
            variant="secondary"
          >
            {topic}
            <XMarkIcon className="w-4 h-4 text-zinc-500" />
          </Badge>
        ))}
      </div>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <div className="w-20 flex justify-end">
            <AdjustmentsHorizontalIcon className="w-6 stroke-zinc-800 dark:stroke-zinc-300" />
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-background rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4">
                  Filtros
                </Drawer.Title>
                <Separator className="mb-2" />
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
    </div>
  );
};

export default PostFilters;
