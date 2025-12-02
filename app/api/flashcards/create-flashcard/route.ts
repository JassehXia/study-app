import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        //Destructures into variables
        const body = await req.json();
        const { question, answer, clerkId } = body;

        //Throws an error if there are missing fields
        if (!question || !answer || !clerkId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        //Create the flashcard
        const flashcard = await prisma.flashcard.create({
            data: {
                question,
                answer,
                clerkId,
            },
        });

        return NextResponse.json(flashcard, { status: 201 });

        //Error handling
    } catch (err) {
        console.error("Failed to create flashcard:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
