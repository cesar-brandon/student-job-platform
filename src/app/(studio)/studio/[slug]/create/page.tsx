import Editor from "@/components/editor/editor";

interface pageProps {
  params: {
    slug: string;
  };
}

const SubmitPage = async ({ params }: pageProps) => {
  return (
    <div className="min-h-screen w-full flex gap-6">
      <div className="w-full flex flex-col items-start gap-6 p-10">
        <div className="border-b pb-5">
          <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
            <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-foreground">
              Crear oferta
            </h3>
            <p className="ml-2 mt-1 truncate text-sm text-gray-500">
              @{params.slug}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-end gap-4">
          <Editor />
        </div>
      </div>

      <div className="w-full h-full p-4 border rounded-lg">
        Preview
      </div>
    </div>
  );
};

export default SubmitPage;
