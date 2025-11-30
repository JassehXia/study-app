import prisma from "@/lib/db";


export default async function Test() {
    const flashcards = await prisma.flashcard.findMany()
    return (
        <main style={{ padding: 20 }}>
            <h1>Flashcards</h1>

            <ul>
                {flashcards.map((p) => (
                    <li key={p.id}>
                        <strong>{p.question}</strong>
                        <p>{p.answer}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}