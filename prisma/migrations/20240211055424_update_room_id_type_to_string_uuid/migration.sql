/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Invite` DROP FOREIGN KEY `Invite_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_roomId_fkey`;

-- AlterTable
ALTER TABLE `Invite` MODIFY `roomId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Room` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` MODIFY `roomId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
