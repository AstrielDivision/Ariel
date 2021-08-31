import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message } from '#types'
import cfg from '../../config'

@ApplyOptions<ListenerOptions>({
  event: Events.MentionPrefixOnly
})
export default class Example extends Listener {
  public async run(message: Message) {
    return message.channel.send(`This guilds current prefix is: ${'' ?? cfg.prefix}`)
  }
}
