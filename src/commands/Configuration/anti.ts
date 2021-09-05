import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import cfg from '../../config'
import GuildSettings from '#lib/Models/GuildSettings'

@ApplyOptions<ArielCommandOptions>({
  description: 'Settings per guild',
  usage: '<enable | disable | list: default> [unmentionable | invites, invite | gifts, gift]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends ArielCommand {
  public async list(message: Message) {
    return await this.defaultEmbed(message)
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async enable(message: Message, args: Args) {
    const setting = (await args.pickResult('string')).value

    if (!setting) return await this.defaultEmbed(message)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
          return await message.channel.send('I don\'t have the `MANAGE_NICKNAMES` permission!')
        }

        return await this.EnableAnti(message, 'unmentionable')
      }

      case 'invite':
      case 'invites': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send('I don\'t have the `MANAGE_MESSAGES` permission!')
        }

        return await this.EnableAnti(message, 'invites')
      }

      case 'gift':
      case 'gifts': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send('I don\'t have the `MANAGE_MESSAGES` permission!')
        }

        return await this.EnableAnti(message, 'gifts')
      }

      default: {
        return await this.defaultEmbed(message)
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async disable(message: Message, args: Args) {
    const setting = (await args.pickResult('string')).value

    if (!setting) return await this.defaultEmbed(message)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        return await this.DisableAnti(message, 'unmentionable')
      }

      case 'invite':
      case 'invites': {
        return await this.DisableAnti(message, 'invites')
      }

      case 'gift':
      case 'gifts': {
        return await this.DisableAnti(message, 'gifts')
      }

      default: {
        return await this.defaultEmbed(message)
      }
    }
  }

  private async EnableAnti(message: Message, anti: string) {
    switch (anti) {
      case 'unmentionable': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.unmentionable': true } })

        return await message.channel.send('Now filtering unmentionable names')
      }
      case 'invite':
      case 'invites': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.invites': true } })

        return await message.channel.send('Now filtering discord invites')
      }

      case 'gift':
      case 'gifts': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.gifts': true } })

        return await message.channel.send('Now filtering discord gifts')
      }
    }

    return undefined
  }

  private async DisableAnti(message: Message, anti: string) {
    switch (anti) {
      case 'unmentionable': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.unmentionable': false } })

        return await message.channel.send('No longer filtering unmentionable names')
      }
      case 'invite':
      case 'invites': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.invites': false } })

        return await message.channel.send('No longer filtering discord invites')
      }

      case 'gift':
      case 'gifts': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.gifts': true } })

        return await message.channel.send('Now filtering discord gifts')
      }
    }

    return undefined
  }

  private async defaultEmbed(message: Message) {
    const { anti } = await GuildSettings.findOne({ guild_id: message.guild.id })

    const embed = new MessageEmbed()
      .setTitle(`Guild Settings | ${message.guild.name}`)
      .setDescription(
        `Filtering **unmentionable** names?: ${anti.unmentionable ? 'Yes' : 'No'}\n` +
          `Filtering **invites**?: ${anti.invites ? 'Yes' : 'No'}\n` +
          `Filtering **gifts**?: ${anti.gifts ? 'Yes' : 'No'}`
      )
      .setFooter(`To disable these use ${cfg.prefix}anti disable [name]`)

    return await message.channel.send({ embeds: [embed] })
  }
}
