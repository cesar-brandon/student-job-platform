"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUploadThing } from "@/lib/uploadthing";
import { cn, simplifyName } from "@/lib/utils";
import { user } from "@/types/next-auth";
import Dropzone from "react-dropzone";
import { toast } from "@/hooks/use-toast";
import { Paperclip } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import type { User } from "@prisma/client";

export function AvatarForm({ user }: { user: user }) {
  return (
    <Card>
      <CardContent className="flex justify-between gap-10 pt-6">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-lg font-medium">Avatar</h3>
          <p className="text-sm">
            Este es tu avatar. Haz clic en el avatar para cargar uno
            personalizado desde tus archivos.
          </p>
        </div>
        <AvatarUploader user={user} />
      </CardContent>
      <Separator />
      <CardFooter className="text-sm text-muted-foreground pt-6">
        Un avatar es opcional pero muy recomendable.
      </CardFooter>
    </Card>
  );
}

export function AvatarUploader({ user }: { user: user | User }) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const router = useRouter();

  const { startUpload } = useUploadThing("profilePicture");

  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);
        const interval = startSimulatedProgress();

        const res = await startUpload(acceptedFiles);
        if (!res) {
          console.error(res);
          setIsUploading(false);
          clearInterval(interval);
          return toast({
            title: "Error",
            description: "Hubo un error al subir tu archivo",
            variant: "destructive",
          });
        }
        const [fileResponse] = res;
        const key = fileResponse.key;
        if (!key) {
          setIsUploading(false);
          clearInterval(interval);
          return toast({
            title: "Error",
            description: "Hubo un error al subir tu archivo",
            variant: "destructive",
          });
        }

        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        router.refresh();
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <Avatar
          className="group relative cursor-pointer w-28 h-28 border"
          {...getRootProps()}
        >
          <AvatarImage src={user.image || ""} alt="Foto de perfil" />
          <AvatarFallback>
            {simplifyName(user.name.toUpperCase())}
          </AvatarFallback>
          <div
            className={cn(
              `absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2
                opacity-0 group-hover:opacity-100 bg-background/30 backdrop-blur-md transition-opacity duration-300`,
              isUploading ? "opacity-100" : "",
            )}
          >
            <Paperclip className="w-6 h-6 text-foreground" />
            {isUploading ? (
              <div className="w-full mt-4 max-w-xs mx-auto px-4">
                <Progress value={uploadProgress} className="h-2 w-full" />
              </div>
            ) : (
              <span className="text-xs font-normal text-foreground">
                (máx. 2MB)
              </span>
            )}
          </div>
          <input
            {...getInputProps()}
            type="file"
            id="dropzone-file"
            className="hidden"
          />
        </Avatar>
      )}
    </Dropzone>
  );
}
