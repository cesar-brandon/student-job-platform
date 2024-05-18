import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyStatus } from "@prisma/client";
import { ExtendedApply } from "@/types/db";
import { StudentProfile } from "@/components/profile/student-profile";

interface ApplyDisplayProps {
  apply: ExtendedApply;
  updateApplyStatus: (data: {
    userId: string;
    postId: string;
    status: ApplyStatus;
  }) => void;
}

export function ApplyDisplay({ apply, updateApplyStatus }: ApplyDisplayProps) {
  const { userId, postId, status } = apply;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Select
          defaultValue={status !== "VIEWED" ? status : undefined}
          onValueChange={(value: ApplyStatus) => {
            updateApplyStatus({ userId, postId, status: value });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Considerar como" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Solo visible para usted</SelectLabel>
              <SelectItem value="ACCEPTED">Aceptar</SelectItem>
              <SelectItem value="PENDING">Considerar</SelectItem>
              <SelectItem value="REJECTED">No encaja</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <StudentProfile userId={userId} />
    </div>
  );
}
