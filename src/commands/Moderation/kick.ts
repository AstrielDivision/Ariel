import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:kick.description',
  requiredClientPermissions: ['KICK_MEMBERS'],
  preconditions: ['GuildTextOnly'],
  usage: '<@user | userID> [reason]'
})
export default class Kick extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const member = (await args.pickResult('member')).value
    const reason = args.finished ? args.t('commands/moderation:kick.noReason') : (await args.restResult('string')).value

    if (!member) return await message.channel.send(args.t('commands/moderation:kick.errors.noMention'))

    if (!member.kickable) return await message.channel.send(args.t('commands/moderation:kick.errors.cannotKick'))

    await member.kick(reason)

    return await message.channel.send(args.t('commands/moderation:kick.success.kick', { member: member.user.tag }))
  }
}
