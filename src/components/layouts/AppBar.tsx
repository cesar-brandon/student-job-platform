import React from "react";
import Button from "@/common/Button";
import HeaderItem from "@/common/HeaderItem";
import Link from "next/link";

const AppBar = () => {
  return (
    <header className="relative z-10">
      <div className="xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16">
        <section className="flex items-center justify-center min-h-[7.5rem]">
          <Link
            className="relative grow max-w-[7.5rem]"
            href="/"
            aria-label="ifv"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              viewBox="0 0 381 155"
              fill="none"
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
          <nav className="lg:flex grow gap-8 items-center justify-center pl-8">
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
        </section>
      </div>
    </header>
  );
};

export default AppBar;
