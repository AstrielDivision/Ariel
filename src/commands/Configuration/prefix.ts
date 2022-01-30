import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { Message } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/config:prefix.description',
  usage: '[set | reset | show: default] [new prefix]',
  subCommands: ['reset', 'set', { input: 'show', default: true }]
})
export default class Prefix extends ArielCommand {
  @RequiresUserPermissions('MANAGE_GUILD')
  public async set(message: Message, args: ArielCommand.Args) {
    const prefix = (await args.pickResult('string')).value

    if (!prefix) return await message.channel.send(await args.t('commands/config:prefix.error.noPrefix'))
    if (prefix.length > 3) {
      return await message.channel.send(await args.t('commands/config:prefix.error.prefixToLong'))
    }

    await this.container.prisma.guildSettings.update({
      where: {
        guildId: message.guild.id
      },
      data: {
        prefix
      }
    })

    return await message.channel.send(await args.t('commands/config:prefix.success.setPrefix', { prefix }))
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message, args: ArielCommand.Args) {
    await this.container.prisma.guildSettings.update({
      where: {
        guildId: message.guild.id
      },
      data: {
        prefix: process.env.PREFIX
      }
    })

    return await message.channel.send(await args.t('commands/config:prefix.success.resetPrefix'))
  }

  public async show(message: Message, args: ArielCommand.Args) {
    const { prefix } = await this.container.prisma.guildSettings.findUnique({
      where: {
        guildId: message.guild.id
      }
    })

    return await message.channel.send(await args.t('commands/config:prefix.showPrefix', { prefix }))
  }
}
