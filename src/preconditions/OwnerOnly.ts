import { LanguageKeys } from '#languages'
import { envParseArray } from '#lib/env/parser'
import { Precondition, PreconditionResult } from '@sapphire/framework'
import type { Message } from 'discord.js'

export default class OwnerOnly extends Precondition {
  public run(message: Message): PreconditionResult {
    return envParseArray('OWNERS').includes(message.author.id)
      ? this.ok()
      : this.error({ identifier: LanguageKeys.Preconditions.OwnerOnly })
  }
}
