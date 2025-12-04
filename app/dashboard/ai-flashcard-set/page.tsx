'use client';

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import FlashcardInputCard from "@/app/components/FlashcardInputCard";
import { useRouter } from "next/navigation";

interface SavedFlashcard {
  id: string;
  question: string;
  answer: string;
}

// Helper to parse and trim GPT notes
function parseFlashcards(notes: string): SavedFlashcard[] {
  return notes
    .split(/\n\s*\n/)            // split by blank lines
    .map(card => card.trim())     // trim card
    .filter(Boolean)
    .map(card => {
      const lines = card
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);
      if (lines.length >= 2) {
        return { id: "", question: lines[0], answer: lines.slice(1).join("\n") };
      }
      return { id: "", question: lines[0], answer: "" };
    });
}

export default function UploadFlashcardsPage() {
  const { user } = useUser();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [flashcards, setFlashcards] = useState<SavedFlashcard[]>([{ id: "", question: "", answer: "" }]);
  const [setTitle, setSetTitle] = useState("");
  const [setDescription, setSetDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update flashcard
  const updateFlashcard = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...flashcards];
    updated[index][field] = value.trimStart(); // trim leading whitespace as user types
    setFlashcards(updated);
  };

  // Remove flashcard
  const removeFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  // Add empty flashcard
  const addFlashcard = () => {
    setFlashcards([...flashcards, { id: "", question: "", answer: "" }]);
  };

  // Upload PDF and generate flashcards
  const handleUpload = async () => {
    if (!file || !user) {
      setError("Please select a PDF and make sure you are logged in.");
      return;
    }

    setError(null);
    setLoading(true);
    setFlashcards([]);
    setSetTitle(file.name.replace(/\.[^/.]+$/, ""));
    setSetDescription("Flashcards generated from PDF");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("clerkId", user.id);
      formData.append("title", file.name);
      formData.append("description", setDescription);


      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`);

      const data: { notes: string } = await uploadRes.json();
      const parsed = parseFlashcards(data.notes);

      setFlashcards(parsed.length > 0 ? parsed : [{ id: "", question: "", answer: "" }]);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Save all flashcards
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);

    try {
      const saveRes = await fetch("/api/flashcards/create-flashcard-set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          title: setTitle || "Untitled Set",
          description: setDescription,
          flashcards: flashcards.filter(fc => fc.question && fc.answer)
        }),
      });

      if (!saveRes.ok) {
        const errData = await saveRes.json();
        throw new Error(errData.error || "Failed to save flashcards");
      }

      router.push("/dashboard");
      setFlashcards([{ id: "", question: "", answer: "" }]);
      setFile(null);
      setSetTitle("");
      setSetDescription("");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-blue-700">Upload PDF & Create Flashcards</h1>

        {/* Upload PDF */}
        <input
          type="file"
          accept="application/pdf"
          className="w-full p-3 border border-blue-300 rounded-lg"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <Button
          className="bg-green-500 text-white mt-2"
          onClick={handleUpload}
          disabled={loading || !file || !user}
        >
          {loading ? "Processing..." : "Upload PDF"}
        </Button>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {/* Flashcard set editing */}
        {flashcards.length > 0 && (
          <div className="space-y-4 mt-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Set Title"
                className="w-full p-3 border border-blue-300 rounded-lg"
                value={setTitle}
                onChange={(e) => setSetTitle(e.target.value)}
              />
              <textarea
                placeholder="Set Description"
                className="w-full p-3 border border-blue-300 rounded-lg"
                value={setDescription}
                onChange={(e) => setSetDescription(e.target.value)}
              />
            </div>

            {/* Flashcard Inputs */}
            {flashcards.map((fc, i) => (
              <FlashcardInputCard
                key={i}
                index={i}
                question={fc.question}
                answer={fc.answer}
                onChange={updateFlashcard}
                onDelete={removeFlashcard}
              />
            ))}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <Button onClick={addFlashcard} className="bg-blue-100 text-blue-700">
                Add Flashcard
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-500 text-white"
                disabled={saving || flashcards.length === 0}
              >
                {saving ? "Saving..." : "Save All Flashcards"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
