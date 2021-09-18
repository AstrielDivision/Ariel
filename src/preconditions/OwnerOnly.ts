import { LanguageKeys } from '#lib/i18n/LanguageKeys'
import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'
import cfg from '../config'

export default class OwnerOnly extends Precondition {
  public run(message: Message): PreconditionResult {
    return cfg.owners.includes(message.author.id)
      ? this.ok()
      : this.error({ identifier: LanguageKeys.Preconditions.OwnerOnly })
  }
}
