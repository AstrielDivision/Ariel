import { envParseString } from '#lib/env/parser'
import GuildSettings from '#lib/Models/GuildSettings'
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

    if (!prefix) return await message.channel.send(await args.t('commands/config:prefix.noPrefix'))
    if (prefix.length > 3) {
      return await message.channel.send(await args.t('commands/config:prefix.prefixToLong'))
    }

    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: prefix } })

    return await message.channel.send(await args.t('commands/config:prefix.setPrefix', { prefix }))
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message, args: ArielCommand.Args) {
    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: envParseString('PREFIX') } })

    return await message.channel.send(await args.t('commands/config:prefix.success.resetPrefix'))
  }

  public async show(message: Message, args: ArielCommand.Args) {
    const { prefix } = await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id })

    return await message.channel.send(await args.t('commands/config:prefix.showPrefix', { prefix }))
  }
}
