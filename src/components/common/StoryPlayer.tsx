import StoryProgress from "./StoryProgress";

const StoryPlayer = () => {
  return (
    <div className="w-[22rem] h-[40rem] rounded-[2rem] bg-white drop-shadow-2xl overflow-hidden aspect-square">
      <div className="group w-full h-full flex items-center justify-center">
        <StoryProgress />
        <p className="text-black">video</p>
      </div>
    </div>
  );
};

export default StoryPlayer;
