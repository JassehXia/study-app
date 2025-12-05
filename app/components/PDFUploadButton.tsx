"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function PDFUploadButton() {
  return (
    <UploadButton<OurFileRouter, "pdfUploader">
      endpoint="pdfUploader"
      onClientUploadComplete={async (res) => {
        const pdf = res[0]; // what we returned in onUploadComplete
        const pdfUrl = pdf.url;

        // Send URL to summary generator
        const response = await fetch("/api/upload/create-notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdfUrl }),
        });

        const data = await response.json();
        console.log("Notes:", data);
        alert("Notes generated!");
      }}
      onUploadError={(e) => alert(`ERROR: ${e.message}`)}
    />
  );
}
