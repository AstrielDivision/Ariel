import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  preconditions: ['OwnerOnly']
})
export default class Enable extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const { success, value } = await args.pickResult('piece')

    if (!success) return await message.channel.send('Could not resolve Piece name')
    const piece = value

    await piece.reload()

    return await message.channel.send(`Reloaded \`${piece.name}\``)
  }
}
