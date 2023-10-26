import React from "react";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { IfvLoveIcon } from "../common/icons";
import ButtonLink from "../common/button-link";

const AppBar = () => {
  return (
    <header className="relative z-10">
      <div className="xl:w-[1440px] lg:w-[1024px] min-[0px]:w-[480px] max-w-full mr-auto ml-auto lg:px-8 xl:px-16 px-6">
        <section className="flex items-center justify-center min-[0px]:justify-between min-[0px]:min-h-[4rem] lg:min-h-[7.5rem]">
          <Link
            className="relative lg:grow lg:max-w-[7.5rem] min-[0px]:max-w-[5rem] lg:p-0 "
            href="/"
            aria-label="ifv"
          >
            <IfvLoveIcon />
          </Link>
          <nav className="hidden lg:flex grow gap-3 items-center justify-center pl-8">
            <span className="ml-auto"></span>
            <ButtonLink href="/login" text="Inicia sesión" ariaLabel="Mi cuenta" variant="outline" className="hover:border-primary" />
            <ButtonLink href="/login-enterprise" text="Empresas" ariaLabel="Login empresas"
              className="group"
              icon={<ArrowLongRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-all duration-300" />} />
          </nav>
        </section>
      </div>
    </header>
  );
};

export default AppBar;
