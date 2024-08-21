"use client";
import { ExtendedApplyPost } from "@/types/db";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { NoItems } from "@/components/common/no-items";
import { Link } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { applyStatusColor } from "@/lib/utils";
import { ApplyStatus } from "@prisma/client";
import { Button } from "../ui/button";
import confirmApplication from "@/actions/post/apply/confirm-application";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ApplyList({ userId }: { userId: string }) {
  const { data: applications, isLoading } = useQuery(["applies"], async () => {
    const { data } = await axios.get(`/api/user/${userId}/apply`);
    return data;
  });

  return (
    <>
      {applications && applications.length > 0 ? (
        <div className="flex flex-col gap-4">
          {applications.map((apply: ExtendedApplyPost) => (
            <AppliedItem key={apply.postId} apply={apply} />
          ))}
        </div>
      ) : isLoading ? (
        <div className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="w-full p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="m-4">
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
      ) : (
        <NoItems text="No tienes puestos aplicados" />
      )}
    </>
  );
}

function AppliedItem({ apply }: { apply: ExtendedApplyPost }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await confirmApplication(apply.postId, apply.userId);
      queryClient.invalidateQueries(["applies"]);
    } catch (error) {
      toast({
        description: "No se pudo confirmar la aplicacion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
      <Link
        href={`/${apply.Post.author.username}/post/${apply.postId}`}
        className="w-full flex justify-between items-center"
      >
        <div className="w-full p-4">
          {apply.Post.title}
          <p className="text-sm">{apply.Post.author.name}</p>
          <p className="text-sm dark:font-thin font-light">
            Aplicado el {new Date(apply.createdAt).toLocaleDateString()}
          </p>
        </div>

        <Badge
          variant={applyStatusColor[apply.status].variant}
          className="m-4 flex"
        >
          {applyStatusColor[apply.status].name}
        </Badge>
      </Link>
      {apply.status === ApplyStatus.ACCEPTED && (
        <Button className="m-4" onClick={handleConfirm} isLoading={isLoading}>
          Confirmar postulación
        </Button>
      )}
    </div>
  );
}
