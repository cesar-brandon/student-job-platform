import { ExtendedApply } from "@/types/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { simplifyName } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleMinus, CircleX, Eye } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UserProfile } from "../profile/user-profile";
import { ProfileTabs } from "../profile/profile-tabs";

interface ApplicationProps {
  applies: ExtendedApply[];
}

export function ApplyList({ applies }: ApplicationProps) {
  return (
    <div className="grid grid-cols-fit gap-4 pt-4">
      {applies.map((apply) => (
        <>
          <ApplyCard key={apply.userId} apply={apply} />
          <ApplyCard key={apply.userId} apply={apply} />
          <ApplyCard key={apply.userId} apply={apply} />
          <ApplyCard key={apply.userId} apply={apply} />
        </>
      ))}
    </div>
  );
}

function ApplyCard({ apply }: { apply: ExtendedApply }) {
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
      <Badge>{apply.status}</Badge>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:min-w-[45rem] h-[80%] flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <CircleCheck className="h-5 w-5" />
              <span className="sr-only">Editar</span>
            </Button>
            <Button variant="outline" size="icon">
              <CircleMinus className="h-5 w-5" />
              <span className="sr-only">Editar</span>
            </Button>
            <Button variant="outline" size="icon">
              <CircleX className="h-5 w-5" />
              <span className="sr-only">Editar</span>
            </Button>
          </div>
          <UserProfile user={apply.user} />
          <div className="flex items-start justify-between">
            <ProfileTabs />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
