/*
  Warnings:

  - You are about to drop the column `guildAntiSettingsId` on the `guild_settings` table. All the data in the column will be lost.
  - You are about to drop the column `guildMemberLogsId` on the `guild_settings` table. All the data in the column will be lost.
  - You are about to drop the column `guildModerationLogsId` on the `guild_settings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildAntiSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildMemberLogsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildModerationLogsId_fkey";

-- AlterTable
ALTER TABLE "GuildAntiSettings" ADD COLUMN     "guildSettingsGuildId" TEXT;

-- AlterTable
ALTER TABLE "GuildMemberLogs" ADD COLUMN     "guildSettingsGuildId" TEXT;

-- AlterTable
ALTER TABLE "GuildModerationLogs" ADD COLUMN     "guildSettingsGuildId" TEXT;

-- AlterTable
ALTER TABLE "guild_settings" DROP COLUMN "guildAntiSettingsId",
DROP COLUMN "guildMemberLogsId",
DROP COLUMN "guildModerationLogsId";

-- AddForeignKey
ALTER TABLE "GuildAntiSettings" ADD CONSTRAINT "GuildAntiSettings_guildSettingsGuildId_fkey" FOREIGN KEY ("guildSettingsGuildId") REFERENCES "guild_settings"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildModerationLogs" ADD CONSTRAINT "GuildModerationLogs_guildSettingsGuildId_fkey" FOREIGN KEY ("guildSettingsGuildId") REFERENCES "guild_settings"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildMemberLogs" ADD CONSTRAINT "GuildMemberLogs_guildSettingsGuildId_fkey" FOREIGN KEY ("guildSettingsGuildId") REFERENCES "guild_settings"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;
