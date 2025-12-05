import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const f = createUploadthing();


export const ourFileRouter = {

  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
    },
  })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) {
        throw new Error("Not authenticated");
      }
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const saved = await prisma.pdf.create({
          data: {
            clerkId: metadata.userId,
            name: file.name,
            url: file.ufsUrl,
          },
        });
        console.log("PDF saved to DB:", saved);
      } catch (err) {
        console.error("Failed to save PDF:", err);
      }

      return { uploaded: true };
    }),


} satisfies FileRouter;


export type OurFileRouter = typeof ourFileRouter;

