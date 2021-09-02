import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import GuildSettings from '#lib/Models/GuildSettings'
import type { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class AntiInvites extends Listener {
  private readonly regex: RegExp =
  /(https?:\/\/)?(.*?@)?(www\.)?((discord|invite)\.(gg|li|me|io)|discord(app)?\.com\/invite)\/(\s)?.+/iu

  public async run(message: Message) {
    if (!this.regex.test(message.content)) return message

    const { anti } = await GuildSettings.findOne({ guild_id: message.guild.id })

    if (!anti.invites) return message

    return await message.delete()
  }
}
