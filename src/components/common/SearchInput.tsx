import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface Props {
  placeholder: string
}

// Puesto, empresa o palabra clave
const SearchInput: React.FC<Props> = ({ placeholder }) => {
  return (

    <div className="py-4 z-10">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          id="table-search"
          className="bg-white border-none outline-none text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default SearchInput

