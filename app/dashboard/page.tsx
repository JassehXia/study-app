'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
}

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchSets = async () => {
      try {
        const res = await fetch(`/api/user/flashcard-sets?clerkId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch flashcard sets");
        const data: FlashcardSet[] = await res.json();
        setFlashcardSets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, [user]);

  const openModal = (set: FlashcardSet) => {
    setSelectedSet(set);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSet(null);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HEADER */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
            Welcome, {user?.firstName}
          </h1>
          <p className="text-gray-700 mt-2">Here’s your personal study dashboard.</p>
        </section>

        {/* FLASHCARD SETS */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-blue-700">Flashcard Sets</h2>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md"
              onClick={() => router.push('/dashboard/create-flashcard-set')}
            >
              Create Flashcard
            </Button>
          </div>

          {loading ? (
            <p>Loading flashcard sets...</p>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {flashcardSets.map((set) => (
                <Card
                  key={set.id}
                  className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() => openModal(set)}
                >
                  <CardHeader>
                    <CardTitle className="text-blue-700">{set.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700">{set.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </section>

        {/* MODAL */}
        {selectedSet && (
          <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedSet.title}>
            <p className="text-gray-700 mb-6">{selectedSet.description}</p>

            <div className="flex flex-col gap-4">
              <Button
                className="bg-green-500 text-white w-full"
                onClick={() => router.push(`/dashboard/learn/${selectedSet.id}`)}
              >
                Learn Mode
              </Button>

              <Button
                className="bg-blue-500 text-white w-full"
                onClick={() => router.push(`/dashboard/review-flashcards/${selectedSet.id}`)}
              >
                Review
              </Button>

              <Button
                className="bg-blue-500 text-white w-full"
                onClick={() => router.push(`/dashboard/edit-flashcard-set/${selectedSet.id}`)}
              >
                Edit
              </Button>

              <Button
                className="bg-red-500 text-white w-full"
                onClick={async () => {
                  if (!selectedSet || !confirm("Are you sure you want to delete this flashcard set?")) return;
                  try {
                    const res = await fetch(`/api/flashcards/delete-flashcard-set/${selectedSet.id}`, { method: "DELETE" });
                    if (!res.ok) throw new Error("Failed to delete flashcard set");
                    setFlashcardSets(prev => prev.filter(set => set.id !== selectedSet.id));
                    closeModal();
                  } catch (err) {
                    alert((err as Error).message);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
}
