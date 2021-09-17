import GuildSettings from '#lib/Models/GuildSettings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { TFunction } from '@sapphire/plugin-i18next'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/anti:description',
  usage: '<enable | disable | list: default> [unmentionable | invites, invite | gifts, gift]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends ArielCommand {
  public async list(message: Message, args: ArielCommand.Args) {
    return await this.defaultEmbed(message, args.t)
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async enable(message: Message, args: ArielCommand.Args) {
    const setting = args.finished ? null : await args.pick('string')

    if (!setting) return await this.defaultEmbed(message, args.t)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
          return await message.channel.send(args.t('commands/anti:permissionErr', { perm: 'MANGE_NICKNAMES' }))
        }

        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.unmentionable': true } })

        return await message.channel.send(args.t('commands/anti:enabled', { enabled: 'unmentionable names' }))
      }

      case 'invite':
      case 'invites': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send(args.t('commands/anti:permissionErr', { perm: 'MANGE_MESSAGES' }))
        }

        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.invites': true } })

        return await message.channel.send(args.t('commands/anti:enabled', { enabled: 'discord invites' }))
      }

      case 'gift':
      case 'gifts': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send(args.t('commands/anti:permissionErr', { perm: 'MANGE_MESSAGES' }))
        }

        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.gifts': true } })

        return await message.channel.send(args.t('commands/anti:enabled', { enabled: 'discord gifts' }))
      }

      default: {
        return await this.defaultEmbed(message, args.t)
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async disable(message: Message, args: ArielCommand.Args) {
    const setting = args.finished ? null : await args.pick('string')

    if (!setting) return await this.defaultEmbed(message, args.t)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.unmentionable': false } })

        return await message.channel.send(args.t('commands/anti:disabled', { disabled: 'unmentionable names' }))
      }

      case 'invite':
      case 'invites': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.invites': false } })

        return await message.channel.send(args.t('commands/anti:disabled', { disabled: 'discord invites' }))
      }

      case 'gift':
      case 'gifts': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.gifts': true } })

        return await message.channel.send(args.t('commands/anti:disabled', { disabled: 'discord gifts' }))
      }

      default: {
        return await this.defaultEmbed(message, args.t)
      }
    }
  }

  private async defaultEmbed(message: Message, t: TFunction) {
    const { anti, prefix } = await GuildSettings.findOne({ guild_id: message.guild.id })

    const embed = new MessageEmbed()
      .setTitle(`${t('commands/anti:title')} | ${message.guild.name}`)
      .setDescription(
        `${t('commands/anti:unmentionable', { yesNo: anti.unmentionable ? 'Yes' : 'No' })}\n` +
          `${t('commands/anti:filtering', { name: 'invites', yesNo: anti.invites ? 'Yes' : 'No' })}\n` +
          `${t('commands/anti:filtering', { name: 'gifts', yesNo: anti.gifts ? 'Yes' : 'No' })}`
      )
      .setFooter(t('commands/anti:disableFooter', { prefix }))

    return await message.channel.send({ embeds: [embed] })
  }
}
