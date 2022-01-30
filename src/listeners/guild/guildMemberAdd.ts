import { logAction } from '#util'
// @ts-ignore
import clean from '@aero/sanitizer'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { GuildMember } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildMemberAdd
})
export default class guildMemberAdd extends Listener {
  public async run(member: GuildMember): Promise<GuildMember> {
    const { anti } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: member.guild.id
      },
      select: {
        anti: true
      }
    })
    const { memberLog: members } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: member.guild.id
      },
      select: {
        memberLog: true
      }
    })

    if (anti.unmentionable) await this.cleanName(member)
    if (members) {
      logAction(
        'members',
        {
          action: 'join',
          member
        },
        member.guild
      )
    }

    return member
  }

  private async cleanName(member: GuildMember) {
    const name: string = clean(member.displayName)

    return await member.setNickname(name.slice(0, 32), 'Cleaning nickname')
  }
}
