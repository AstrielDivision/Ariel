import GuildSettings from '#lib/Models/GuildSettings'
import { logAction } from '#util'
import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import type { GuildMember } from 'discord.js'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildMemberRemove
})
export default class guildMemberRemove extends Listener {
  public async run(member: GuildMember) {
    const { logs } = await GuildSettings.findOne({ guild_id: member.guild.id })
    if (logs.members) {
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
