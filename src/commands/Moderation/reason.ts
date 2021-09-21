import Warnings from '#lib/Models/Warnings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:reason.description',
  usage: '<WarningID> <reason>'
})
export default class Reason extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async run(message: Message, args: ArielCommand.Args) {
    const warnID = await args.pick('nanoID')
    const newVal = (await args.restResult('string')).value

    if (!warnID) return await message.channel.send(args.t('commands/moderation:reason.errors.noID'))
    if (!newVal) return await message.channel.send(args.t('commands/moderation:reason.errors.nowNewVal'))

    const warning = await Warnings.findOne({ id: warnID, guild: message.guild.id })

    if (!warning) return await message.channel.send(args.t('commands/moderation:reason.errors.404'))

    if (!message.member.permissions.has('ADMINISTRATOR') && warning.user === message.author.id) {
      return await message.channel.send(args.t('commands/moderation:reason.errors.403'))
    }

    await warning.updateOne({ $set: { reason: newVal } })

    return await message.channel.send(args.t('commands/moderation:reason.200', { newVal }))
  }
}
