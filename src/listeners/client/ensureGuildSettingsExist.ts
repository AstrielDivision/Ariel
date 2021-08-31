import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import db from '#database'
import type { Message } from 'discord.js'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class GuildCreate extends Listener {
  public async run(message: Message): Promise<unknown> {
    const { data: guild_data } = await db
      .from<GuildSettings>('guilds')
      .select()
      .eq('guild_id', message.guild.id)
      .limit(1)

    if (guild_data.length === 0) {
      await db.from<GuildSettings>('guilds').insert({
        guild_id: message.guild.id
      })
    }

    return null
  }
}
