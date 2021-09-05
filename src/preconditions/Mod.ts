import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'

export default class Mod extends Precondition {
  public run(message: Message): PreconditionResult {
    if (!message.guild) return this.error({ message: 'You cannot run this command in DMs.' })
    return message.member.permissions.has('KICK_MEMBERS' || 'BAN_MEMBERS' || 'MANAGE_GUILD' || 'MANAGE_CHANNELS')
      ? this.ok()
      : this.error({ message: 'You aren\'t allowed to execute this command.' })
  }
}
