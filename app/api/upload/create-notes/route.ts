/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,});

// TESTING: hard-coded user
const TEST_USER_ID = "user_35oVOg022g7JwBM8uegqWPDgLsM";

export async function POST(req: Request) {
  try {
    const { pdfUrl } = await req.json();
    if (!pdfUrl)
      return NextResponse.json({ error: "Missing pdfUrl" }, { status: 400 });

    // OpenAI → read PDF + generate notes
    const completion = await client.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text:
                "Generate extremely clean, well-structured study notes from this PDF. Include headings, key ideas, definitions, and examples.",
            },
            { type: "input_file", file_url: pdfUrl },
          ],
        },
      ],
    });

    const outputText = completion.output_text;

    // Save notes to Prisma
    const note = await prisma.note.create({
      data: {
        clerkId: TEST_USER_ID,
        title: "Notes from PDF",
        content: outputText,
        source: pdfUrl,
      },
    });

    return NextResponse.json({ success: true, note });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
