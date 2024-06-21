"use client";

import { useState } from "react";
import { Check, FileText, Paperclip } from "lucide-react";
import Dropzone from "react-dropzone";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "@/hooks/use-toast";

export function PDFUploader({ sectionCv }: { sectionCv?: any }) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload } = useUploadThing("pdfUploader");

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
      onDrop={async (acceptedFile) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();

        const res = await startUpload(acceptedFile);
        if (!res) {
          setIsUploading(false);
          return toast({
            title: "Error",
            description: "Hubo un error al subir tu archivo",
            variant: "destructive",
          });
        }
        const [fileResponse] = res;
        const key = fileResponse?.key;
        if (!key) {
          setIsUploading(false);
          return toast({
            title: "Error",
            description: "Hubo un error al subir tu archivo",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        setIsUploading(false);

        // sectionCv(acceptedFile);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="w-full bg-background border border-dashed hover:border-solid border-primary rounded-sm 
          flex items-center justify-center p-6 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-center gap-4 justify-center w-full text-center cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <Paperclip className="w-6 h-6 text-primary" />
              <p className="flex flex-col gap-1 text-sm font-semibold text-muted-foreground">
                Carga tu currículum aquí
                <span className="text-xs font-normal text-muted-foreground">
                  PDF (máx. 2MB)
                </span>
              </p>
            </div>
            {acceptedFiles && acceptedFiles[0] ? (
              <div className="max-w-xs flex items-center gap-2 p-2 rounded-sm bg-accent border">
                <div className="px-3 py-2 h-full grid place-items-center border-r-[1px]">
                  {isUploading ? (
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="px-3 py-2 h-full text-xs font-medium text-muted-foreground truncate">
                  {acceptedFiles[0].name}
                </p>
              </div>
            ) : null}

            {isUploading ? (
              <div className="w-full mt-4 max-w-xs mx-auto">
                <Progress value={uploadProgress} className="h-2 w-full" />
              </div>
            ) : null}
          </div>
          <input {...getInputProps()} type="file" className="hidden" />
        </div>
      )}
    </Dropzone>
  );
}
