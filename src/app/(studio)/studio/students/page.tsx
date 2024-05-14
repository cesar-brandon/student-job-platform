import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold">Estudiantes</h1>
        <Tabs>
          <TabsList className="ml-auto">
            <TabsTrigger
              value="all"
              className="text-zinc-600 dark:text-zinc-200"
            >
              All mail
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="text-zinc-600 dark:text-zinc-200"
            >
              Unread
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator />
      <p>Estudents page content</p>
    </div>
  );
}
