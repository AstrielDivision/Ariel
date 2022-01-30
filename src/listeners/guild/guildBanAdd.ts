import { logAction } from '#util'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { GuildBan } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildBanAdd
})
export default class guildBanAdd extends Listener {
  public async run(ban: GuildBan) {
    if (!ban.guild.me.permissions.has('VIEW_AUDIT_LOG')) return false

    const audit = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_BAN_ADD'
    })

    const log = audit.entries.first()

    if (log) {
      logAction(
        'moderation',
        {
          user: ban.user,
          reason: log.reason,
          issuer: log.executor.toString()
        },
        ban.guild
      )
    } else {
      logAction(
        'moderation',
        {
          user: ban.user
        },
        ban.guild
      )
    }

    return ban
  }
}
