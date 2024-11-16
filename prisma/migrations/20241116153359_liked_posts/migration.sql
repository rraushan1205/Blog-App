-- CreateTable
CREATE TABLE "_userLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userLikes_AB_unique" ON "_userLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_userLikes_B_index" ON "_userLikes"("B");

-- AddForeignKey
ALTER TABLE "_userLikes" ADD CONSTRAINT "_userLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userLikes" ADD CONSTRAINT "_userLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
