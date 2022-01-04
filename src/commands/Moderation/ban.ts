import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { logAction } from '#util'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { GuildMember, Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:ban.description',
  detailedDescription: 'Using the flags -s or --soft will ban then unban the user',
  requiredClientPermissions: ['BAN_MEMBERS'],
  flags: ['s', 'soft'],
  preconditions: ['GuildTextOnly'],
  usage: '<@user | userID> [reason] [-s or --soft]'
})
export default class Ban extends ArielCommand {
  @RequiresUserPermissions('BAN_MEMBERS')
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const member = (await args.pickResult('member')).value
    const reason = args.finished ? args.t('commands/moderation:ban.noReason') : (await args.restResult('string')).value
    const softBan = args.getFlags('s', 'soft')

    if (!member) return await message.channel.send(args.t('commands/moderation:ban.errors.noMention'))

    if (!member.bannable) return await message.channel.send(args.t('commands/moderation:ban.errors.cannotBan'))

    await member.ban({ reason: reason, days: 1 })

    if (softBan) {
      await member.guild.members.unban(member.id)
      this.log(message, member, reason, softBan)
      return await message.channel.send(args.t('commands/moderation:ban.success.softBan', { member: member.user.tag }))
    }

    this.log(message, member, reason, softBan)
    return await message.channel.send(args.t('commands/moderation:ban.success.ban', { member: member.user.tag }))
  }

  private log(message: Message, member: GuildMember, reason: string, softban: boolean) {
    return logAction(
      'moderation',
      {
        action: 'ban',
        member,
        issuer: message.member,
        softban,
        reason
      },
      message.guild
    )
  }
}
