import { ModerationCommand } from '#lib/Structures/ModerationCommand'
import { seconds, sendTemporaryMessage } from '#util'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message, TextChannel } from 'discord.js'

@ApplyOptions<ModerationCommand.Options>({
  description: 'Delete multiple messages at once',
  usage: '[number of messages]',
  preconditions: ['GuildTextOnly'],
  requiredClientPermissions: ['MANAGE_MESSAGES'],
  requiredUserPermissions: ['MANAGE_MESSAGES']
})
export default class Purge extends ModerationCommand {
  public async messageRun(message: Message, args: ModerationCommand.Args) {
    const limit = await args.pick('number', { min: 2, max: 100 })

    const messages = await message.channel.messages.fetch({ limit: limit + 1 })

    await (message.channel as TextChannel).bulkDelete(messages)

    return await sendTemporaryMessage(message, `Purged ${limit} messages.`, seconds(5))
  }
}
