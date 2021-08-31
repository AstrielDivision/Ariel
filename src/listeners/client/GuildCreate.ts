import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Guild } from 'discord.js'
import db from '#database'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildCreate
})
export default class GuildCreate extends Listener {
  public async run(guild: Guild): Promise<void> {
    await db.from<GuildSettings>('guilds').insert({
      guild_id: guild.id
    })
    await guild.members.fetch()
    return this.container.logger.info(`Joined ${guild.name} (${guild.id})`)
  }
}
