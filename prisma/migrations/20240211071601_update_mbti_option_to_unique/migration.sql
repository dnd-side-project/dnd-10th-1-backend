/*
  Warnings:

  - A unique constraint covering the columns `[mbti]` on the table `GameMbti` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `GameMbti_mbti_key` ON `GameMbti`(`mbti`);
