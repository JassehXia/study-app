// GET /api/flashcards/sets
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const clerkId = searchParams.get("clerkId");

        if (!clerkId) {
            return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
        }

        const sets = await prisma.flashcardSet.findMany({
            where: { clerkId },
            include: { flashcards: true },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(sets, { status: 200 });
    } catch (err) {
        console.error("Failed to fetch flashcard sets:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
