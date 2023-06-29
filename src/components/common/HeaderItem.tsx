import Link from "next/link";

interface Props {
  title: string;
  href: string;
  underline?: boolean;
}

const HeaderItem = ({ title, href, underline }: Props) => {
  const decoration = underline ? "hover:underline" : "";
  return (
    <Link
      href={`/${href}`}
      className={`text-zinc-900 text-base font-medium ${decoration} hover:decoration-2 hover:underline-offset-4`}
    >
      {title}
    </Link>
  );
};

export default HeaderItem;
