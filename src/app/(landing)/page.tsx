"use client";
import StoryPlayer from "@/components/story-player";
import StoryPreview from "@/components/story-preview";
import { buttonVariants } from "@/components/ui/button";
import { OPTIONS } from "@/config";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircleQuestion } from "lucide-react";
import { StudentCarousel } from "@/components/student-carousel";

export default function Home() {
  const [openStory, setOpenStory] = useState(false);
  const stories: Story[] = [
    {
      id: 1,
      image: "/stories/4.png",
      title: "Farmacia",
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
      title: "DSI",
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
          <div className="w-full flex flex-col items-center justify-center lg:mt-10">
            <div className="flex flex-col gap-2 sm:gap-4">
              <h1 className="text-5xl sm:text-7xl text-center font-medium">
                Descubre tu potencial
                <br />
                <span className="hidden sm:block font-light">
                  encuentra tu empleo ideal
                </span>
              </h1>
              <p className="text-lg text-center mt-4">
                Podrás acceder a las mejores oportunidades laborales y practicas
                para ti.
              </p>
            </div>

            <div className="mt-12 lg:block flex xs:flex-col justify-center gap-3">
              <Link
                href="/login"
                aria-label="Accede a las oportunidades"
                className={cn(
                  buttonVariants(),
                  "bg-orange rounded-full hover:bg-orange/90 lg:font-bold lg:text-lg lg:py-7 lg:px-8",
                )}
              >
                Empieza ya
              </Link>

              {/* <ButtonLink */}
              {/*   href="/login-enterprise" */}
              {/*   text="Empresas" */}
              {/*   ariaLabel="Login empresas" */}
              {/*   className="group lg:hidden" */}
              {/*   icon={ */}
              {/*     <ArrowLongRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-all duration-300" /> */}
              {/*   } */}
              {/* /> */}
            </div>
          </div>
          {/* <div className="hidden lg:flex w-full justify-center"> */}
          {/*   <StoryPlayer stories={stories} options={OPTIONS} /> */}
          {/* </div> */}
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
      <StudentCarousel />
      <Link href="https://forms.gle/tTAjZapLnk3bL7vs5" target="_blank">
        <MessageCircleQuestion className="fixed bottom-10 right-10 w-12 h-12 text-primary z-20" />
      </Link>
    </main>
  );
}
