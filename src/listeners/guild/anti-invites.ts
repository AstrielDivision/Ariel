import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.MessageCreate
})
export default class AntiInvites extends Listener {
  private readonly regex: RegExp =
    /(http|https?:\/\/)?(.*?@)?(www\.)?((discord|invite)\.(gg|li|me|io)|discord(app)?\.com\/invite)\/(\s)?.+/iu

  public async run(message: Message) {
    if (!this.regex.test(message.content)) return message

    const { anti } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: message.guild.id
      },
      select: {
        anti: true
      }
    })

    if (!anti.invites) return message

    return await message.delete()
  }
}
