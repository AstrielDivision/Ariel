import { envParseArray } from '#lib/env/parser'
import { container } from '@sapphire/framework'
import { DurationFormatter, Time } from '@sapphire/time-utilities'
import type { GuildResolvable, Snowflake, UserResolvable } from 'discord.js'

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
