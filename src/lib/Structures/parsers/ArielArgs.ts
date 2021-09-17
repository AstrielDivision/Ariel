import { Args, CommandContext } from '@sapphire/framework'
import type { TFunction } from '@sapphire/plugin-i18next'
import type { Message } from 'discord.js'
import type { Args as Lexure } from 'lexure'
import type { ArielCommand } from '../Command'

export default class ArielArgs extends Args {
  public t: TFunction

  public constructor(message: Message, command: ArielCommand, parser: Lexure, context: CommandContext, t: TFunction) {
    super(message, command, parser, context)
    this.t = t
  }
}

declare module '@sapphire/framework' {
  export interface Args {
    t: TFunction
  }
}
