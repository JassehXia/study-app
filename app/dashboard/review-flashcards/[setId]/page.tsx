'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

export default function ReviewFlashcardSetPage() {
  const { setId } = useParams(); // id from URL
  const { user } = useUser();
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);

  useEffect(() => {
    if (!user || !setId) return;

    const fetchSet = async () => {
      try {
        const res = await fetch(`/api/user/flashcard-sets/${setId}?clerkId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch flashcard set");
        const data: FlashcardSet = await res.json();
        setFlashcardSet(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSet();
  }, [user, setId]);

  if (!flashcardSet) return <p>Loading...</p>;

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-white via-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">{flashcardSet.title}</h1>
        <p className="text-gray-700">{flashcardSet.description}</p>

        <div className="space-y-4">
          {flashcardSet.flashcards.map(fc => (
            <Card key={fc.id} className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700">{fc.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{fc.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
