import Image from "next/image";

interface StoryPreviewProps {
  stories: Story[];
  openStory: (id: number) => void;
  variant?: "landing" | "feed";
}

const StoryPreview = ({
  stories,
  openStory,
  variant = "landing",
}: StoryPreviewProps) => {
  const paddingStory = variant === "landing" ? "" : "pl-4";
  return (
    <div
      className={`flex gap-4 max-w-full mb-4 overflow-auto text-center ${paddingStory}`}
    >
      {stories.map(({ id, image, title }: Story) => (
        <section key={id} className="flex flex-col items-center justify-center">
          <button
            className="w-[4.2rem] h-[4.2rem] p-1 border-2 border-orange-400 rounded-full overflow-hidden object-cover flex items-center justify-center"
            onClick={() => openStory(id)}
          >
            <div className="w-[3.5rem] h-[3.5rem] overflow-hidden rounded-full object-cover">
              <Image
                className="w-full"
                src={image}
                width={64}
                height={64}
                alt={`especialidad: ${title}`}
              />
            </div>
          </button>
          <p className="max-w-[4rem] overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </p>
        </section>
      ))}
    </div>
  );
};

export default StoryPreview;
