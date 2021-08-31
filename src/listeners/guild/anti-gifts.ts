import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import db from '#database'
import type { Message } from 'discord.js'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class AntiInvites extends Listener {
  private readonly regex: RegExp = /(https?:\/\/)?(www\.)?(discord\.gift|discord(app)?\.com\/gifts)\/(\s)?.+/iu

  public async run(message: Message) {
    if (!this.regex.test(message.content)) return null

    const { data: guild } = await db.from<GuildSettings>('guilds').select().eq('guild_id', message.guild.id).single()

    if (!guild['anti-gifts']) return null

    return await message.delete()
  }
}
