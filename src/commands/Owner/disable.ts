import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  preconditions: ['OwnerOnly']
})
export default class Disable extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const piece = await args.pick('piece')

    piece.enabled = false

    return await message.channel.send(`Enabled ${piece.name}`)
  }
}
