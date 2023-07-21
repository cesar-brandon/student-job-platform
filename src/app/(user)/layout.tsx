import "../globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-gray-100">{children}</div>;
}
