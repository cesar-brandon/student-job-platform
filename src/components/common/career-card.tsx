import { careerData, cn } from "@/lib/utils";
import { AEIcon, CFIcon, DSIcon, ETIcon, FTIcon } from "@/components/common/Icons";

interface CareerCardProps {
  career: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  className?: string;
  classNameIcon?: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, children, handleClick, className, classNameIcon }) => {
  const color = careerData[career].color;


  const careerIcons: {
    [key: string]: JSX.Element;
  } = {
    ET: <ETIcon className="w-full h-full stroke-none" />,
    FT: <FTIcon className="w-full h-full stroke-white" />,
    AE: <AEIcon className="w-full h-full stroke-white" />,
    CF: <CFIcon className="w-full h-full stroke-white" />,
    DS: <DSIcon className="w-full h-full stroke-white" />,
  };

  return (
    <div
      className={cn(`group relative flex flex-col justify-between items-center w-36 h-40 rounded-xl ${color} overflow-hidden p-4`, className)}
      onClick={handleClick}
    >
      {children}
      <span className={cn("absolute opacity-20 transition-all duration-300", classNameIcon)}>
        {careerIcons[career]}
      </span>
    </div>
  );
};

export default CareerCard;
