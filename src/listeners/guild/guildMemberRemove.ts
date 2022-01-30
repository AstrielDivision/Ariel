import { logAction } from '#util'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { GuildMember } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildMemberRemove
})
export default class guildMemberRemove extends Listener {
  public async run(member: GuildMember) {
    const { memberLog: members } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: member.guild.id
      },
      select: {
        memberLog: true
      }
    })

    if (members) {
      const kickAudit = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK'
      })

      const log = kickAudit.entries.first()
      if (log) {
        if (log.target.id === member.id) {
          logAction(
            'moderation',
            {
              action: 'kick',
              member,
              issuer: log.executor.toString()
            },
            member.guild
          )
        }
      }
      logAction(
        'members',
        {
          action: 'leave',
          member
        },
        member.guild
      )
    }

    return member
  }
}
