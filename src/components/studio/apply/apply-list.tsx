import { ExtendedApply } from "@/types/db";
import { ApplyCard } from "./apply-card";

interface ApplicationProps {
  applies: ExtendedApply[];
}

export function ApplyList({ applies }: ApplicationProps) {
  return (
    <div className="grid grid-cols-fit gap-4 pt-4">
      {applies.map((apply) => (
        <ApplyCard key={apply.userId} apply={apply} />
      ))}
    </div>
  );
}
