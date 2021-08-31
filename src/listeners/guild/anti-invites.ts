import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import db from '#database'
import type { Message } from 'discord.js'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class AntiInvites extends Listener {
  private readonly regex: RegExp =
  /(https?:\/\/)?(.*?@)?(www\.)?((discord|invite)\.(gg|li|me|io)|discord(app)?\.com\/invite)\/(\s)?.+/iu

  public async run(message: Message) {
    if (!this.regex.test(message.content)) return message

    const { data: guild } = await db.from<GuildSettings>('guilds').select().eq('guild_id', message?.guild.id).single()

    if (!guild['anti-invites']) return message

    return await message.delete()
  }
}
