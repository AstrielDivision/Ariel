import { LanguageKeys } from '#languages'
import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'

export default class Manager extends Precondition {
  public run(message: Message): PreconditionResult {
    if (!message.guild) return this.error()
    return message.member.permissions.has('MANAGE_GUILD')
      ? this.ok()
      : this.error({ identifier: LanguageKeys.Preconditions.Manager })
  }
}
