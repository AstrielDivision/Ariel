import { Timeouts } from '#lib/constants'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message, TextChannel } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  usage: '<aww | meme | reddit> [@channel | channel ID] [subreddit]',
  enabled: false
})
export default class Auto extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const type = await args.pick('string')
    const channel = (await args.pick('guildTextChannel')) ?? message.channel
    const subreddit = args.finished ? null : args.pick('string')

    if (!channel.isText()) {
      return await message.channel.send('The channel must be a text channel! (Cannot be a announcement channel, etc)')
    }

    this.container.tasks.create(
      'auto',
      { type, channel, subreddit },
      { type: 'repeated', interval: Timeouts.Minute * 5 }
    )

    return await message.channel.send(
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      `I'm now sending images of type ${type} in the channel ${(channel as TextChannel).toString()}`
    )
  }
}
