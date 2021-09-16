import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import type { Message } from 'discord.js'
import i18n from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:kick.description',
  requiredClientPermissions: ['KICK_MEMBERS'],
  preconditions: ['GuildTextOnly'],
  usage: '<@user | userID> [reason]'
})
export default class Kick extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: Args) {
    const member = (await args.pickResult('member')).value
    const reason = (await args.restResult('string')).value
    if (!member) return await message.channel.send(i18n.t('commands/moderation:kick.errors.noMention'))

    if (!member.kickable) return await message.channel.send(i18n.t('commands/moderation:kick.errors.cannotKick'))

    await member.kick(reason || i18n.t('commands/moderation:kick.noReason'))

    return await message.channel.send(i18n.t('commands/moderation:kick.success.kick', { member: member.user.tag }))
  }
}
