import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { question, answer, clerkId, flashcardSetId } = body;

        if (!question || !answer || !clerkId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const flashcard = await prisma.flashcard.create({
            data: {
                question,
                answer,
                user: {
                    connectOrCreate: {
                        where: { clerkId },
                        create: { clerkId }
                    }
                },
                flashcardSet: flashcardSetId
                    ? { connect: { id: flashcardSetId } }
                    : undefined
            },
        });

        return NextResponse.json(flashcard, { status: 201 });
    } catch (err) {
        console.error("Failed to create flashcard:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
