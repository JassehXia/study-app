'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

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
  const { setId } = useParams();
  const { user } = useUser();
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const currentCard = flashcardSet.flashcards[currentIndex];

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcardSet.flashcards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) =>
      prev === 0 ? flashcardSet.flashcards.length - 1 : prev - 1
    );
  };

  const toggleAnswer = () => setShowAnswer(!showAnswer);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-white via-blue-50 to-green-50 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{flashcardSet.title}</h1>
      <p className="text-gray-700 mb-6">{flashcardSet.description}</p>

      <div className="w-80 h-48 mb-6 perspective flex items-center justify-center">
        <div
          className={`relative w-full h-full transition-transform duration-500 transform ${showAnswer ? "rotate-y-180" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-white border-2 border-blue-200 rounded-lg shadow-md flex items-center justify-center p-4 backface-hidden">
            <p className="text-xl font-semibold text-blue-700">{currentCard.question}</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-white border-2 border-blue-200 rounded-lg shadow-md flex items-center justify-center p-4 rotate-y-180 backface-hidden">
            <p className="text-xl text-gray-700">{currentCard.answer}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          onClick={prevCard}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          onClick={toggleAnswer}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          onClick={nextCard}
        >
          Next
        </button>
      </div>

      <p className="text-gray-500">
        Card {currentIndex + 1} of {flashcardSet.flashcards.length}
      </p>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </main>
  );
}
