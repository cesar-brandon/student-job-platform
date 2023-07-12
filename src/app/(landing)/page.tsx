import HeaderItem from "@/components/common/HeaderItem";
import StoryPlayer from "@/components/common/StoryPlayer";

export default function Home() {
  return (
    <main>
      <section
        className="xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16"
        aria-labelledby="home-title"
      >
        <div className="flex items-center">
          <div className="w-full">
            <h1 className="text-7xl">
              Descubre tu potencial, encuentra tu empleo ideal_
            </h1>

            <div className="mt-12">
              <HeaderItem
                title="Accede a las oportunidades"
                href="login"
                button
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <StoryPlayer />
          </div>
        </div>
      </section>
      <section className="mt-[11rem] w-full h-[40rem] bg-gray-700"></section>
    </main>
  );
}
