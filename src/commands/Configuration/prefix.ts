import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import cfg from '../../config'
import GuildSettings from '#lib/Models/GuildSettings'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set the discord bot\'s prefix',
  usage: '[set | reset | show: default] [new prefix]',
  subCommands: ['reset', 'set', { input: 'show', default: true }]
})
export default class Prefix extends ArielCommand {
  @RequiresUserPermissions('MANAGE_GUILD')
  public async set(message: Message, args: Args) {
    const prefix = await args.pick('string')

    if (!prefix) return await message.channel.send('No new prefix provided')
    if (prefix.length >= 3) return await message.channel.send('The prefix must be less than 3 characters long')

    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: prefix } })

    return await message.channel.send('Successfully set the prefix set to ' + prefix)
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async reset(message: Message) {
    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { prefix: cfg.prefix } })

    return await message.channel.send('Successfully reset the prefix')
  }

  public async show(message: Message) {
    const { prefix } = await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id })

    return await message.channel.send(`The current guild prefix is: ${prefix}`)
  }
}
