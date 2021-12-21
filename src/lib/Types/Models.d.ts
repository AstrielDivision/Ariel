import type { Snowflake } from 'discord.js'
import type { Document } from 'mongoose'
import { DataLike } from './index'

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

export interface TagCommand extends Document {
  registeredAt: Date
  guild_id: Snowflake
  name: string
  data: DataLike
}
