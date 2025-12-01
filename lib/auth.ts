import { auth } from "@clerk/nextjs/server";
import prisma from "./db";

export async function getOrCreateUser() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Not authenticated");
    }

    // Check if user exists in your DB
    let user = await prisma.user.findUnique({
        where: { clerkId: userId }
    });

    // Create user if they don't exist
    if (!user) {
        user = await prisma.user.create({
            data: { clerkId: userId }
        });
    }

    return user;
}
