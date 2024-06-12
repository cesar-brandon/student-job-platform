"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AppearanceForm() {
  const { setTheme, theme } = useTheme();
  const [_, startTransition] = useTransition();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Tema</CardTitle>
        <CardDescription>Cambia el tema de la interfaz.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <RadioGroup
            onValueChange={() => {
              startTransition(() => {
                setTheme(theme === "light" ? "dark" : "light");
              });
            }}
            defaultValue={!theme ? "light" : theme}
            className="grid max-w-md grid-cols-2 gap-8 pt-2"
          >
            <Label htmlFor="light">
              <RadioGroupItem id="light" value="light" className="sr-only" />
              <div
                className={cn(
                  "items-center rounded-md border-2 border-muted p-1 hover:bg-accent",
                  theme === "light" && "border-primary hover:bg-white",
                )}
              >
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>

              <span className="block w-full p-2 text-center font-normal">
                Claro
              </span>
            </Label>
            <Label htmlFor="dark">
              <RadioGroupItem id="dark" value="dark" className="sr-only" />
              <div
                className={cn(
                  "items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground",
                  theme === "dark" && "border-primary hover:bg-slate-950",
                )}
              >
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Oscuro
              </span>
            </Label>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
