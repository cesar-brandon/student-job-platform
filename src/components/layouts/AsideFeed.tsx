import SearchInput from "../common/SearchInput";

const AsideFeed = () => {
  return (
    <div className="w-[25%] p-4 hidden xl:block">
      <SearchInput placeholder="Empresas" />
      <div className="bg-white min-h-[30rem] rounded-xl p-6 font-semibold">
        Empresas
      </div>
    </div>
  );
};

export default AsideFeed;
