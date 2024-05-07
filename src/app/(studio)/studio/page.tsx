import { cookies } from "next/headers";
import { Studio } from "@/components/studio/studio";

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <div className="hidden flex-col md:flex">
      <Studio defaultLayout={defaultLayout} />
    </div>
  );
}
