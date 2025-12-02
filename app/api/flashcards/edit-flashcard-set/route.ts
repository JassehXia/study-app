import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, title, description } = body;

        if (!id) {
            return NextResponse.json({ error: "Missing flashcard ID" }, { status: 400 })
        }

        const updated = await prisma.flashcardSet.update({
            where: { id },
            data: {
                title,
                description
            }
        })

        return NextResponse.json(updated, { status: 200 });

    } catch (err) {
        console.error("Updated failed, ", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }

}