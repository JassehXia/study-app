export function parseFlashcards(notes: string) {
  const rawCards = notes.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);

  return rawCards
    .map(card => {
      const lines = card.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length >= 2) {
        return {
          question: lines[0],
          answer: lines.slice(1).join("\n"), // support multi-line answers
        };
      }
      return null;
    })
    .filter((fc): fc is { question: string; answer: string } => fc !== null);
}
