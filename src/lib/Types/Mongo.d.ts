import type { Document } from 'mongoose'

export interface GuildSettings extends Document {
  guild_id: string
  prefix: string | null
  anti: {
    unmentionable: boolean
    invites: boolean
    gifts: boolean
  }
}

export interface Case {
  case_id: string
  case_reason: string
  moderator_id: string
  user_id: string
  guild: string
  pardoned: boolean
}
