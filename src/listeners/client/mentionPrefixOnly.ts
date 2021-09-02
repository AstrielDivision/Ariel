import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from 'discord.js'
import cfg from '../../config'

@ApplyOptions<ListenerOptions>({
  event: Events.MentionPrefixOnly
})
export default class mentionPrefixOnly extends Listener {
  public async run(message: Message) {
    return await message.channel.send(`This guilds current prefix is: ${cfg.prefix}`)
  }
}
