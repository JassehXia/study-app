'use client';

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FlashcardInputCard from "@/app/components/FlashcardInputCard";

interface SavedFlashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  flashcards: SavedFlashcard[];
}

export default function EditFlashcardSetPage() {
  const { setId } = useParams();
  const { user } = useUser();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState<SavedFlashcard[]>([]);
  const [setTitle, setSetTitle] = useState("");
  const [setDescription, setSetDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing flashcard set
  useEffect(() => {
    if (!user || !setId) return;

    const fetchSet = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/flashcard-sets/${setId}?clerkId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch flashcard set");

        const data: FlashcardSet = await res.json();
        setSetTitle(data.title);
        setSetDescription(data.description);
        setFlashcards(data.flashcards.length > 0 ? data.flashcards : [{ id: "", question: "", answer: "" }]);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSet();
  }, [user, setId]);

  // Update a flashcard
  const updateFlashcard = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...flashcards];
    updated[index][field] = value.trimStart();
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

  // Save updated flashcard set
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/flashcards/update-flashcard-set", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          setId,
          title: setTitle || "Untitled Set",
          description: setDescription,
          flashcards: flashcards.filter(fc => fc.question && fc.answer)
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save flashcards");
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error while saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-blue-700">Edit Flashcard Set</h1>

        {error && <p className="text-red-600">{error}</p>}

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
    </main>
  );
}
