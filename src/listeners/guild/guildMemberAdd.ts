import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { GuildMember } from 'discord.js'
// @ts-ignore
import clean from '@aero/sanitizer'
import GuildSettings from '#lib/Models/GuildSettings'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildMemberAdd
})
export default class guildMemberAdd extends Listener {
  public async run(member: GuildMember): Promise<GuildMember> {
    const { anti } = await GuildSettings.findOne({ guild_id: member.guild.id })

    if (anti.unmentionable) await this.cleanName(member)

    return member
  }

  public async cleanName(member: GuildMember): Promise<GuildMember> {
    const name = clean(member.displayName)

    return await member.setNickname(name.slice(0, 32), 'Cleaning nickname')
  }
}
