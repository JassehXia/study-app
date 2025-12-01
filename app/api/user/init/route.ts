import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
        where: { clerkId: userId }
    });

    if (!user) {
        user = await prisma.user.create({
            data: { clerkId: userId }
        });
    }

    return NextResponse.json(user);
}

