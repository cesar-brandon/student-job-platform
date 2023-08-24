import { Progress } from "@/components/ui/progress";

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div>
        <p className="text-center">Encuesta</p>
        <Progress value={100} className="w-40 h-8 rounded-sm bg-emerald-500" />
      </div>
    </div>
  );
};

export default Page;
