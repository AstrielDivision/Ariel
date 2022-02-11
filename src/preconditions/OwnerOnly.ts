import { LanguageKeys } from '#languages'
import { envParseString } from '#lib/env/parser'
import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'

export default class OwnerOnly extends Precondition {
  public run(message: Message): PreconditionResult {
    return envParseString('OWNERS') === message.author.id
      ? this.ok()
      : this.error({ identifier: LanguageKeys.Preconditions.OwnerOnly })
  }
}
