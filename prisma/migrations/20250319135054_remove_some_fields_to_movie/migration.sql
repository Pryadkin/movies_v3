/*
  Warnings:

  - You are about to drop the column `adult` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop_path` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genre_ids` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `original_language` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `popularity` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `vote_average` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `vote_count` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "adult",
DROP COLUMN "backdrop_path",
DROP COLUMN "genre_ids",
DROP COLUMN "original_language",
DROP COLUMN "overview",
DROP COLUMN "popularity",
DROP COLUMN "poster_path",
DROP COLUMN "releaseDate",
DROP COLUMN "video",
DROP COLUMN "vote_average",
DROP COLUMN "vote_count",
ADD COLUMN     "posterPath" TEXT;
