import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { parseFlashcards } from "@/lib/parseFlashcards";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId, notes, flashcardSetId } = body;

    if (!clerkId || !notes) {
      return NextResponse.json({ message: "Missing clerkId or notes" }, { status: 400 });
    }

    const flashcardsData = parseFlashcards(notes);

    const created = await prisma.flashcard.createMany({
      data: flashcardsData.map(fc => ({
        clerkId,
        question: fc.question,
        answer: fc.answer,
        flashcardSetId: flashcardSetId || null,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: "Flashcards saved successfully",
      count: created.count,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error saving flashcards" }, { status: 500 });
  }
}
