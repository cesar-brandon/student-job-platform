import React from "react";
import Link from "next/link";
import { Bars2Icon, UserIcon } from "@heroicons/react/24/outline";
import HeaderItem from "../common/HeaderItem";
import Button from "../common/Button";
import { IfvLoveIcon } from "../common/Icons";

const AppBar = () => {
  return (
    <header className="relative z-10">
      <div className="xl:w-[1440px] lg:w-[1024px] min-[0px]:w-[480px] max-w-full mr-auto ml-auto lg:px-8 xl:px-16 py-5 px-6">
        <section className="flex items-center justify-center min-[0px]:justify-between min-[0px]:min-h-[4rem] lg:min-h-[7.5rem]">
          <Link
            className="relative lg:grow lg:max-w-[7.5rem] min-[0px]:max-w-[5rem] lg:p-0 "
            href="/"
            aria-label="ifv"
          >
            <IfvLoveIcon />
          </Link>
          <nav className="lg:flex min-[0px]:hidden grow gap-8 items-center justify-center pl-8">
            <span className="ml-auto"></span>
            <HeaderItem title="Inicia sesión" href="login" />
            <Button
              text="Empresas"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            />
          </nav>
          <div className="lg:hidden min-[0px]:flex gap-4">
            <UserIcon className="h-5 w-5 text-gray-700" />
            <Bars2Icon className="h-5 w-5 text-gray-700" />
          </div>
        </section>
      </div>
    </header>
  );
};

export default AppBar;
