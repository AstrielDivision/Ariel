/*
  Warnings:

  - You are about to drop the column `guildAntiSettingsId` on the `guild_settings` table. All the data in the column will be lost.
  - You are about to drop the column `guildMemberLogsId` on the `guild_settings` table. All the data in the column will be lost.
  - You are about to drop the column `guildModerationLogsId` on the `guild_settings` table. All the data in the column will be lost.
  - You are about to drop the `GuildAntiSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GuildMemberLogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GuildModerationLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildAntiSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildMemberLogsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildModerationLogsId_fkey";

-- DropIndex
DROP INDEX "guild_settings_guildAntiSettingsId_idx";

-- DropIndex
DROP INDEX "guild_settings_guildMemberLogsId_idx";

-- DropIndex
DROP INDEX "guild_settings_guildModerationLogsId_idx";

-- AlterTable
ALTER TABLE "guild_settings" DROP COLUMN "guildAntiSettingsId",
DROP COLUMN "guildMemberLogsId",
DROP COLUMN "guildModerationLogsId";

-- DropTable
DROP TABLE "GuildAntiSettings";

-- DropTable
DROP TABLE "GuildMemberLogs";

-- DropTable
DROP TABLE "GuildModerationLogs";
