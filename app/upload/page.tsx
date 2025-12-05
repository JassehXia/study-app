import PDFUploadButton from "../components/PDFUploadButton";

export default function UploadPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload a PDF</h1>
      <PDFUploadButton />
    </div>
  );
}
