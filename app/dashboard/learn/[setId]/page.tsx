'use client';

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  flashcards: Flashcard[];
}

/* ------------------------------ */
/* Shuffle array utility function */
/* ------------------------------ */
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function LearnModePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  const setId = Array.isArray(params.setId) ? params.setId[0] : params.setId;

  const [set, setSet] = useState<FlashcardSet | null>(null);
  const [queue, setQueue] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState<Flashcard | null>(null);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);

  /* ------------------------------ */
  /* Fetch flashcard set and shuffle */
  /* ------------------------------ */
  useEffect(() => {
    if (!user || !setId) return;

    const fetchSet = async () => {
      try {
        const res = await fetch(`/api/user/flashcard-sets/${setId}?clerkId=${user.id}`);
        const data: FlashcardSet = await res.json();

        if (!data.flashcards || data.flashcards.length === 0) return;

        const shuffled = shuffle(data.flashcards);

        setSet(data);
        setCurrent(shuffled[0]);
        setQueue(shuffled.slice(1));

        // Reset all state
        setCorrectCount(0);
        setIncorrectCount(0);
        setCompleted(false);
        setSelectedAnswer(null);
        setShowNext(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSet();
  }, [user, setId]);

  /* ------------------------------ */
  /* Multiple-choice options (shuffled) */
  /* ------------------------------ */
  const choices = useMemo(() => {
    if (!current || !set) return [];
    const wrong = set.flashcards.filter(fc => fc.id !== current.id).map(fc => fc.answer);
    return shuffle([...shuffle(wrong).slice(0, 3), current.answer]);
  }, [current, set]);

  /* ------------------------------ */
  /* Handle answer selection */
  /* ------------------------------ */
  const handleAnswer = (answer: string) => {
    if (!current || selectedAnswer) return;

    setSelectedAnswer(answer);
    setShowNext(true);

    if (answer === current.answer) setCorrectCount(c => c + 1);
    else setIncorrectCount(i => i + 1);
  };

  const goToNextCard = () => {
    if (!current) return;

    const isCorrect = selectedAnswer === current.answer;
    const newQueue = queue.filter(fc => fc.id !== current.id);
    if (!isCorrect) newQueue.push(current); // repeat wrong answer

    if (newQueue.length === 0) setCompleted(true);
    else {
      setQueue(newQueue);
      setCurrent(newQueue[0]);
    }

    setSelectedAnswer(null);
    setShowNext(false);
  };

  if (!set) return <p>Loading...</p>;

  /* ------------------------------ */
  /* Completed Page */
  /* ------------------------------ */
  if (completed) {
    return (
      <main key={setId} className="min-h-screen flex items-center justify-center p-6 bg-blue-50">
        <Card className="p-12 text-center border-2 border-green-300 shadow-xl max-w-2xl w-full">
          <CardTitle className="text-4xl text-green-700 font-bold">Set Completed!</CardTitle>
          <CardContent className="mt-8">
            <p className="text-2xl mb-2">Correct: {correctCount}</p>
            <p className="text-2xl mb-6">Incorrect: {incorrectCount}</p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={() => router.push(`/dashboard/learn/${setId}`)}
              >
                Restart
              </Button>
              <Button
                className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 text-lg"
                onClick={() => router.push('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  /* ------------------------------ */
  /* Main Flashcard Page */
  /* ------------------------------ */
  return (
    <main key={setId} className="min-h-screen flex items-center justify-center p-6 bg-blue-50">
      <Card className="max-w-4xl w-full p-10 border-2 border-blue-300 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-700 mb-6">
            {set.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Question */}
          <div className="mb-8 px-4 py-6 bg-white rounded-lg shadow text-center break-words overflow-auto max-h-64">
            <h2 className="text-2xl font-semibold">{current?.question}</h2>
          </div>

          {/* 2x2 Choices */}
          <div className="grid grid-cols-2 gap-6">
            {choices.map((choice, i) => {
              const isSelected = selectedAnswer === choice;
              const isCorrect = current?.answer === choice;

              let bgClass = "bg-white";
              if (selectedAnswer) {
                if (isSelected && isCorrect) bgClass = "bg-green-300";
                else if (isSelected && !isCorrect) bgClass = "bg-red-300";
                else if (!isSelected && isCorrect) bgClass = "bg-green-200";
              }

              return (
                <Button
                  key={i}
                  className={`w-full h-32 break-words whitespace-normal text-left border border-gray-300 text-black ${bgClass} hover:bg-gray-100`}
                  onClick={() => handleAnswer(choice)}
                  disabled={!!selectedAnswer}
                >
                  {choice}
                </Button>
              );
            })}
          </div>

          {/* Next button */}
          {showNext && (
            <div className="mt-6 flex justify-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={goToNextCard}
              >
                Next
              </Button>
            </div>
          )}

          {/* Stats */}
          <p className="mt-6 text-center text-gray-700 text-lg">
            {correctCount} correct • {incorrectCount} incorrect • {queue.length} left
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
