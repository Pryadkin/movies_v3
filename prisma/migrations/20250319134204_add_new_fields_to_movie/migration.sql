/*
  Warnings:

  - Added the required column `adult` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_language` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_count` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "adult" BOOLEAN NOT NULL,
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "genre_ids" INTEGER[],
ADD COLUMN     "original_language" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "video" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vote_average" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vote_count" INTEGER NOT NULL;
