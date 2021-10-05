import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/cryptography:base64Description',
  detailedDescription: 'commands/cryptography:base64DetailedDescription',
  flags: ['d', 'decode'],
  usage: '<text> [-d or --decode]'
})
export default class Base64 extends ArielCommand {
  public async run(message: Message, args: ArielCommand.Args) {
    const string = args.finished ? null : await args.rest('string')
    const decode = args.getFlags('d', 'decode')

    if (!string) return await message.channel.send(args.t('commands/cryptography:noText'))

    if (decode) {
      const decoded = Buffer.from(string, 'base64').toString('binary')

      return await message.channel.send(decoded)
    }

    const encoded = Buffer.from(string, 'binary').toString('base64')

    return await message.channel.send(encoded)
  }
}
