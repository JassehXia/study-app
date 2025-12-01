'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
    const { user } = useUser();
    // Placeholder flashcards and notes
    const flashcards = [
        { id: "1", question: "Biology Chapter 1", answer: "Cells, DNA, etc." },
        { id: "2", question: "Psych 1100 Terms", answer: "Cognition, Memory, etc." },
    ];

    const notes = [
        { id: "1", title: "Chem Lecture Notes", content: "Atomic structure, reactions..." },
        { id: "2", title: "History 101 Summary", content: "Revolutions, wars..." },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-green-50 p-6">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* HEADER */}
                <section>
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
                        Welcome, {user?.firstName}
                    </h1>
                    <p className="text-gray-700 mt-2">
                        Here’s your personal study dashboard.
                    </p>
                </section>

                {/* FLASHCARDS */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-blue-700">Flashcards</h2>
                        <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md">
                            Create Flashcard
                        </Button>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        {flashcards.map(fc => (
                            <Card key={fc.id} className="border-2 border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-blue-700">{fc.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-700">{fc.answer}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </section>

                {/* NOTES */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-green-700">Notes</h2>
                        <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-lg shadow-md">
                            Create Note
                        </Button>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        {notes.map(note => (
                            <Card key={note.id} className="border-2 border-green-200 hover:shadow-xl transition-all hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-green-700">{note.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-700">{note.content}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </section>

                {/* PLACEHOLDER FOR FUTURE SECTIONS */}
                <section className="text-center py-12">
                    <p className="text-gray-500">More features coming soon...</p>
                </section>

            </div>
        </main>
    );
}
