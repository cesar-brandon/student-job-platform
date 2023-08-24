"use client";
import { careerData } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CareerCardProps {
  career: string;
}

const CareerCard = ({ career }: CareerCardProps) => {
  const name = careerData[career].name;
  const color = careerData[career].color;
  const router = useRouter();
  return (
    <div
      className={`group relative flex flex-col justify-between items-center w-36 h-40 rounded-xl ${color} overflow-hidden p-4`}
      onClick={() =>router.push(`/survey/${career}`)}
    >
      <label className="w-8 h-8"></label>
      <p className="text-sm font-semibold">{name}</p>
      <div className="absolute w-full h-full top-0 left-0 p-4
       backdrop-blur-sm rounded-xl overflow-hidden hidden group-hover:block transition delay-300">
        <p className="text-sm text-white">Total de votos</p>
        <p className="text-5xl font-bold text-white">0</p>
      </div>
    </div>
  );
};

export default CareerCard;
