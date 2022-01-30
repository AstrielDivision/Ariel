-- CreateTable
CREATE TABLE "GuildAntiSettings" (
    "id" TEXT NOT NULL,
    "unmentionable" BOOLEAN NOT NULL DEFAULT false,
    "invites" BOOLEAN NOT NULL DEFAULT false,
    "gifts" BOOLEAN NOT NULL DEFAULT false,
    "hoisting" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GuildAntiSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildModerationLogs" (
    "id" TEXT NOT NULL,
    "channel" TEXT,
    "hook" TEXT,

    CONSTRAINT "GuildModerationLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildMemberLogs" (
    "id" TEXT NOT NULL,
    "channel" TEXT,
    "hook" TEXT,

    CONSTRAINT "GuildMemberLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild_settings" (
    "guild_id" TEXT NOT NULL,
    "prefix" TEXT,
    "language" TEXT,
    "guildAntiSettingsId" TEXT NOT NULL,
    "guildModerationLogsId" TEXT NOT NULL,
    "guildMemberLogsId" TEXT NOT NULL,

    CONSTRAINT "guild_settings_pkey" PRIMARY KEY ("guild_id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "guild_id" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT E'RANDOM',
    "embed" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("guild_id")
);

-- CreateTable
CREATE TABLE "Warning" (
    "guild_id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "pardoned" BOOLEAN NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Warning_pkey" PRIMARY KEY ("guild_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guild_settings_guild_id_key" ON "guild_settings"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_guild_id_key" ON "Tag"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "Warning_guild_id_key" ON "Warning"("guild_id");

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildAntiSettingsId_fkey" FOREIGN KEY ("guildAntiSettingsId") REFERENCES "GuildAntiSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildModerationLogsId_fkey" FOREIGN KEY ("guildModerationLogsId") REFERENCES "GuildModerationLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_settings" ADD CONSTRAINT "guild_settings_guildMemberLogsId_fkey" FOREIGN KEY ("guildMemberLogsId") REFERENCES "GuildMemberLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
