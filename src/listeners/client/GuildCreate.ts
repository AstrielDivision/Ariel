import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Guild } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildCreate
})
export default class GuildCreate extends Listener {
  public async run(guild: Guild): Promise<void> {
    await this.container.prisma.guildSettings.create({
      data: {
        guildId: guild.id,
        prefix: process.env.PREFIX
      }
    })
    await guild.members.fetch()
    return this.container.logger.info(`Joined ${guild.name} (${guild.id})`)
  }
}
