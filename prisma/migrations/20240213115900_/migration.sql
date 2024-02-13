-- CreateTable
CREATE TABLE `GameTopicGacha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `gameCategoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GameTopicGacha` ADD CONSTRAINT `GameTopicGacha_gameCategoryId_fkey` FOREIGN KEY (`gameCategoryId`) REFERENCES `GameCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
