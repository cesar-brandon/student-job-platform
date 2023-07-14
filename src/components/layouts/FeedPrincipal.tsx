import Image from "next/image";
import PostFilters from "../common/PostFilters";
import PostList from "../common/PostList";

const FeedPrincipal = () => {
  const stories: Story[] = [
    {
      id: 1,
      image: "/enterprises/1.png",
      title: "enterprise",
    },
    {
      id: 2,
      image: "/enterprises/2.png",
      title: "enterprise",
    },
    {
      id: 3,
      image: "/enterprises/3.png",
      title: "enterprise",
    },
    {
      id: 4,
      image: "/enterprises/4.png",
      title: "enterprise",
    },
  ];

  return (
    <div className="w-[50%] p-10">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 max-w-full mb-4 overflow-auto text-center">
          {stories.map(({ id, image, title }: Story) => (
            <section
              key={id}
              className="flex flex-col items-center justify-center"
            >
              <button className="w-[4.2rem] h-[4.2rem] p-1 border-2 border-orange-400 rounded-full overflow-hidden object-cover flex items-center justify-center">
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
            </section>
          ))}
        </div>

        <PostFilters />
        <PostList />
      </div>
    </div>
  );
};

export default FeedPrincipal;
