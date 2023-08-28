import { Progress } from "@/components/ui/progress";

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div>
        <p className="text-center">Encuesta</p>
        <Progress value={10} className="flex-1 h-2 m-4 rounded-full " />
        <section>
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
