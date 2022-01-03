import GuildSettings from '#lib/Models/GuildSettings'
import { logEmbed, sendToLogs } from '#util'
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
      this.log(member)
    }

    return member
  }

  private log(member: GuildMember): boolean {
    const embed = logEmbed('members', {
      action: 'leave',
      member
    })

    return void sendToLogs(member.guild, 'members', embed)
  }
}
