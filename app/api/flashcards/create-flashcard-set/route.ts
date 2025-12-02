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

        if (!clerkId || !title || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const flashcardSet = await prisma.flashcardSet.create({
            data: {
                title,
                description,
                User: {
                    connectOrCreate: {
                        where: { clerkId },
                        create: { clerkId }
                    }
                },
                flashcards: {
                    create: (flashcards || []).map((fc: FlashcardInput) => ({
                        question: fc.question,
                        answer: fc.answer,
                        user: { connect: { clerkId } } // ✅ required relation
                    }))
                }
            },
            include: { flashcards: true }
        });

        return NextResponse.json(flashcardSet, { status: 201 });
    } catch (err) {
        console.error("Failed to create flashcard set:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
