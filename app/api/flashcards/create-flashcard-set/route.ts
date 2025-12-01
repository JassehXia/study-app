import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, title, description } = body;

        const flashcardSet = await prisma.flashcardSet.create({
            data: {
                title,
                description,
                userId
            }
        });

        return NextResponse.json(flashcardSet, { status: 201 });
    } catch (err) {
        console.error("Failed to create flashcard set:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });

    }
}