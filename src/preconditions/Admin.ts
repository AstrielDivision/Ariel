import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'

export default class Admin extends Precondition {
  public run(message: Message): PreconditionResult {
    if (!message.guild) return this.error({ message: 'You cannot run this command in DMs.' })
    return message.member.permissions.has('ADMINISTRATOR')
      ? this.ok()
      : this.error({ message: 'You are not a Administrator.' })
  }
}
