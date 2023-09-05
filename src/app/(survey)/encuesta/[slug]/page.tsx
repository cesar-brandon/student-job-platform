"use client";
import { Progress } from "@/components/ui/progress";
import { useQuestionStore } from "@/store/question";

const Page = async ({ params }: { params: { slug: string } }) => {
  const questions = useQuestionStore((state) => state.questions);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-center">Encuesta</p>
        <Progress value={10} className={`career-${params.slug} h-2 rounded-full`} />
        <section className="flex flex-col gap-8">
          <p className="text-center text-3xl">
            ¿Estás al tanto de la idea de la plataforma de empleo y prácticas?
          </p>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input type="radio" name="radio" id="radio1" />
              <label htmlFor="radio1">Si</label>
            </div>
            <div className="flex gap-2">
              <input type="radio" name="radio" id="radio2" />
              <label htmlFor="radio2">No</label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
