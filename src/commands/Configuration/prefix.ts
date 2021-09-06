import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import cfg from '../../config'
import GuildSettings from '#lib/Models/GuildSettings'
import i18 from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/prefix:description',
  usage: '[set | reset | show: default] [new prefix]',
  subCommands: ['reset', 'set', { input: 'show', default: true }]
})
export default class Prefix extends ArielCommand {
  @RequiresUserPermissions('MANAGE_GUILD')
  public async set(message: Message, args: Args) {
    const prefix = (await args.pickResult('string')).value

    if (!prefix) return await message.channel.send(i18.t('commands/prefix:error.noPrefix'))
    if (prefix.length > 3) return await message.channel.send(i18.t('commands/prefix:error.prefixToLong'))

    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: prefix } })

    return await message.channel.send(i18.t('commands/prefix:success.setPrefix', { prefix }))
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message) {
    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: cfg.prefix } })

    return await message.channel.send(i18.t('commands/prefix:success.resetPrefix'))
  }

  public async show(message: Message) {
    const { prefix } = await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id })

    return await message.channel.send(i18.t('commands/prefix:showPrefix', { prefix }))
  }
}
