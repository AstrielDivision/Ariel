/*
  Warnings:

  - Added the required column `guildAntiSettingsId` to the `guild_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildMemberLogsId` to the `guild_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildModerationLogsId` to the `guild_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GuildAntiSettings" DROP CONSTRAINT "GuildAntiSettings_guildSettingsGuildId_fkey";

-- DropForeignKey
ALTER TABLE "GuildMemberLogs" DROP CONSTRAINT "GuildMemberLogs_guildSettingsGuildId_fkey";

-- DropForeignKey
ALTER TABLE "GuildModerationLogs" DROP CONSTRAINT "GuildModerationLogs_guildSettingsGuildId_fkey";

-- AlterTable
ALTER TABLE "guild_settings" ADD COLUMN     "guildAntiSettingsId" INTEGER NOT NULL,
ADD COLUMN     "guildMemberLogsId" INTEGER NOT NULL,
ADD COLUMN     "guildModerationLogsId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "guild_settings_guildAntiSettingsId_idx" ON "guild_settings"("guildAntiSettingsId");

-- CreateIndex
CREATE INDEX "guild_settings_guildModerationLogsId_idx" ON "guild_settings"("guildModerationLogsId");

-- CreateIndex
CREATE INDEX "guild_settings_guildMemberLogsId_idx" ON "guild_settings"("guildMemberLogsId");

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildAntiSettingsId_fkey" FOREIGN KEY ("guildAntiSettingsId") REFERENCES "GuildAntiSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildModerationLogsId_fkey" FOREIGN KEY ("guildModerationLogsId") REFERENCES "GuildModerationLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildMemberLogsId_fkey" FOREIGN KEY ("guildMemberLogsId") REFERENCES "GuildMemberLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
