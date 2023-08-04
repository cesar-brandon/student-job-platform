import React from "react";
import Link from "next/link";
import { Bars2Icon, UserIcon } from "@heroicons/react/24/outline";
import HeaderItem from "../common/HeaderItem";
import Button from "../common/Button";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 381 155"
              fill="none"
              className="w-[5rem] lg:w-[7.5rem] lg:p-0"
            >
              <path
                d="M26.0455 30.9091V124H9.18182V30.9091H26.0455Z"
                fill="#3b82f6"
              />
              <path
                d="M204.045 30.9091V124H187.182V30.9091H204.045ZM222.307 124V30.9091H281.943V45.0455H239.17V70.3182H277.852V84.4545H239.17V124H222.307ZM309.761 30.9091L333.989 104.182H334.943L359.125 30.9091H377.67L344.852 124H324.034L291.261 30.9091H309.761Z"
                fill="#3b82f6"
              />
              <path
                d="M107.5 124L100.178 117.31C74.17 93.642 57 77.9815 57 58.8747C57 43.2142 69.221 31 84.775 31C93.562 31 101.996 35.1052 107.5 41.5417C113.005 35.1052 121.438 31 130.225 31C145.779 31 158 43.2142 158 58.8747C158 77.9815 140.83 93.642 114.823 117.31L107.5 124Z"
                fill="#DC2626"
              />
            </svg>
          </Link>
          <nav className="lg:flex min-[0px]:hidden grow gap-8 items-center justify-center pl-8">
            <HeaderItem title="Inicio" href="" underline />
            <HeaderItem title="Estudiantes" href="" underline />
            <HeaderItem title="Blog" href="blog" underline />
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
