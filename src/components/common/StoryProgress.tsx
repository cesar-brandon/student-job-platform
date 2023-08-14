import { Progress } from "../ui/progress";

interface StoryProgressProps {
  screen?: boolean;
  story?: Story;
  progress?: number;
  onProgressChange?: (progress: number) => void;
}

const StoryProgress = ({
  screen,
  story,
  progress,
  onProgressChange,
}: StoryProgressProps) => {
  return (
    <Progress value={progress} className="flex-1 h-1 rounded-sm bg-gray-200" />
  );
};

export default StoryProgress;
