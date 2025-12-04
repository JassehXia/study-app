import { Request, Response } from "express";
import { PDFParse } from "pdf-parse";

export const uploadPDF = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const buffer = req.file.buffer;

        // pdf-parse: create parser instance with uploaded buffer
        const parser = new PDFParse({ data: buffer });

        let result;
        try {
            result = await parser.getText();
        } catch (err) {
            console.error("PDF parsing error:", err);
            return res.status(400).json({ message: "Invalid PDF. Make sure it is a text-based PDF." });
        }

        console.log("Extracted text:", result.text);
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        return res.status(200).json({ text: result.text });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error parsing PDF" });
    }
};
