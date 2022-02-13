import { envParseArray } from '#lib/env/parser'
import { sleep } from '@artiefuzzz/utils'
import { container } from '@sapphire/framework'
import { DurationFormatter, Time } from '@sapphire/time-utilities'
import type { GuildResolvable, Message, MessageOptions, Snowflake, UserResolvable } from 'discord.js'

const OWNERS = envParseArray('OWNERS')

export async function getUser(user: UserResolvable) {
  return await container.client.users.resolve(user)?.fetch()
}

export async function getGuild(guild: GuildResolvable) {
  return await container.client.guilds.resolve(guild)?.fetch()
}

export function isOwner(userId: Snowflake) {
  return OWNERS.includes(userId)
}

export function formatDuration(uptime: number): string {
  const duration = new DurationFormatter().format(uptime)

  return duration
}

export function seconds(number: number) {
  return number * Time.Second
}

export function minutes(number: number) {
  return number * Time.Minute
}

export function hours(number: number) {
  return number * Time.Hour
}

export function years(number: number) {
  return number * Time.Year
}

export async function sendTemporaryMessage(
  message: Message,
  options: string | MessageOptions,
  time = 0
): Promise<Message | boolean> {
  if (typeof options === 'string') options = { content: options }

  const _message = await message.channel.send(options)

  if (time === 0) void _message.delete()

  await sleep(time)

  try {
    return void _message.delete()
  } catch {
    return false
  }
}
