import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface FlashcardUpdate {
  id?: string;
  question: string;
  answer: string;
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId, setId, title, description, flashcards } = body;

    if (!clerkId || !setId) {
      return NextResponse.json({ error: "Missing clerkId or setId" }, { status: 400 });
    }

    // Check ownership
    const existingSet = await prisma.flashcardSet.findUnique({
      where: { id: setId },
      include: { flashcards: true },
    });

    if (!existingSet) {
      return NextResponse.json({ error: "Flashcard set not found" }, { status: 404 });
    }

    if (existingSet.clerkId !== clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update title & description
    await prisma.flashcardSet.update({
      where: { id: setId },
      data: {
        title,
        description,
      },
    });

    // Delete flashcards that were removed
    const existingIds = existingSet.flashcards.map(f => f.id);
    const incomingIds = flashcards.map((f: FlashcardUpdate) => f.id).filter(Boolean);
    const toDelete = existingIds.filter(id => !incomingIds.includes(id));

    if (toDelete.length > 0) {
      await prisma.flashcard.deleteMany({
        where: { id: { in: toDelete } },
      });
    }

    // Upsert incoming flashcards
    // Upsert incoming flashcards
for (const fc of flashcards) {
  if (fc.id) {
    // Update existing
    await prisma.flashcard.update({
      where: { id: fc.id },
      data: { question: fc.question, answer: fc.answer },
    });
  } else {
    // Create new
    await prisma.flashcard.create({
      data: {
        question: fc.question,
        answer: fc.answer,
        flashcardSetId: setId,
        clerkId: clerkId, // must include this!
      },
    });
  }
}


    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
