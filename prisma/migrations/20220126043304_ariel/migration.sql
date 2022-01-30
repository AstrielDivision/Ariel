/*
  Warnings:

  - The primary key for the `GuildAntiSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GuildAntiSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GuildMemberLogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GuildMemberLogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GuildModerationLogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GuildModerationLogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Warning` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `guildAntiSettingsId` on the `guild_settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `guildModerationLogsId` on the `guild_settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `guildMemberLogsId` on the `guild_settings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildAntiSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildMemberLogsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildModerationLogsId_fkey";

-- AlterTable
ALTER TABLE "GuildAntiSettings" DROP CONSTRAINT "GuildAntiSettings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GuildAntiSettings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GuildMemberLogs" DROP CONSTRAINT "GuildMemberLogs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GuildMemberLogs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GuildModerationLogs" DROP CONSTRAINT "GuildModerationLogs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GuildModerationLogs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "guild_settings" DROP COLUMN "guildAntiSettingsId",
ADD COLUMN     "guildAntiSettingsId" INTEGER NOT NULL,
DROP COLUMN "guildModerationLogsId",
ADD COLUMN     "guildModerationLogsId" INTEGER NOT NULL,
DROP COLUMN "guildMemberLogsId",
ADD COLUMN     "guildMemberLogsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Warning";

-- CreateTable
CREATE TABLE "tags" (
    "guild_id" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT E'RANDOM',
    "embed" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("guild_id")
);

-- CreateTable
CREATE TABLE "warnings" (
    "guild_id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "pardoned" BOOLEAN NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "warnings_pkey" PRIMARY KEY ("guild_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_guild_id_key" ON "tags"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "warnings_guild_id_key" ON "warnings"("guild_id");

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildAntiSettingsId_fkey" FOREIGN KEY ("guildAntiSettingsId") REFERENCES "GuildAntiSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildModerationLogsId_fkey" FOREIGN KEY ("guildModerationLogsId") REFERENCES "GuildModerationLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildMemberLogsId_fkey" FOREIGN KEY ("guildMemberLogsId") REFERENCES "GuildMemberLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
