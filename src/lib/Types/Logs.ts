import type { GuildMember } from 'discord.js'

export interface logEmbedData {
  action?: 'ban' | 'kick' | 'join' | 'leave'
  member: GuildMember
  issuer?: GuildMember
  reason?: string
  removeData?: {
    kick?: boolean
    ban?: boolean
  }
  softban?: boolean
}