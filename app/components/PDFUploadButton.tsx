"use client";

import { UploadButton } from "@uploadthing/react";
import { type OurFileRouter } from "@/app/api/uploadthing/core";

export default function PDFUploadButton() {
  return (
    <UploadButton<OurFileRouter, "pdfUploader">
      endpoint="pdfUploader"
      onClientUploadComplete={() => {
        alert("Upload complete!");
      }}
      onUploadError={(e) => {
        alert(`ERROR: ${e.message}`);
      }}
    />
  );
}
