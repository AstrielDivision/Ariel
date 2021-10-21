import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'
import owoify from 'owofire'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/misc:owoify.description',
  usage: '<text>'
})
export default class OwOify extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const text = (await args.restResult('string')).value

    if (!text) {
      return await message.channel.send(args.t('commands/misc:owoify.noText'))
    }

    return await message.channel.send(owoify(text))
  }
}
