-- AlterTable
ALTER TABLE "Flashcard" ADD COLUMN     "flashcardSetId" TEXT;

-- CreateTable
CREATE TABLE "FlashcardSet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FlashcardSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_flashcardSetId_fkey" FOREIGN KEY ("flashcardSetId") REFERENCES "FlashcardSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardSet" ADD CONSTRAINT "FlashcardSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
