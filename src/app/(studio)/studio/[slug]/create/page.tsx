import Editor from "@/components/editor/editor";
import { Separator } from "@/components/ui/separator";

interface pageProps {
  params: {
    slug: string;
  };
}

const CreatePage = async ({ params }: pageProps) => {
  return (
    <div>
      <div className="flex items-center gap-4 px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Crear oferta</h1>
        <p className="truncate text-sm text-gray-500">@{params.slug}</p>
      </div>
      <Separator />
      <div className="min-h-screen w-full flex gap-6">
        <div className="w-full flex flex-col items-start gap-6 p-10">
          <div className="w-full flex flex-col justify-end gap-4">
            <Editor />
          </div>
        </div>

        <div className="w-full h-full p-4 border rounded-lg">Preview</div>
      </div>
    </div>
  );
};

export default CreatePage;
