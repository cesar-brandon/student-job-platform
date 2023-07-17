import { useState } from "react";
import PostFilters from "../common/PostFilters";
import PostList from "../common/PostList";
import StoryPlayer from "../common/StoryPlayer";
import StoryPreview from "../common/StoryPreview";

const FeedPrincipal = () => {
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
  ];
  const HandleOpenStory = (id: number) => {
    console.log(id);
    setOpenStory(true);
  };

  const HandleCloseStory = () => {
    setOpenStory(false);
  };

  return (
    <div className="w-[50%] p-10">
      <div className="flex flex-col gap-4">
        <StoryPreview stories={stories} openStory={HandleOpenStory} />
        {openStory && (
          <StoryPlayer stories={stories} screen closeStory={HandleCloseStory} />
        )}
        <PostFilters />
        <PostList />
      </div>
    </div>
  );
};

export default FeedPrincipal;
