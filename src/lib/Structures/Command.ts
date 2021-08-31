import type { PieceContext, Args } from '@sapphire/framework'
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands'
import { sep } from 'path'

export abstract class ArielCommand extends SubCommandPluginCommand<Args, ArielCommand> {
  public usage?: string
  constructor(Context: PieceContext, options: AstraeaCommandOptions) {
    super(Context, options)

    this.usage = `${this.name} ${options.usage ?? ''}`
  }

  public get category(): string {
    const path = this.path

    const splittedPath = path.split(sep)
    const finalPath = splittedPath.slice(splittedPath.indexOf('commands') + 1, -1)

    return finalPath[0]
  }
}

export interface AstraeaCommandOptions extends SubCommandPluginCommand.Options {
  usage?: string
}
