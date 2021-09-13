import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import type { Message } from 'discord.js'
import owoify from 'owofire'

@ApplyOptions<ArielCommandOptions>({
  description: 'owoify your text',
  usage: '<text>'
})
export default class OwOify extends ArielCommand {
  public async run(message: Message, args: Args) {
    const text = (await args.restResult('string')).value

    if (!text) {
      return await message.channel.send('No text provided!')
    }

    return await message.channel.send(owoify(text))
  }
}
