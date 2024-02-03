/*
  Warnings:

  - You are about to drop the column `mbti` on the `MbtiMatching` table. All the data in the column will be lost.
  - Added the required column `matchingMbti` to the `MbtiMatching` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MbtiMatching` DROP COLUMN `mbti`,
    ADD COLUMN `matchingMbti` VARCHAR(191) NOT NULL;
