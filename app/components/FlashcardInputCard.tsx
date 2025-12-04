'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
    index: number;
    question: string;
    answer: string;
    onChange: (index: number, field: "question" | "answer", value: string) => void;
    onDelete: (index: number) => void;
}

export default function FlashcardInputCard({ index, question, answer, onChange, onDelete }: Props) {
    return (
        <Card className="border-green-300 bg-white shadow-md">
            <CardContent className="space-y-3">
                <input
                    type="text"
                    placeholder="Question"
                    className="w-full p-2 border border-green-300 rounded-lg"
                    value={question}
                    onChange={(e) => onChange(index, "question", e.target.value)}
                />
                <textarea
                    placeholder="Answer"
                    className="w-full p-2 border border-green-300 rounded-lg"
                    rows={2}
                    value={answer}
                    onChange={(e) => onChange(index, "answer", e.target.value)}
                />
                <Button variant="destructive" onClick={() => onDelete(index)} className="mt-2 hover:bg-red-600 dark:hover:bg-red-700 cursor-pointer">
                    Remove
                </Button>
            </CardContent>
        </Card>
    );
}
