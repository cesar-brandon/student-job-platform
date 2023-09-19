import Link from "next/link";

interface Props {
  title: string;
  href: string;
  underline?: boolean;
  button?: boolean;
}

const HeaderItem = ({ title, href, underline, button }: Props) => {
  const decoration = underline ? "hover:underline" : "";
  return (
    <Link
      href={`/${href}`}
      className={
        button
          ? "bg-orange hover:bg-orange/90 text-white font-bold text-lg py-4 px-8 rounded-full"
          : `text-zinc-900 text-base font-medium ${decoration} hover:decoration-2 hover:underline-offset-4`
      }
    >
      {title}
    </Link>
  );
};

export default HeaderItem;
