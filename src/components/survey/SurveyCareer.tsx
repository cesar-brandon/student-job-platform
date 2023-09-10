"use client";
import { useRouter } from "next/navigation";
import { useQuestionStore } from "@/store/question";
import CareerCard from "./CareerCard";

interface Props {
  career: string;
}

const SurveyCareer: React.FC<Props> = ({ career }) => {
  const router = useRouter();

  const getQuestions = useQuestionStore((state) => state.getQuestions);

  const handleClick = () => {
    getQuestions()
    router.push(`/encuesta/${career}`)
  }

  return (
    <CareerCard career={career} handleClick={handleClick} classNameIcon="left-[-3rem] group-hover:left-0">
      <div className="w-full h-full top-0 left-0 rounded-xl z-10">
        <p className="text-sm text-white">Total de votos</p>
        <p className="text-5xl font-bold text-white">0</p>
      </div>
    </CareerCard>
  );
};

export default SurveyCareer;
