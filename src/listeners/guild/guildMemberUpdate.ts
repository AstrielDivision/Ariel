// @ts-ignore
import clean from '@aero/sanitizer'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { GuildMember } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildMemberUpdate
})
export default class guildMemberUpdate extends Listener {
  public async run(oldMember: GuildMember, newMember: GuildMember) {
    if (oldMember.displayName === newMember.displayName) return undefined
    if (!newMember.manageable) return undefined

    const { anti } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: newMember.guild.id
      },
      select: {
        anti: true
      }
    })

    if (anti.unmentionable) await this.cleanName(newMember)

    return newMember
  }

  public async cleanName(member: GuildMember): Promise<GuildMember> {
    const name = clean(member.displayName)

    return await member.setNickname(name.slice(0, 32), 'Cleaning nickname')
  }
}
