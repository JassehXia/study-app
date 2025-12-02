'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    question: string;
    answer: string;
}

export default function FlashcardDisplayCard({ question, answer }: Props) {
    return (
        <Card className="border-2 border-blue-200">
            <CardHeader>
                <CardTitle className="text-blue-700">{question}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700">{answer}</p>
            </CardContent>
        </Card>
    );
}
