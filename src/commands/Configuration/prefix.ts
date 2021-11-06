import { envParseString } from '#lib/env/parser'
import GuildSettings from '#lib/Models/GuildSettings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import { resolveKey } from '@sapphire/plugin-i18next'
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

    if (!prefix) return await message.channel.send(await resolveKey(message, 'commands/config:prefix.noPrefix'))
    if (prefix.length > 3) {
      return await message.channel.send(await resolveKey(message, 'commands/config:prefix.prefixToLong'))
    }

    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: prefix } })

    return await message.channel.send(await resolveKey(message, 'commands/config:prefix.setPrefix', { prefix }))
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message) {
    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: envParseString('PREFIX') } })

    return await message.channel.send(await resolveKey(message, 'commands/config:prefix.success.resetPrefix'))
  }

  public async show(message: Message) {
    const { prefix } = await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id })

    return await message.channel.send(await resolveKey(message, 'commands/config:prefix.showPrefix', { prefix }))
  }
}
