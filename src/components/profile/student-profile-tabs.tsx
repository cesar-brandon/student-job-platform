import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Student } from "@prisma/client";
import EditorOutput from "../editor/editor-output";
import { Badge } from "../ui/badge";

interface Resume {
  professionalSummary: string;
  skills: { name: string }[];
}

export function StudentProfileTabs({ student }: { student: Student }) {
  const professionalSummary = (student.resume as any)
    ?.professionalSummary as string;
  const skills = (student.resume as any)?.skills;

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="about">Acerca de</TabsTrigger>
        <TabsTrigger value="skills">Habilidades</TabsTrigger>
        <TabsTrigger value="experience">Experiencia</TabsTrigger>
        <TabsTrigger value="projects">Proyectos</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <EditorOutput content={professionalSummary} />
      </TabsContent>
      <TabsContent value="skills">
        {skills.map((skill: { name: string }) => (
          <Badge key={skill.name} className="m-1">
            {skill.name}
          </Badge>
        ))}
      </TabsContent>
      <TabsContent value="experience">
        <div className="p-4">
          <p>Frontend Developer</p>
          <p>Backend Developer</p>
        </div>
      </TabsContent>
      <TabsContent value="projects">
        <div className="p-4">
          <p>Project 1</p>
          <p>Project 2</p>
          <p>Project 3</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
