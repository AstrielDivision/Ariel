/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-namespace */
import type { GuildMember } from 'discord.js'
import { ArielCommand, ArielCommandOptions } from './Command'
import type ArielArgs from './parsers/ArielArgs'

export abstract class ModerationCommand extends ArielCommand {
  protected async sendDM(target: GuildMember, content: string) {
    const dm = await target.createDM()

    return await dm.send(content)
  }

  protected getModeratable(targets: GuildMember[]) {
    return targets.filter(user => user.manageable)
  }
}

export namespace ModerationCommand {
  export type Args = ArielArgs
  export interface Options extends ArielCommandOptions {}
}
