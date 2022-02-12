import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { GuildMember, Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Kicks discord members',
  aliases: ['k', 'boot'],
  usage: '<user(s)> [reason]',
  requiredUserPermissions: ['BAN_MEMBERS'],
  preconditions: ['GuildTextOnly']
})
export default class Kick extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    let users: GuildMember | GuildMember[] = await args.repeat('member')
    const reason = await args.pick('string').catch(() => 'No reason provided')

    if (users.length === 1) users = [users[0]]

    await this.execute(users, message.author.tag, reason)

    return await message.channel.send(
      `Successfully kicked ${users.length > 1 ? `${users.length} Users.` : users[0].toString()}`
    )
  }

  private async execute(users: GuildMember[], moderator: string, reason: string) {
    for (const user of users) {
      if (!user.kickable) return

      await user.kick(`${moderator} | ${reason}`)
    }
  }
}
