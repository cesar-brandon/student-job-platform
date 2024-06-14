import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async ({ req }: { req: Request }) => {
  const session = await getSession();
  if (!session?.user) throw new Error("Unauthorized");
  return { userId: session.user.id };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(auth)
    .onUploadComplete(async ({ metadata, file }) => {}),
  profilePicture: f({ image: { maxFileSize: "2MB" } })
    .middleware(auth)
    .onUploadComplete(async ({ metadata, file }) => {
      await db.user.update({
        where: { id: metadata.userId },
        data: { image: `https://utfs.io/f/${file.key}` },
      });
    }),
  pdfUploader: f({ pdf: { maxFileSize: "2MB" } })
    .middleware(auth)
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
