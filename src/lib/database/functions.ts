import { ArielIdentifiers } from '#types'
import type { Prisma } from '@prisma/client'
import { UserError } from '@sapphire/framework'
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

export async function getTags(guildId: Snowflake) {
  return await container.prisma.tag.findMany({
    where: {
      guildId
    }
  })
}

export async function getTag(guildId: Snowflake, name: string) {
  return await container.prisma.tag.findFirst({
    where: {
      guildId: guildId,
      name
    }
  })
}

export async function createTag(guildId: Snowflake, name: string, data: string, embed: boolean) {
  if (await tagExists(guildId, name)) throw new UserError({ identifier: ArielIdentifiers.TagAlreadyExists })

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

export async function tagSource(guildId: Snowflake, name: string) {
  const { data } = await container.prisma.tag.findFirst({
    where: {
      guildId,
      name
    }
  })

  return data
}

export async function tagExists(guildId: Snowflake, name: string) {
  return Boolean(
    await container.prisma.tag.count({
      where: {
        guildId,
        name
      }
    })
  )
}
