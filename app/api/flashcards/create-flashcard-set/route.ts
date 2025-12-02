import { NextResponse } from "next/server";
import prisma from "@/lib/db";

interface FlashcardInput {
    question: string;
    answer: string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { clerkId, title, description, flashcards } = body as {
            clerkId: string;
            title: string;
            description: string;
            flashcards?: FlashcardInput[];
        };

        // Required fields check
        if (!clerkId || !title || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create the flashcard set
        const flashcardSet = await prisma.flashcardSet.create({
            data: {
                title,
                description,
                clerkId, // relation to User
                flashcards: {
                    create: (flashcards || []).map((fc) => ({
                        question: fc.question,
                        answer: fc.answer,
                        clerkId // relate each flashcard to the same user
                    }))
                }
            },
            include: { flashcards: true }
        });

        return NextResponse.json(flashcardSet, { status: 201 });
    } catch (err) {
        console.error("Failed to create flashcard set:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
