import { ApplyStatus } from "@prisma/client";

interface ApplyStatusRequestBody {
  userId: string;
  postId: string;
  status: ApplyStatus;
}
