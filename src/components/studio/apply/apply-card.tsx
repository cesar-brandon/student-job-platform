import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { applyStatusColor, simplifyName } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ApplyStatusRequestBody } from "@/types/apply";
import { ExtendedApply } from "@/types/db";
import { ApplyDisplay } from "./apply-display";

export function ApplyCard({ apply }: { apply: ExtendedApply }) {
  const { userId, postId, status } = apply;

  const { mutate: updateApplyStatus } = useMutation({
    mutationFn: async ({ userId, postId, status }: ApplyStatusRequestBody) => {
      const payload: ApplyStatusRequestBody = { postId, userId, status };
      const { data } = await axios.patch("/api/apply/status/", payload);
      return data;
    },
  });

  return (
    <div className="w-full flex items-center justify-between border rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            className="ring-2"
            src={apply.user.image || ""}
            alt="avatar"
          />
          <AvatarFallback>
            {apply && simplifyName(apply.user.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{apply.user.name}</h3>
          <p className="text-muted-foreground text-opacity-50">
            @{apply.user.username}
          </p>
        </div>
      </div>
      <Badge variant={applyStatusColor[apply.status].variant || "outline"}>
        {applyStatusColor[apply.status].name}
      </Badge>
      <Dialog>
        <DialogTrigger>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (status === "APPLIED") {
                updateApplyStatus({ userId, postId, status: "VIEWED" });
              }
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:min-w-[45rem] h-[80%]">
          <ApplyDisplay updateApplyStatus={updateApplyStatus} apply={apply} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
