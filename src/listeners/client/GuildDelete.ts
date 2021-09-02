import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { Guild } from 'discord.js'
import GuildModel from '#lib/Models/GuildSettings'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildDelete
})
export default class GuildDelete extends Listener {
  public async run(guild: Guild): Promise<void> {
    await GuildModel.findOneAndRemove({ guild_id: guild.id })
    return this.container.logger.info(`Left ${guild.name} (${guild.id})`)
  }
}
