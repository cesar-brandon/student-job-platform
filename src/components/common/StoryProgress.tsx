"use client";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// { story, progress, onProgressChange }
const StoryProgress = () => {
  const [muted, setMuted] = useState(false);

  return (
    <section
      className="opacity-0 group-hover:opacity-100 absolute top-0 right-0 left-0 flex flex-wrap justify-between py-4 px-8 
								 bg-gradient-to-b from-gray-400 via-gray-300 to-white transition-all duration-300 ease-in-out"
    >
      <div className="flex gap-2 w-full">
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
        <div className="flex-1 h-1 rounded-sm bg-gray-200"></div>
      </div>
      <button
        className="z-[1] pt-2 text-white bg-transparent border-none"
        aria-label="Mutear"
        onClick={() => setMuted(!muted)}
      >
        <span className="inline-flex items-center justify-center w-5 h-5">
          {muted ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
        </span>
      </button>
    </section>
  );
};

export default StoryProgress;
