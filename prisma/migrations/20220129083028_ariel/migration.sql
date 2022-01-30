-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildAntiSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildMemberLogsId_fkey";

-- DropForeignKey
ALTER TABLE "guild_settings" DROP CONSTRAINT "guild_settings_guildModerationLogsId_fkey";

-- AlterTable
ALTER TABLE "guild_settings" ALTER COLUMN "guildAntiSettingsId" DROP NOT NULL,
ALTER COLUMN "guildMemberLogsId" DROP NOT NULL,
ALTER COLUMN "guildModerationLogsId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "warnings" ALTER COLUMN "pardoned" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildAntiSettingsId_fkey" FOREIGN KEY ("guildAntiSettingsId") REFERENCES "GuildAntiSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildModerationLogsId_fkey" FOREIGN KEY ("guildModerationLogsId") REFERENCES "GuildModerationLogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildMemberLogsId_fkey" FOREIGN KEY ("guildMemberLogsId") REFERENCES "GuildMemberLogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
