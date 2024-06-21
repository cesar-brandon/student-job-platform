import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Student } from "@prisma/client";
import EditorOutput from "../editor/editor-output";
import { Badge } from "../ui/badge";
import { Accordion } from "../ui/accordion";
import { ExperienceItem } from "./resume/experience-item";
import { ProjectItem } from "./resume/project-item";

interface Resume {
  professionalSummary: string;
  skills: { name: string }[];
}

export function StudentProfileTabs({ student }: { student: Student }) {
  const professionalSummary = (student.resume as any)
    ?.professionalSummary as string;
  const skills = (student.resume as any)?.skills;
  const experience = (student.resume as any)?.experience;
  const firstExperienceSlug =
    experience &&
    experience[0] &&
    `experience-0-${experience[0].title.toLowerCase().replace(/\s/g, "-")}`;
  const projects = (student.resume as any)?.projects;

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="about">Acerca de</TabsTrigger>
        <TabsTrigger value="skills">Habilidades</TabsTrigger>
        <TabsTrigger value="experience">Experiencia</TabsTrigger>
        <TabsTrigger value="projects">Proyectos</TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        {professionalSummary && <EditorOutput content={professionalSummary} />}
      </TabsContent>
      <TabsContent value="skills" className="pt-3">
        {skills &&
          skills.map((skill: { name: string }) => (
            <Badge key={skill.name} className="m-1">
              {skill.name}
            </Badge>
          ))}
      </TabsContent>
      <TabsContent value="experience">
        {experience && (
          <Accordion type="single" defaultValue={firstExperienceSlug}>
            {experience.map((item: any, index: number) => (
              <ExperienceItem key={index} experience={item} index={index} />
            ))}
          </Accordion>
        )}
      </TabsContent>
      <TabsContent value="projects">
        {projects && (
          <div className="flex flex-col gap-2 mt-6">
            {projects.map((project: any, index: number) => (
              <ProjectItem key={index} project={project} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
