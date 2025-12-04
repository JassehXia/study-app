'use client';
import { useState } from "react";

interface SavedFlashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardSetResponse {
  id: string;
  title: string;
  description: string;
  flashcards: SavedFlashcard[];
}

export default function UploadPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [flashcards, setFlashcards] = useState<SavedFlashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    setError(null);
    setLoading(true);
    setFlashcards([]);

    try {
      // 1️⃣ Upload PDF to Express GPT endpoint
      const formData = new FormData();
      formData.append("file", file);
      formData.append("clerkId", "test-user-id"); // replace with actual user
      formData.append("title", file.name);
      formData.append("description", "Uploaded via test page");

      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed with status ${uploadRes.status}`);
      }

      const data: { notes: string } = await uploadRes.json();
      const notes: string = data.notes;

      if (!notes) throw new Error("No notes returned from GPT");

      // 2️⃣ Convert GPT notes into flashcard objects
      const flashcardsData: SavedFlashcard[] = notes
        .split(/\n\s*\n/)
        .map((fc: string) => fc.trim())
        .filter((fc: string) => fc.length > 0)
        .map((fc: string) => ({
          id: "", // will be replaced by backend
          question: fc.split("\n")[0],
          answer: fc.split("\n").slice(1).join("\n"),
        }));

      if (flashcardsData.length === 0) {
        throw new Error("No flashcards parsed from GPT notes");
      }

      // 3️⃣ Send flashcards as a set to your Next.js API
      const setTitle = file.name.replace(/\.[^/.]+$/, ""); // filename without extension
      const setDescription = "Flashcards generated from uploaded PDF";

      const saveRes = await fetch("/api/flashcards/create-flashcard-set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: "user_35oVOg022g7JwBM8uegqWPDgLsM",
          title: setTitle,
          description: setDescription,
          flashcards: flashcardsData,
        }),
      });

      if (!saveRes.ok) {
        const errData: { error?: string } = await saveRes.json();
        throw new Error(errData.error || "Failed to save flashcard set");
      }

      const savedSet: FlashcardSetResponse = await saveRes.json();
      setFlashcards(savedSet.flashcards);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>PDF Upload & Flashcard Generator</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        style={{ display: "block", marginTop: "1rem" }}
      />

      <button
        onClick={handleUpload}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        disabled={loading || !file}
      >
        {loading ? "Processing..." : "Upload PDF & Generate Flashcards"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {flashcards.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Generated Flashcards</h2>
          {flashcards.map((fc, i) => (
            <div
              key={fc.id || i}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                background: "#f9f9f9",
                whiteSpace: "pre-wrap",
              }}
            >
              <div><strong>Q:</strong> {fc.question}</div>
              <div><strong>A:</strong> {fc.answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
