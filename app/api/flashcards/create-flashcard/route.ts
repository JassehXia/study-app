import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { question, answer, userId } = body;

        if (!question || !answer || !userId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const flashcard = await prisma.flashcard.create({
            data: {
                question,
                answer,
                userId,
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
