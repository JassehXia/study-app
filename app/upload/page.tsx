'use client';
import { useState } from "react";

export default function UploadPDFPage() {
    const [file, setFile] = useState<File | null>(null);
    const [flashcards, setFlashcards] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a PDF first.");
            return;
        }

        setError(null);
        setLoading(true);
        setFlashcards([]);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("clerkId", "test-user-id"); // placeholder
        formData.append("title", file.name);
        formData.append("description", "Uploaded via test page");

        try {
            const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });


            if (!res.ok) {
                throw new Error(`Upload failed with status ${res.status}`);
            }

            const data = await res.json();

            // Split the AI output into flashcards by blank lines
            const cards = data.notes
                .split(/\n\s*\n/)
                .map((fc: string) => fc.trim())
                .filter((fc: string) => fc.length > 0);

            setFlashcards(cards);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>PDF Upload Test</h1>

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                style={{ display: "block", marginTop: "1rem" }}
            />
            

            <button
                onClick={handleUpload}
                style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
                disabled={loading || !file}
            >
                {loading ? "Uploading..." : "Upload PDF"}
            </button>

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

            {flashcards.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Generated Flashcards</h2>
                    {flashcards.map((fc, i) => (
                        <div
                            key={i}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "1rem",
                                marginBottom: "1rem",
                                background: "#f9f9f9",
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            <strong>Flashcard {i + 1}:</strong>
                            <div>{fc}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
