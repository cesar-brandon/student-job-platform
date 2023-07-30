import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/api/uploadthing/core";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
