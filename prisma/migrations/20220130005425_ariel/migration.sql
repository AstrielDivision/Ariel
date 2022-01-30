/*
  Warnings:

  - A unique constraint covering the columns `[guildId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_guildId_key" ON "Tag"("guildId");
