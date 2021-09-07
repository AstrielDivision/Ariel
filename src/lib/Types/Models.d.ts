import type { Document } from 'mongoose'
import type { Snowflake } from 'discord.js'

export interface GuildSettings extends Document {
  guild_id?: Snowflake
  prefix?: string | null
  language?: string
  anti?: {
    unmentionable?: boolean
    invites?: boolean
    gifts?: boolean
    hoisting?: boolean
  }
}

export interface Warnings extends Document {
  user: Snowflake
  mod: Snowflake
  guild: Snowflake
  reason: string
  pardoned: boolean
  id: string
}
