/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable import/export */
import type { CommandContext, PieceContext } from '@sapphire/framework'
import { fetchT } from '@sapphire/plugin-i18next'
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands'
import type { Message } from 'discord.js'
import * as Lexure from 'lexure'
import ArielArgs from './parsers/ArielArgs'

export abstract class ArielCommand extends SubCommandPluginCommand<ArielArgs, ArielCommand> {
  public usage?: string
  constructor(Context: PieceContext, options: ArielCommandOptions) {
    super(Context, options)

    this.usage = `${this.name} ${options.usage ?? ''}`
  }

  public async preParse(message: Message, parameters: string, context: CommandContext): Promise<ArielCommand.Args> {
    const parser = new Lexure.Parser(this.lexer.setInput(parameters).lex()).setUnorderedStrategy(this.strategy)
    const args = new Lexure.Args(parser.parse())
    return new ArielArgs(message, this, args, context, await fetchT(message))
  }
}

export interface ArielCommandOptions extends SubCommandPluginCommand.Options {
  usage?: string
}

export namespace ArielCommand {
  export type Args = ArielArgs
}
