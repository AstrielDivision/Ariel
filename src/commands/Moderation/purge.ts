import { ModerationCommand } from '#lib/Structures/ModerationCommand'
import { seconds, sendTemporaryMessage } from '#util'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message, TextChannel } from 'discord.js'

@ApplyOptions<ModerationCommand.Options>({
  description: 'Delete multiple messages at once',
  usage: '[number of messages]',
  flags: ['silent'],
  requiredClientPermissions: ['MANAGE_MESSAGES'],
  requiredUserPermissions: ['MANAGE_MESSAGES'],
  preconditions: ['GuildTextOnly']
})
export default class Purge extends ModerationCommand {
  public async messageRun(message: Message, args: ModerationCommand.Args) {
    const limit = await args.pick('number', { min: 2, max: 100 })
    const silent = args.getFlags('silent')

    const messages = await message.channel.messages.fetch({ limit: limit + 1 })

    await (message.channel as TextChannel).bulkDelete(messages)

    if (silent) return true

    return await sendTemporaryMessage(message, `Purged ${limit} messages.`, seconds(5))
  }
}
