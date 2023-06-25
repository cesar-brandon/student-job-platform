import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

const HeaderItem = ({ title, href }: Props) => {
  return (
    <Link
      href={`/${href}`}
      className="text-zinc-900 text-base font-medium hover:underline hover:decoration-2 hover:underline-offset-4"
    >
      {title}
    </Link>
  );
};

export default HeaderItem;
