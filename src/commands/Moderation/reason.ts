import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/moderation:reason.description',
  usage: '<WarningID> <reason>'
})
export default class Reason extends ArielCommand {
  @RequiresUserPermissions('KICK_MEMBERS')
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const warnID = await args.pick('nanoID')
    const newVal = (await args.restResult('string')).value

    if (!warnID) return await message.channel.send(args.t('commands/moderation:reason.errors.noID'))
    if (!newVal) return await message.channel.send(args.t('commands/moderation:reason.errors.nowNewVal'))

    const warning = await this.container.prisma.warning.findFirst({
      where: {
        guildId: message.guild.id,
        id: warnID
      }
    })

    if (!warning) return await message.channel.send(args.t('commands/moderation:reason.errors.404'))

    if (!message.member.permissions.has('ADMINISTRATOR') && warning.user === message.author.id) {
      return await message.channel.send(args.t('commands/moderation:reason.errors.403'))
    }

    await this.container.prisma.warning.updateMany({
      where: {
        id: warning.id,
        guildId: warning.guildId
      },
      data: {
        reason: newVal
      }
    })

    return await message.channel.send(args.t('commands/moderation:reason.200', { newVal }))
  }
}
