import { LanguageKeys } from '#lib/i18n/LanguageKeys'
import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'

export default class Manager extends Precondition {
  public run(message: Message): PreconditionResult {
    if (!message.guild) return this.error({ message: 'You cannot run this command in DMs.' })
    return message.member.permissions.has('MANAGE_GUILD')
      ? this.ok()
      : this.error({ identifier: LanguageKeys.Preconditions.Manager })
  }
}
