import HeaderItem from "@/components/common/HeaderItem";
import StoryPlayer from "@/components/common/StoryPlayer";
import Image from "next/image";

export default function Home() {
  const stories: Story[] = [
    {
      id: 1,
      image: "/stories/1.png",
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
      image: "/stories/4.png",
      title: "Farmacia",
    },
  ];
  return (
    <main>
      <section
        className="xl:w-[1440px] lg:w-[1024px] min-[0px]:w-[480px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16 min-[0px]-1:px-6"
        aria-labelledby="home-title"
      >
        <div className="flex items-center lg:flex-row min-[0px]:flex-col min-[0px]:justify-between">
          <section className="lg:hidden min-[0px]:block">
            <div className="flex gap-4 max-w-full mb-12 px-6 overflow-auto text-center">
              {stories.map(({ id, image, title }: Story) => (
                <section
                  key={id}
                  className="flex flex-col items-center justify-center"
                >
                  <button className="w-20 h-20 p-1 border-2 border-orange-400 rounded-full overflow-hidden object-cover flex items-center justify-center">
                    <div className="w-[64px] h-[64px] overflow-hidden rounded-full object-cover">
                      <Image
                        className="w-full"
                        src={image}
                        width={64}
                        height={64}
                        alt={`especialidad: ${title}`}
                      />
                    </div>
                  </button>
                  <p>{title}</p>
                </section>
              ))}
            </div>
          </section>
          <div className="w-full">
            <h1 className="text-7xl lg:text-left min-[0px]:text-center">
              Descubre tu potencial, encuentra tu empleo ideal_
            </h1>

            <div className="mt-12 lg:block min-[0px]:flex min-[0px]:justify-center">
              <HeaderItem
                title="Accede a las oportunidades"
                href="login"
                button
              />
            </div>
          </div>
          <div className="min-[0px]:hidden lg:flex w-full justify-center">
            <StoryPlayer />
          </div>
        </div>
      </section>
      <section className="mt-[11rem] w-full h-[40rem] bg-gray-700"></section>
    </main>
  );
}
