import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Guild } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildDelete
})
export default class GuildDelete extends Listener {
  public async run(guild: Guild): Promise<void> {
    await this.container.prisma.guildSettings.delete({
      where: {
        guildId: guild.id
      }
    })
    return this.container.logger.info(`Left ${guild.name} (${guild.id})`)
  }
}
