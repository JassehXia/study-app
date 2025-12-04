import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface Context {
  params: {
    setId: string;
  };
}

export async function DELETE(req: NextRequest, context: Context) {
  // Unwrap the promise
  const params = await context.params;
  const setId = params.setId as string;

  if (!setId) {
    return NextResponse.json({ error: "Missing flashcard set ID" }, { status: 400 });
  }

  try {
    // Cascade delete flashcards automatically
    const deletedSet = await prisma.flashcardSet.delete({
      where: { id: setId },
    });

    return NextResponse.json({ success: true, deletedSet });
  } catch (err: unknown) {
    console.error("Failed to delete flashcard set:", err);

    if ((err as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Flashcard set not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete flashcard set" },
      { status: 500 }
    );
  }
}
