import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCardList } from "../post/post-card-list";

export function ProfileTabs({ userId }: { userId: string }) {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="about">La empresa</TabsTrigger>
        <TabsTrigger value="posts">Ofertas</TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="flex flex-col gap-2">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
          porro expedita non id mollitia, unde quia veritatis error! Eligendi
          dignissimos illum eius aliquid quaerat tempore dicta delectus!
          Dignissimos, possimus aliquid.
        </p>
      </TabsContent>
      <TabsContent value="posts">
        <PostCardList userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
