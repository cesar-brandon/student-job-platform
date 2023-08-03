"use client";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface StoryProgressProps {
  closeStory?: () => void;
  screen?: boolean;
}

// { story, progress, onProgressChange }
const StoryProgress = ({ closeStory, screen }: StoryProgressProps) => {
  const [muted, setMuted] = useState(false);

  let grandient = "";
  if (screen) grandient = "md:from-transparent";

  return (
    <section
      className={`z-[21] h-[8rem] opacity-40 group-hover:opacity-100 absolute top-0 right-0 left-0 py-4 px-8 
				bg-gradient-to-b from-zinc-600 via-transparent to-transparent transition-all duration-300 ease-in-out ${grandient}`}
    >
      <div className="flex gap-2 w-full h-[1rem]">
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
      </div>
      <div className="w-full flex justify-between">
        <button
          className="z-[1] text-white bg-transparent border-none w-5 h-5"
          aria-label="Mutear"
          onClick={() => setMuted(!muted)}
        >
          <span className="inline-flex items-center justify-center w-5 h-5">
            {muted ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
          </span>
        </button>
        {screen && closeStory && (
          <button className="text-white" onClick={() => closeStory()}>
            <span className="inline-flex items-center justify-center w-5 h-5">
              <XMarkIcon />
            </span>
          </button>
        )}
      </div>
    </section>
  );
};

export default StoryProgress;
