import { ModerationCommand } from '#lib/Structures/ModerationCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { GuildMember, Message } from 'discord.js'

@ApplyOptions<ModerationCommand.Options>({
  description: 'Bans discord members',
  aliases: ['b', 'hammer'],
  flags: ['soft', 'silent'],
  usage: '<user(s)> [reason] [--silent / --soft]',
  requiredUserPermissions: ['BAN_MEMBERS'],
  preconditions: ['GuildTextOnly']
})
export default class Ban extends ModerationCommand {
  public async messageRun(message: Message, args: ModerationCommand.Args) {
    let users: GuildMember | GuildMember[] = await args.repeat('member')
    const reason = await args.rest('string').catch(() => 'No reason provided')
    const soft = args.getFlags('soft')
    const silent = args.getFlags('silent')

    if (users.length < 2) users = [users[0]]

    const manageable = this.getModeratable(users)

    if (!manageable.length) {
      return await message.channel.send(
        users.length === 1 ? 'You cannot ban the specified user' : 'You cannot ban any of the specified users'
      )
    }

    await this.execute(manageable, message.author.tag, reason, soft, silent)

    return await message.channel.send(
      `Successfully banned ${users.length > 1 ? `${manageable.length} Users.` : users[0].toString()}`
    )
  }

  private async execute(users: GuildMember[], moderator: string, reason: string, soft: boolean, silent: boolean) {
    for (const user of users) {
      if (!user.bannable) return

      if (!silent) {
        await this.sendDM(
          user,
          `You have been ${soft ? 'soft banned' : 'banned'} from \`${user.guild.name}\` for: ${reason}`
        )
      }

      void user.ban({ reason: `${moderator} | ${reason}` })

      if (soft) void user.guild.members.unban(user, 'Soft ban')
    }
  }
}
