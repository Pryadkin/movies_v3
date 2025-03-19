/*
  Warnings:

  - You are about to drop the `MovieList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieList" DROP CONSTRAINT "MovieList_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieList" DROP CONSTRAINT "MovieList_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToTag" DROP CONSTRAINT "_MovieToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToTag" DROP CONSTRAINT "_MovieToTag_B_fkey";

-- DropIndex
DROP INDEX "Tag_name_key";

-- DropTable
DROP TABLE "MovieList";

-- DropTable
DROP TABLE "_MovieToTag";

-- CreateTable
CREATE TABLE "_MovieToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MovieToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TagToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TagToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieToUser_B_index" ON "_MovieToUser"("B");

-- CreateIndex
CREATE INDEX "_TagToUser_B_index" ON "_TagToUser"("B");

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD CONSTRAINT "_MovieToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToUser" ADD CONSTRAINT "_MovieToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD CONSTRAINT "_TagToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD CONSTRAINT "_TagToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
