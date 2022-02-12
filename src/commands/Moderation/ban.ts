import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { years } from '#util'
import { ApplyOptions } from '@sapphire/decorators'
import type { Guild, GuildMember, Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Bans discord members',
  aliases: ['b', 'hammer'],
  usage: '<user(s)> [duration] [reason]',
  requiredUserPermissions: ['BAN_MEMBERS'],
  preconditions: ['GuildTextOnly'],
  enabled: false
})
export default class Ban extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    let users: GuildMember | GuildMember[] = await args.repeat('member')
    const time = await args.pickResult('time', { minimum: 0, maximum: years(1) })
    const reason = await args.rest('string').catch(() => 'No reason provided')

    if (users.length < 2) users = [users[0]]

    this.execute(users, time.success ? time.value : 0, message.guild, message.author.tag, reason)

    return await message.channel.send(
      `Successfully banned ${users.length > 1 ? `${users.length} Users.` : users[0].toString()}`
    )
  }

  private execute(users: GuildMember[], time: number, guild: Guild, moderator: string, reason: string) {
    for (const user of users) {
      if (!user.bannable) return

      void user.ban({ reason: `${time ? '[TEMP]' : ''} ${moderator} | ${reason}` })
    }

    console.log(time)

    if (time) this.container.tasks.create('endTempban', { users: users.map(u => u.id), guild }, time)
  }
}
