import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCardList } from "../post/post-card-list";
import type { Enterprise } from "@prisma/client";
import EditorOutput from "../editor/editor-output";

export function ProfileTabs({
  userId,
  enterprise,
}: {
  userId: string;
  enterprise: Enterprise | null;
}) {
  const enterpriseDescription = enterprise?.description;

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="about">La empresa</TabsTrigger>
        <TabsTrigger value="posts">Ofertas</TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="flex flex-col gap-2">
        {enterpriseDescription && (
          <EditorOutput content={enterpriseDescription} />
        )}
      </TabsContent>
      <TabsContent value="posts">
        <PostCardList userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
