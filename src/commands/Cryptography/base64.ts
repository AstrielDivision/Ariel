import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  name: 'base64',
  description: 'Encode text to base64 or Decode base64 to text',
  detailedDescription: 'Use -d or --decode to decoded encoded text',
  flags: ['d', 'decode'],
  usage: '<text> [-d or --decode]'
})
export default class Base64 extends ArielCommand {
  public async run(message: Message, args: Args) {
    const string = (await args.restResult('string')).value
    const decode = args.getFlags('d', 'decode')

    if (!string) return await message.channel.send('You didn\'t provide any text!')

    if (decode) {
      const decoded = Buffer.from(string, 'base64').toString('binary')

      return await message.channel.send(decoded)
    }

    const encoded = Buffer.from(string, 'binary').toString('base64')

    return await message.channel.send(encoded)
  }
}
