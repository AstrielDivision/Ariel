import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'

const cached = new Set<string>()

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class ensureGuildSettingsExist extends Listener {
  public async run(message: Message): Promise<boolean> {
    if (cached.has(message.guild.id)) return true

    const guild = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: message.guild.id
      }
    })

    if (!guild) {
      await this.container.prisma.guildSettings.create({
        data: {
          guildId: message.guild.id,
          prefix: process.env.PREFIX
        }
      })
    }

    cached.add(message.guild.id)

    return true
  }
}
