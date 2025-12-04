import { Request, Response } from "express";
import { PDFParse } from "pdf-parse";
import OpenAI from "openai";

export const uploadPDF = async (req: Request, res: Response) => {
    console.log("uploadPDF route hit");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Parse PDF text
        const parser = new PDFParse({ data: req.file.buffer });
        const pdfData = await parser.getText();
        const text = pdfData.text;

        // Initialize OpenAI at runtime
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that generates study notes." },
                { role: "user", content: `Create concise flashcards for the pdf. Do it in such a format where each flashcard is separated by a double newline ex:
                    
                    Question1
                    Answer1
                    
                    Question2
                    Answer2
                    :\n\n${text}` }
            ],
            temperature: 0.5,
        });

        const notes = completion.choices[0].message?.content;

        // Log the notes to the console
        console.log("Generated Notes:\n", notes);

        // Return the notes in the response
        return res.status(200).json({ notes });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error generating notes" });
    }
};
