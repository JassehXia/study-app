import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // This is the [id] from the URL
    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
    }

    const set = await prisma.flashcardSet.findFirst({
      where: { id, clerkId },
      include: { flashcards: true },
    });

    if (!set) {
      return NextResponse.json({ error: "Flashcard set not found" }, { status: 404 });
    }

    return NextResponse.json(set, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch flashcard set" }, { status: 500 });
  }
}
