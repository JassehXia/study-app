import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { setId: string } }) {
  const { setId } = params;

  try {
    // Optional: Delete all flashcards in the set first
    await prisma.flashcard.deleteMany({
      where: { flashcardSetId: setId },
    });

    // Delete the flashcard set itself
    await prisma.flashcardSet.delete({
      where: { id: setId },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete flashcard set" }, { status: 500 });
  }
}
