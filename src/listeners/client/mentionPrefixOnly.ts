import GuildSettings from '#lib/Models/GuildSettings'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.MentionPrefixOnly
})
export default class mentionPrefixOnly extends Listener {
  public async run(message: Message) {
    const { prefix } = await GuildSettings.findOne({ guild_id: message.guild.id })
    return await message.channel.send(`This guilds current prefix is: ${prefix}`)
  }
}
