"use client"
import SearchBar from "./SearchBar"
import { usePathname } from 'next/navigation'

const AsideFeedHeader = () => {
  const currentPath = usePathname()

  if (currentPath !== '/explore') {
    return (
      <div className="flex flex-col">
        <SearchBar />
      </div>
    )
  }

  return null
}

export default AsideFeedHeader
