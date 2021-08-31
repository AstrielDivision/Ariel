import { ArielCommand, AstraeaCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import owoify from 'owofire'

@ApplyOptions<AstraeaCommandOptions>({
  name: 'owoify',
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
