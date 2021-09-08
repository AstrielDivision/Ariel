import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import GuildSettings from '#lib/Models/GuildSettings'
import i18 from 'i18next'

@ApplyOptions<ArielCommandOptions>({
  description: 'commands/anti:description',
  usage: '<enable | disable | list: default> [unmentionable | invites, invite | gifts, gift]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends ArielCommand {
  public async list(message: Message) {
    return await this.defaultEmbed(message)
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async enable(message: Message, args: Args) {
    const setting = args.finished ? null : await args.pick('string')

    if (!setting) return await this.defaultEmbed(message)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
          return await message.channel.send(i18.t('commands/anti:permissionErr', { perm: 'MANGE_NICKNAMES' }))
        }

        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.unmentionable': true } })

        return await message.channel.send(i18.t('commands/anti:enabled', { enabled: 'unmentionable names' }))
      }

      case 'invite':
      case 'invites': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send(i18.t('commands/anti:permissionErr', { perm: 'MANGE_MESSAGES' }))
        }

        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.invites': true } })

        return await message.channel.send(i18.t('commands/anti:enabled', { enabled: 'discord invites' }))
      }

      case 'gift':
      case 'gifts': {
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
          return await message.channel.send(i18.t('commands/anti:permissionErr', { perm: 'MANGE_MESSAGES' }))
        }

        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.gifts': true } })

        return await message.channel.send(i18.t('commands/anti:enabled', { enabled: 'discord gifts' }))
      }

      default: {
        return await this.defaultEmbed(message)
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async disable(message: Message, args: Args) {
    const setting = args.finished ? null : await args.pick('string')

    if (!setting) return await this.defaultEmbed(message)

    switch (setting.toLowerCase()) {
      case 'unmentionable': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.unmentionable': false } })

        return await message.channel.send(i18.t('commands/anti:disabled', { disabled: 'unmentionable names' }))
      }

      case 'invite':
      case 'invites': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.invites': false } })

        return await message.channel.send(i18.t('commands/anti:disabled', { disabled: 'discord invites' }))
      }

      case 'gift':
      case 'gifts': {
        await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { 'anti.gifts': true } })

        return await message.channel.send(i18.t('commands/anti:disabled', { disabled: 'discord gifts' }))
      }

      default: {
        return await this.defaultEmbed(message)
      }
    }
  }

  private async defaultEmbed(message: Message) {
    const { anti, prefix } = await GuildSettings.findOne({ guild_id: message.guild.id })

    const embed = new MessageEmbed()
      .setTitle(`${i18.t('commands/anti:title')} | ${message.guild.name}`)
      .setDescription(
        `${i18.t('commands/anti:unmentionable', { yesNo: anti.unmentionable ? 'Yes' : 'No' })}\n` +
          `${i18.t('commands/anti:filtering', { name: 'invites', yesNo: anti.invites ? 'Yes' : 'No' })}\n` +
          `${i18.t('commands/anti:filtering', { name: 'gifts', yesNo: anti.gifts ? 'Yes' : 'No' })}`
      )
      .setFooter(i18.t('commands/anti:disableFooter', { prefix }))

    return await message.channel.send({ embeds: [embed] })
  }
}
