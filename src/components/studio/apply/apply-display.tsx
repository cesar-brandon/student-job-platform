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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { applyStatusColor } from "@/lib/utils";

interface ApplyDisplayProps {
  isLoading: boolean;
  apply: ExtendedApply;
  updateApplyStatus: (data: {
    userId: string;
    postId: string;
    status: ApplyStatus;
  }) => void;
}

export function ApplyDisplay({
  isLoading,
  apply,
  updateApplyStatus,
}: ApplyDisplayProps) {
  const { userId, postId } = apply;

  const { data: student } = useQuery({
    queryKey: ["student", userId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/student/${userId}`);
      return data;
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Select
          onValueChange={(value: ApplyStatus) => {
            updateApplyStatus({ userId, postId, status: value });
          }}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Considerar como" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Solo visible para usted</SelectLabel> */}
              <SelectItem value={ApplyStatus.ACCEPTED}>Aceptar</SelectItem>
              <SelectItem value={ApplyStatus.PENDING}>Considerar</SelectItem>
              <SelectItem value={ApplyStatus.REJECTED}>No encaja</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {isLoading ? (
          <Skeleton className="h-6 w-20" />
        ) : (
          <Badge variant={applyStatusColor[apply.status].variant || "outline"}>
            {applyStatusColor[apply.status].name}
          </Badge>
        )}
      </div>
      <StudentProfile student={student} />
    </div>
  );
}
