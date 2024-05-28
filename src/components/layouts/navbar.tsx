"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBarItem from "../common/navbar-item";
import { useState, useEffect } from "react";
import { simplifyName } from "@/lib/utils";
import { user } from "@/types/next-auth";

interface Props {
  user: user;
}

export function NavBar({ user }: Props) {
  const items = [
    {
      content: "Inicio",
      href: "/home",
      icon: <HomeIcon />,
    },
    {
      content: "Explorar",
      href: "/explore",
      icon: <MagnifyingGlassIcon className="stroke-current" />,
    },
    // {
    //   content: "Chat",
    //   href: "/messages",
    //   icon: <ChatBubbleOvalLeftEllipsisIcon />,
    // },
    {
      content: "Aplicados",
      href: "/apply",
      icon: <BriefcaseIcon />,
    },
    {
      content: "Perfil",
      href: `/${user.username}`,
      icon: (
        <Avatar className="w-full h-full">
          <AvatarImage src={user.image} alt="avatar" />
          <AvatarFallback>
            {simplifyName(user.name.toUpperCase())}
          </AvatarFallback>
        </Avatar>
      ),
    },
  ];
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-10 p-3 fixed bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 bg-background/30 backdrop-blur
                  rounded-full flex items-center justify-center gap-8 shadow-md
                  border transition-all duration-300 ${
                    isHidden ? "translate-y-24" : "translate-y-0"
                  }`}
    >
      {items.map((item) => (
        <NavBarItem key={item.content} {...item} />
      ))}
    </div>
  );
}
