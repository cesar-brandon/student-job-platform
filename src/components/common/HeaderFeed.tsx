"use client";

import PostFilters from "@/components/common/PostFilters";
import StoryPlayer from "@/components/common/StoryPlayer";
import StoryPreview from "@/components/common/StoryPreview";
import { useState } from "react";

const HeaderFeed: React.FC = () => {
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
    <>
      <StoryPreview
        stories={stories}
        openStory={HandleOpenStory}
        variant="feed"
      />
      {openStory && (
        <StoryPlayer stories={stories} screen closeStory={HandleCloseStory} />
      )}
      <PostFilters />
    </>
  );
};

export default HeaderFeed;
