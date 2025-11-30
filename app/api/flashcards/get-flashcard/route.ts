import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const flashcards = await prisma.flashcard.findMany();

        return NextResponse.json(flashcards, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}