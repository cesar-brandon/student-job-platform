import Editor from "@/components/common/Editor";
import { Button } from "@/components/ui/button";

interface pageProps {
  params: {
    slug: string;
  };
}

const SubmitPage = async ({ params }: pageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-start gap-6 pt-10">
      <div className="border-b border-gray-300 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Crear oferta
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            @{params.slug}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col justify-end gap-4">
        <Editor />
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            form="enterprise-post-form"
          >
            Publicar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
