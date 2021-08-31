import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { GuildMember } from 'discord.js'
// @ts-ignore
import clean from '@aero/sanitizer'
import db from '#database'
import type { GuildSettings } from '#types'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildMemberAdd
})
export default class guildMemberAdd extends Listener {
  public async run(member: GuildMember): Promise<GuildMember> {
    const { data: guild } = await db.from<GuildSettings>('guilds').select().eq('guild_id', member.guild.id).single()

    if (guild['anti-unmentionable']) await this.cleanName(member)
    return member
  }

  public async cleanName(member: GuildMember): Promise<GuildMember> {
    const name = clean(member.displayName)

    return await member.setNickname(name.slice(0, 32), 'Cleaning nickname')
  }
}
