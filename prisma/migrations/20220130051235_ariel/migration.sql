/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Made the column `guildId` on table `Tag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_guildId_fkey";

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "guildId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild_settings"("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE;
