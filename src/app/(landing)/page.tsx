"use client";
import HeaderItem from "@/components/common/HeaderItem";
import StoryPlayer from "@/components/common/StoryPlayer";
import StoryPreview from "@/components/common/StoryPreview";
import { OPTIONS } from "@/config";
import { useState } from "react";

export default function Home() {
  const [openStory, setOpenStory] = useState(false);
  const stories: Story[] = [
    {
      id: 1,
      image: "/stories/4.png",
      title: "DSI",
    },
    {
      id: 2,
      image: "/stories/2.png",
      title: "Enfermeria",
    },
    {
      id: 3,
      image: "/stories/3.png",
      title: "Finanzas",
    },
    {
      id: 4,
      image: "/stories/1.png",
      title: "Farmacia",
    },
  ];

  const HandleOpenStory = (id: number) => {
    setOpenStory(true);
  };

  const HandleCloseStory = () => {
    setOpenStory(false);
  };
  return (
    <main>
      <section
        className="xl:w-[1440px] lg:w-[1024px] w-[480px] max-w-full
								   mr-auto ml-auto py-0 lg:px-8 xl:px-16"
        aria-labelledby="home-title"
      >
        <div className="flex items-center lg:flex-row flex-col justify-between">
          <section className="lg:hidden block">
            <StoryPreview stories={stories} openStory={HandleOpenStory} />
          </section>
          <div className="w-full">
            <h1 className="text-7xl lg:text-left text-center">
              Descubre tu potencial, encuentra tu empleo ideal_
            </h1>

            <div className="mt-12 lg:block flex justify-center">
              <HeaderItem
                title="Accede a las oportunidades"
                href="login"
                button
              />
            </div>
          </div>
          <div className="hidden lg:flex w-full justify-center">
            <StoryPlayer stories={stories} options={OPTIONS} />
          </div>
          {openStory && (
            <StoryPlayer
              stories={stories}
              screen
              closeStory={HandleCloseStory}
              options={OPTIONS}
            />
          )}
        </div>
      </section>
      <section className="mt-[11rem]"></section>
    </main>
  );
}
