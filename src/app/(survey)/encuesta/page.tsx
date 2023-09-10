import SurveyCareer from "@/components/survey/SurveyCareer";

const Page = () => {
  const careers = ["ET", "FT", "AE", "CF", "DS"];

  return (
    <div className="flex flex-col items-center gap-8">
      <div>
        <p className="text-center">Encuesta</p>
        <p className="font-bold text-5xl sm:text-6xl">
          Opiniones sobre la{" "}
          <strong className="font-bold bg-purple-200 text-purple-600 rounded-xl px-2">
            Idea
          </strong>{" "}
          de una{" "}
          <strong className="font-bold bg-purple-200 text-purple-600 rounded-xl px-2">
            Plataforma
          </strong>{" "}
          de Empleo
        </p>
      </div>

      <section className="w-full grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-4 place-items-center">
        {
          careers.map((career, index) => (
            <SurveyCareer key={index} career={career} />
          ))
        }
      </section>
    </div>
  );
};

export default Page;
