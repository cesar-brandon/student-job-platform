import {
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBarItem from "../common/NavBarItem";
import { useState } from "react";

const NavBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [items, setItems] = useState([
    {
      content: "Inicio",
      href: "#",
      icon: <HomeIcon />,
      isFocus: true,
    },
    {
      content: "Explorar",
      href: "#",
      icon: <MagnifyingGlassIcon />,
      isFocus: false,
    },
    {
      content: "Chat",
      href: "#",
      icon: <ChatBubbleOvalLeftEllipsisIcon />,
      isFocus: false,
    },
    {
      content: "Perfil",
      href: "#",
      icon: (
        <Avatar className="w-full h-full">
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      isFocus: false,
    },
  ]);

  const handleItemClick = (index: number) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, isFocus: !item.isFocus };
      }
      return { ...item, isFocus: false };
    });
    setItems(updatedItems);
  };

  return (
    <div
      className="z-10 p-3 fixed bottom-6 lg:bottom-10 left-[50%] -translate-x-1/2  bg-white rounded-full
			flex items-center justify-center gap-8 shadow-md transform border border-gray-200"
    >
      {items.map((item, index) => (
        <NavBarItem
          key={item.content}
          {...item}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default NavBar;
