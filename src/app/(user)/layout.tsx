import "../globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black lg:bg-gray-100">
      <main
        vaul-drawer-wrapper=""
        className="bg-white sm:bg-gray-100 xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16 flex justify-center"
      >
        {children}
      </main>
    </div>
  );
}
