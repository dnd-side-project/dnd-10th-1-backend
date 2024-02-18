-- AlterTable
ALTER TABLE `BlankTopicResult` ADD COLUMN `gameRoundId` INTEGER NULL;

-- CreateTable
CREATE TABLE `GameRound` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roomId` VARCHAR(191) NOT NULL,
    `gameBlankTopicId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlankTopicResult` ADD CONSTRAINT `BlankTopicResult_gameRoundId_fkey` FOREIGN KEY (`gameRoundId`) REFERENCES `GameRound`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameRound` ADD CONSTRAINT `GameRound_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameRound` ADD CONSTRAINT `GameRound_gameBlankTopicId_fkey` FOREIGN KEY (`gameBlankTopicId`) REFERENCES `GameBlankTopic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
