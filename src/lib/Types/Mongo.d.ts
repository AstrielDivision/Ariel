import type { Document } from 'mongoose'

export interface GuildSettings extends Document {
  guild_id?: string
  prefix?: string | null
  anti?: {
    unmentionable?: boolean
    invites?: boolean
    gifts?: boolean
  }
}
