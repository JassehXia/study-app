'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import FlashcardInputCard from "@/app/components/FlashcardInputCard";
import FlashcardDisplayCard from "@/app/components/FlashcardDisplayCard";

interface FlashcardInput {
    question: string;
    answer: string;
}

interface Flashcard {
    id: string;
    question: string;
    answer: string;
}

interface FlashcardSet {
    id: string;
    title: string;
    description: string;
    flashcards: Flashcard[];
}

export default function CreateFlashcardSetPage() {
    const router = useRouter();
    const { user } = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [flashcards, setFlashcards] = useState<FlashcardInput[]>([
        { question: "", answer: "" }
    ]);
    const [loading, setLoading] = useState(false);
    const [createdSet, setCreatedSet] = useState<FlashcardSet | null>(null);


    // Add new flashcard
    const addFlashcard = () => setFlashcards([...flashcards, { question: "", answer: "" }]);

    // Update flashcard
    const updateFlashcard = (index: number, field: "question" | "answer", value: string) => {
        const updated = [...flashcards];
        updated[index][field] = value;
        setFlashcards(updated);
    };

    // Remove flashcard
    const removeFlashcard = (index: number) => {
        setFlashcards(flashcards.filter((_, i) => i !== index));
    };

    // Submit flashcard set
    const handleSubmit = async () => {
        if (!user) return;

        setLoading(true);

        try {
            const response = await fetch("/api/flashcards/create-flashcard-set", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clerkId: user.id,
                    title,
                    description,
                    flashcards: flashcards.filter(fc => fc.question && fc.answer)
                })
            });

            const data: FlashcardSet = await response.json();

            if (!response.ok) {
                console.error("Failed to create flashcard set", data);
            } else {
                setCreatedSet(data);
                setTitle("");
                setDescription("");
                setFlashcards([{ question: "", answer: "" }]);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            router.push("/dashboard")

        }
    };


    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-blue-700">Create Flashcard Set</h1>

                {/* Set Info */}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Set Title"
                        className="w-full p-3 border border-blue-300 rounded-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Set Description"
                        className="w-full p-3 border border-blue-300 rounded-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Flashcard Inputs */}
                <div className="space-y-4">
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
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <Button onClick={addFlashcard} className="bg-blue-100 text-blue-700">
                        Add Flashcard
                    </Button>
                    <Button onClick={handleSubmit} className="bg-green-500 text-white" disabled={loading}>
                        {loading ? "Creating..." : "Create Set"}
                    </Button>
                </div>



            </div>
        </main>
    );
}
