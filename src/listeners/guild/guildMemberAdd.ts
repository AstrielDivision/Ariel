import { Events, Listener, ListenerOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import type { GuildMember } from 'discord.js'
import GuildSettings from '#lib/Models/GuildSettings'
// @ts-ignore
import clean from '@aero/sanitizer'

@ApplyOptions<ListenerOptions>({
  event: Events.GuildMemberAdd
})
export default class guildMemberAdd extends Listener {
  public async run(member: GuildMember): Promise<GuildMember> {
    const { anti } = await GuildSettings.findOne({ guild_id: member.guild.id })

    if (anti.unmentionable) await this.cleanName(member)
    if (anti.hoisting) await this.dehoist(member)

    return member
  }

  private async cleanName(member: GuildMember) {
    const name: string = clean(member.displayName)

    return await member.setNickname(name.slice(0, 32), 'Cleaning nickname')
  }

  private async dehoist(member: GuildMember) {
    if (member.displayName[0] < '0') {
      const name: string = member.displayName.startsWith('⬇')
        ? `⬇${clean(member.displayName.slice(1)) as string}`
        : (clean(member.displayName.slice(0, 32)) as string)

      return await member.setNickname(name, 'Cleaning nickname')
    }

    return member
  }
}
