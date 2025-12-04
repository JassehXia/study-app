import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");
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
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch flashcard sets" }, { status: 500 });
  }
}
