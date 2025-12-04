export function parseFlashcards(notes: string) {
  const rawCards = notes
    .split(/\n\s*\n/)       // split by double newline
    .map(s => s.trim())      // trim each card
    .filter(Boolean);        // remove empty cards

  return rawCards
    .map(card => {
      const lines = card
        .split("\n")         // split into lines
        .map(l => l.trim())  // trim each line
        .filter(Boolean);    // remove empty lines

      if (lines.length >= 2) {
        return {
          question: lines[0],
          answer: lines.slice(1).join("\n"), // join multi-line answer
        };
      }
      return null;
    })
    .filter((fc): fc is { question: string; answer: string } => fc !== null);
}
