import { ModerationCommand } from '#lib/Structures/ModerationCommand'
import { ApplyOptions } from '@sapphire/decorators'
import type { GuildMember, Message } from 'discord.js'

@ApplyOptions<ModerationCommand.Options>({
  description: 'Kicks discord members',
  aliases: ['k', 'boot'],
  usage: '<user(s)> [reason]',
  requiredUserPermissions: ['BAN_MEMBERS'],
  preconditions: ['GuildTextOnly']
})
export default class Kick extends ModerationCommand {
  public async messageRun(message: Message, args: ModerationCommand.Args) {
    let users: GuildMember | GuildMember[] = await args.repeat('member')
    const reason = await args.pick('string').catch(() => 'No reason provided')
    const silent = args.getFlags('silent')

    if (users.length < 2) users = [users[0]]

    const manageable = this.getModeratable(users)

    if (!manageable.length) {
      return await message.channel.send(
        users.length === 1 ? 'You cannot kick the specified user' : 'You cannot kick any of the specified users'
      )
    }

    await this.execute(manageable, message.author.tag, reason, silent)

    return await message.channel.send(
      `Successfully kicked ${users.length > 1 ? `${manageable.length} Users.` : users[0].toString()}`
    )
  }

  private async execute(users: GuildMember[], moderator: string, reason: string, silent: boolean) {
    for (const user of users) {
      if (!user.kickable) return

      if (!silent) await this.sendDM(user, `You have been kicked from \`${user.guild.name}\` for: ${reason}`)

      void user.kick(`${moderator} | ${reason}`)
    }
  }
}
