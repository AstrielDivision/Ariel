import type { Prisma } from '@prisma/client'
import { container } from '@sapphire/pieces'
import type { Snowflake } from 'discord-api-types'

export async function getSettings(guildId: Snowflake) {
  return await container.prisma.guildSettings.findUnique({
    where: {
      guildId
    }
  })
}

export async function createSettings(guildId: Snowflake) {
  return await container.prisma.guildSettings.create({
    data: {
      guildId,
      prefix: process.env.PREFIX
    }
  })
}

export async function updateSettings(guildId: Snowflake, data: Prisma.GuildSettingsUpdateInput) {
  return await container.prisma.guildSettings.update({
    where: {
      guildId
    },
    data
  })
}

export async function createTag(guildId: Snowflake, name: string, data: string, embed: boolean) {
  return await container.prisma.tag.create({
    data: {
      guildId,
      name: name.toLowerCase(),
      data,
      embed
    }
  })
}

export async function updateTag(guildId: Snowflake, name: string, data: string, embed: boolean) {
  return await container.prisma.tag.updateMany({
    where: {
      guildId,
      name
    },
    data: {
      data,
      embed
    }
  })
}

export async function removeTag(guildId: Snowflake, name: string) {
  return await container.prisma.tag.deleteMany({
    where: {
      guildId,
      name
    }
  })
}
