import Link from "next/link";

interface Props {
  name: string;
  icon: React.JSX.Element;
  to: string;
}

const SidebarNavItem: React.FC<Props> = ({ name, icon, to }) => {
  return (
    <Link href={to} className="w-full h-10 flex gap-4 items-center p-6 hover:bg-gray-200 rounded-full cursor-pointer">
      {icon}
      <p className="font-medium">{name}</p>
    </Link>
  )

}


export default SidebarNavItem
