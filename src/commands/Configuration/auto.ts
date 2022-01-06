import { Timeouts } from '#lib/constants'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message, TextChannel } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  usage: '<enable | disable> <aww | meme | reddit> [@channel | channel ID] [subreddit]',
  subCommands: ['disable', { default: true, input: 'enable' }]
})
export default class Auto extends ArielCommand {
  public async enable(message: Message, args: ArielCommand.Args) {
    const type = await args.pick('string')
    const channel = (await args.pick('guildTextChannel')) ?? message.channel
    const subreddit = args.finished ? null : args.pick('string')

    this.container.tasks.create(
      'auto',
      { type, channel: channel.id, subreddit },
      { type: 'repeated', interval: Timeouts.Minute * 5 }
    )

    return await message.channel.send(
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      `I'm now sending images of type ${type} in the channel ${(channel as TextChannel).toString()}`
    )
  }
}
