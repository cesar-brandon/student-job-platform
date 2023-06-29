import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";

interface BackButtonProps {
  type: "arrow" | "chevron";
}

const BackButton = ({ type }: BackButtonProps) => {
  const router = useRouter();
  return type === "arrow" ? (
    <button
      type="button"
      className="absolute top-0 right-0 text-white m-6"
      onClick={() => router.back()}
    >
      <ArrowUpRightIcon className="w-16" strokeWidth={2} />
    </button>
  ) : (
    <button
      type="button"
      className="absolute top-0 text-white m-8 p-2 backdrop-blur bg-black bg-opacity-20 hover:bg-opacity-40 transition-all rounded-lg"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="w-10" strokeWidth={1.5} />
    </button>
  );
};

export default BackButton;
