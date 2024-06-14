"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { PDFUploader } from "@/components/pdf-uploader";

export default function ResumeImportPage() {
  const router = useRouter();

  const {
    data,
    isLoading,
    mutate: server_sectionCv,
  } = useMutation({
    mutationFn: async (file: any) => {
      const res = await axios.post("/api/pdf", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Card className="h-fit w-full bg-background">
      <CardContent className="flex flex-col gap-4 p-4">
        <PDFUploader sectionCv={server_sectionCv} />

        <Tabs defaultValue="about" className="w-full min-h-[25rem]">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="about">Acerca de</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="exp">Experiencia</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            {isLoading && <ResumeSectionSkeleton />}
          </TabsContent>
          <TabsContent value="skills">
            {isLoading && <ResumeSectionSkeleton />}
          </TabsContent>
          <TabsContent value="exp">
            {isLoading && <ResumeSectionSkeleton />}
          </TabsContent>
          <TabsContent value="projects">
            {isLoading && <ResumeSectionSkeleton />}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex gap-4 px-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => router.back()}
        >
          volver
        </Button>
        <Button className="w-full">Guardar</Button>
      </CardFooter>
    </Card>
  );
}

function ResumeSectionSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
