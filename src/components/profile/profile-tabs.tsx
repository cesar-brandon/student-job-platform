import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileTabs() {
  return (
    <Tabs defaultValue="skills">
      <TabsList>
        <TabsTrigger value="skills">Habilidades</TabsTrigger>
        <TabsTrigger value="experience">Experiencia</TabsTrigger>
        <TabsTrigger value="projects">Proyectos</TabsTrigger>
      </TabsList>
      <TabsContent value="skills">
        <div className="p-4">
          <p>HTML</p>
          <p>CSS</p>
          <p>JavaScript</p>
        </div>
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
