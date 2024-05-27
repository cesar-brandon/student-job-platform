"use client";

import React, { useState } from "react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@mantine/hooks";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import type { Filter } from "@prisma/client";

const topics = ["Practicas", "Remoto", "Sin experiencia", "Full time"];

interface Props {
  filters: Filter[];
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

export default function PostFilters({
  filters,
  selectedFilters,
  setSelectedFilters,
}: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center justify-between gap-4 cursor-default px-4 sm:p-0">
      {isDesktop ? (
        <PostFilterContent
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
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
              {/* <Accordion type="single" collapsible className="w-full"> */}
              {/*   {filters.map((filter, index) => ( */}
              {/*     <AccordionItem value={`item-${index}`} key={index}> */}
              {/*       <AccordionTrigger className="hover:no-underline lg:hover:underline"> */}
              {/*         <p className="text-sm">{filter.title}</p> */}
              {/*       </AccordionTrigger> */}
              {/*       <AccordionContent> */}
              {/*         {filter.options.map((option, index) => ( */}
              {/*           <div key={index} className="flex justify-between"> */}
              {/*             <p>{option.label}</p> */}
              {/*           </div> */}
              {/*         ))} */}
              {/*       </AccordionContent> */}
              {/*     </AccordionItem> */}
              {/*   ))} */}
              {/* </Accordion> */}
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

function PostFilterContent({
  filters,
  selectedFilters,
  setSelectedFilters,
}: Props) {
  return (
    <section className="w-full rounded-lg border p-4">
      <p className="font-bold mb-4">Filtros</p>
      <Accordion type="multiple" className="w-full">
        {filters.map((filter, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="hover:no-underline lg:hover:underline">
              <p className="text-sm">{filter.title}</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-4 flex flex-col gap-2">
                {Array.isArray(filter.options) &&
                  (filter.options as Array<{ label: string; id: string }>).map(
                    (option) =>
                      option && (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2 gap-2"
                        >
                          <Checkbox
                            checked={selectedFilters.includes(option.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? setSelectedFilters([
                                    ...selectedFilters,
                                    option.id,
                                  ])
                                : setSelectedFilters(
                                    selectedFilters.filter(
                                      (id) => id !== option.id,
                                    ),
                                  );
                            }}
                            className="w-5 h-5 rounded-[0.3rem]"
                            id={option.id}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option.label}
                          </label>
                        </div>
                      ),
                  )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex items-center justify-between space-x-2 py-4 text-sm font-medium gap-3">
        <p>Postulantes con discapacidad</p>
        <Switch />
      </div>
    </section>
  );
}
