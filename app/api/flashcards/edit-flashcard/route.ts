import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, question, answer } = body;

        if (!id) {
            return NextResponse.json({ error: "Missing flashcard ID" }, { status: 500 });
        }

        if (!id || (!question || !answer)) {
            return NextResponse.json({ error: "Missing required fiels" }, { status: 400 });
        }

        const updated = await prisma.flashcard.update({
            where: { id },
            data: {
                question,
                answer
            }

        })

        return NextResponse.json(updated, { status: 200 })

    } catch (err) {
        console.error("Updated failed, ", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }

}