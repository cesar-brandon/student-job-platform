import { useState } from "react";
import PostFilters from "../common/PostFilters";
import StoryPlayer from "../common/StoryPlayer";
import StoryPreview from "../common/StoryPreview";

const MainFeed = () => {
  const [openStory, setOpenStory] = useState(false);
  const stories: Story[] = [
    {
      id: 1,
      image: "/enterprises/1.png",
      title: "baby_leaders",
    },
    {
      id: 2,
      image: "/enterprises/2.png",
      title: "ifv_chincha",
    },
    {
      id: 3,
      image: "/enterprises/3.png",
      title: "little_leaders",
    },
    {
      id: 4,
      image: "/enterprises/4.png",
      title: "leadership_school",
    },
    {
      id: 5,
      image: "/enterprises/4.png",
      title: "leadership_school",
    },
    {
      id: 6,
      image: "/enterprises/4.png",
      title: "leadership_school",
    },
    {
      id: 7,
      image: "/enterprises/4.png",
      title: "leadership_school",
    },
  ];
  const HandleOpenStory = (id: number) => {
    setOpenStory(true);
  };

  const HandleCloseStory = () => {
    setOpenStory(false);
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] pt-6 sm:p-10 md:pr-0">
      <div className="flex flex-col gap-4">
        <StoryPreview
          stories={stories}
          openStory={HandleOpenStory}
          variant="feed"
        />
        {openStory && (
          <StoryPlayer stories={stories} screen closeStory={HandleCloseStory} />
        )}
        <PostFilters />
      </div>
    </div>
  );
};

export default MainFeed;
