-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_id_fkey`;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `careerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `Career`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
