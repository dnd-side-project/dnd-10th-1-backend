/*
  Warnings:

  - Added the required column `mbtiImage` to the `GameMbti` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamMbtiImage` to the `GameMbti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GameMbti` ADD COLUMN `mbtiImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `teamMbtiImage` VARCHAR(191) NOT NULL;
