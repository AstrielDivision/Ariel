import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import type { Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'

@ApplyOptions<ArielCommandOptions>({
  name: 'ban',
  description: 'Ban a user with or without reason',
  detailedDescription: 'Using the flags -s or --soft will ban then unban the user',
  requiredClientPermissions: ['BAN_MEMBERS'],
  flags: ['s', 'soft'],
  preconditions: ['GuildTextOnly'],
  usage: '<@user | userID> [reason] [-s or --soft]'
})
export default class Ban extends ArielCommand {
  @RequiresUserPermissions('BAN_MEMBERS')
  public async run(message: Message, args: Args) {
    const member = (await args.pickResult('member')).value
    const reason = (await args.restResult('string')).value
    const softBan = args.getFlags('s', 'soft')
    if (!member) return await message.channel.send('You didn\'t mention a user to ban!')

    if (!member.bannable) return await message.channel.send('You\'re not allowed to ban this user!')

    await member.ban({ reason: reason || 'Not Specified', days: 1 })

    if (softBan) {
      await member.guild.members.unban(member.id)
      return await message.channel.send(`**Successfully soft banned** \`${member.user.tag}\``)
    }

    return await message.channel.send(`**Successfully banned** \`${member.user.tag}\``)
  }
}
