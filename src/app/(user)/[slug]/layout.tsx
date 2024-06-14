export default function ProfileLayout({
  resume,
  children,
}: {
  resume: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {resume}
      {children}
    </>
  );
}
