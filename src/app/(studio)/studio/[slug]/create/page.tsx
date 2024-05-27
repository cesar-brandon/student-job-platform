import Editor from "@/components/editor/editor";
import PostFilters from "@/components/post/filters/post-filters";
import { Separator } from "@/components/ui/separator";

interface CreatePageProps {
  params: {
    slug: string;
  };
}

const CreatePage = async ({ params }: CreatePageProps) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center gap-4 px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Crear oferta</h1>
        <p className="ml-2 truncate text-sm text-gray-500">@{params.slug}</p>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-start gap-6 p-10">
          <div className="w-full flex flex-col justify-end gap-4">
            <Editor />
          </div>
        </div>

        <div className="p-10">
          <PostFilters />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
