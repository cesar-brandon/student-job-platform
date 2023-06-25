import React from "react";
import Button from "@/common/Button";
import SinginButton from "@/common/SigninButton";
import HeaderItem from "@/common/HeaderItem";

const AppBar = () => {
  return (
    <header className="relative z-10">
      <div className="xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16">
        <section className="flex items-center justify-center min-h-[7.5rem]">
          <a
            className="relative grow max-w-[7.5rem]"
            aria-label="Codely"
            href="/"
          >
            Icon SVG
          </a>
          <nav className="lg:flex grow gap-8 items-center justify-center pl-8">
            <HeaderItem title="Inicio" href="" />
            <HeaderItem title="Estudiantes" href="" />
            <HeaderItem title="Empleos" href="" />
            <span className="ml-auto"></span>
            <SinginButton />
            <Button
              text="Empresas"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            />
          </nav>
        </section>
      </div>
    </header>
  );
};

export default AppBar;
