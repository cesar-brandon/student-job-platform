"use client";
import { careerData } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  FTIcon,
  AEIcon,
  CFIcon,
  DSIcon,
  ETIcon,
} from "@/components/common/Icons";
import { useQuestionStore } from "@/store/question";

interface CareerCardProps {
  career: string;
}

const CareerCard = ({ career }: CareerCardProps) => {
  const name = careerData[career].name;
  const color = careerData[career].color;

  const router = useRouter();

  const getQuestions = useQuestionStore((state) => state.getQuestions);


  const careerIcons: {
    [key: string]: JSX.Element;
  } = {
    ET: <ETIcon className="w-full h-full stroke-none" />,
    FT: <FTIcon className="w-full h-full stroke-white" />,
    AE: <AEIcon className="w-full h-full stroke-white" />,
    CF: <CFIcon className="w-full h-full stroke-white" />,
    DS: <DSIcon className="w-full h-full stroke-white" />,
  };

  const handleClick = () => {
    getQuestions()
    router.push(`/encuesta/${career}`)
  }

  return (
    <div
      className={`group relative flex flex-col justify-between items-center w-36 h-40 rounded-xl ${color} overflow-hidden p-4`}
      onClick={handleClick}
    >
      <div className="w-full h-full top-0 left-0 rounded-xl z-10">
        <p className="text-sm text-white">Total de votos</p>
        <p className="text-5xl font-bold text-white">0</p>
      </div>

      <p className="text-sm font-semibold z-10">{name}</p>

      <span className="absolute left-[-3rem] opacity-20 group-hover:left-0  transition-all duration-300">
        {careerIcons[career]}
      </span>
    </div>
  );
};

export default CareerCard;
