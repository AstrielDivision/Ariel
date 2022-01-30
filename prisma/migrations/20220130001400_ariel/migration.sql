/*
  Warnings:

  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL DEFAULT E'RANDOM',
    "embed" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "guildId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tag_guildId_idx" ON "Tag"("guildId");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild_settings"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;
