import type { GuildMember, MemberMention, User } from 'discord.js'

export interface LogData {
  action?: 'ban' | 'kick' | 'join' | 'leave'
  member?: GuildMember
  user?: User
  issuer?: MemberMention
  reason?: string
}
