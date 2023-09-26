"use client";
import StoryPlayer from "@/components/common/StoryPlayer";
import StoryPreview from "@/components/common/StoryPreview";
import ButtonLink from "@/components/common/button-link";
import { OPTIONS } from "@/config";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
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
								   px-6 sm:px-0 mr-auto ml-auto py-0 lg:px-8 xl:px-16"
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

            <div className="mt-12 lg:block flex xs:flex-col justify-center gap-3">
              <ButtonLink href="/login" text="Accede a las oportunidades" ariaLabel="Explora"
                className="bg-orange hover:bg-orange/90 lg:font-bold lg:text-lg lg:py-7 lg:px-8" />
              <ButtonLink href="/login-enterprise" text="Empresas" ariaLabel="Login empresas"
                className="group lg:hidden"
                icon={<ArrowLongRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-all duration-300" />} />
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
