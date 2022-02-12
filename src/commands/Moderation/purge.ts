import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message, TextChannel } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Delete multiple messages at once',
  usage: '[number of messages]',
  preconditions: ['GuildTextOnly']
})
export default class Purge extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const limit = await args.pick('number', { min: 2, max: 100 })

    const messages = await message.channel.messages.fetch({ limit })

    await (message.channel as TextChannel).bulkDelete(messages)

    return await message.channel.send(`Purged ${limit} messages.`)
  }
}
