import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  description: 'Enable, disable or reload Pieces',
  usage: '<enable | disable | _reload> <Piece name>',
  subCommands: ['disable', '$reload', 'enable']
})
export default class Piece extends ArielCommand {
  public async enable(message: Message, args: Args) {
    const { success, value } = await args.pickResult('piece')

    if (!success) return await message.channel.send('Could not resolve that name to a Piece')

    const piece = value

    piece.enabled = true

    return await message.channel.send(`Enabled ${piece.name}`)
  }

  public async disable(message: Message, args: Args) {
    const { success, value } = await args.pickResult('piece')

    if (!success) return await message.channel.send('Could not resolve Piece name')

    const piece = value

    piece.enabled = false

    return await message.channel.send(`Disabled \`${piece.name}\``)
  }

  public async $reload(message: Message, args: Args) {
    const { success, value } = await args.pickResult('piece')

    if (!success) return await message.channel.send('Could not resolve Piece name')
    const piece = value

    await piece.reload()

    return await message.channel.send(`Reloaded \`${piece.name}\``)
  }
}
