import { ArielCommand, ArielCommandOptions } from '#lib/Structures/BaseCommand'
import { MessageEmbed, Message } from 'discord.js'
import { ApplyOptions, RequiresUserPermissions } from '@sapphire/decorators'
import type { Args } from '@sapphire/framework'
import db from '#database'
import cfg from '../../config'
import type { GuildSettings } from '#types'

@ApplyOptions<ArielCommandOptions>({
  description: 'Settings per guild',
  usage: '<enable | disable | list: default> [new value]',
  subCommands: ['enable', 'disable', { input: 'list', default: true }]
})
export default class Settings extends ArielCommand {
  public async list(message: Message) {
    const { data: guild_data } = await db
      .from<GuildSettings>('guilds')
      .select()
      .eq('guild_id', message.guild.id)
      .single()

    const embed = new MessageEmbed()
      .setTitle(`Guild Settings | ${message.guild.name}`)
      .setDescription(
        `**Anti-Unmentionable:** ${guild_data['anti-unmentionable'] ? 'Enabled' : 'Disabled'}\n` +
          `**Anti-Invites:** ${guild_data['anti-invites'] ? 'Enabled' : 'Disabled'}` +
          `**Anti-Gifts:** ${guild_data['anti-gifts'] ? 'Enabled' : 'Disabled'}`
      )
      .setFooter(`To disable these options use ${cfg.prefix}anti `)

    return await message.channel.send({ embeds: [embed] })
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async enable(message: Message, args: Args) {
    const setting = await args.pick('string')

    const embed = new MessageEmbed()

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
        return embed.setDescription('You can enable: anti `unmentionable` names and anti discord `invites`')
      }
    }
  }

  @RequiresUserPermissions('MANAGE_GUILD')
  public async disable(message: Message, args: Args) {
    const setting = await args.pick('string')

    const embed = new MessageEmbed()

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
        return embed.setDescription('You can disable: anti `unmentionable` names and anti discord `invites`')
      }
    }
  }

  // @ts-ignore
  private async EnableAnti(message: Message, anti: string) {
    switch (anti) {
      case 'unmentionable': {
        await db.from<GuildSettings>('guilds').update({ 'anti-unmentionable': true }).eq('guild_id', message.guild.id)

        return await message.channel.send('Now filtering unmentionable names')
      }
      case 'invite':
      case 'invites': {
        await db.from<GuildSettings>('guilds').update({ 'anti-invites': true }).eq('guild_id', message.guild.id)

        return await message.channel.send('Now filtering discord invites')
      }

      case 'gift':
      case 'gifts': {
        await db.from<GuildSettings>('guilds').update({ 'anti-gifts': true }).eq('guild_id', message.guild.id)

        return await message.channel.send('Now filtering discord gifts')
      }
    }
  }

  // @ts-ignore
  private async DisableAnti(message: Message, anti: string) {
    switch (anti) {
      case 'unmentionable': {
        await db.from<GuildSettings>('guilds').update({ 'anti-unmentionable': false }).eq('guild_id', message.guild.id)

        return await message.channel.send('No longer filtering unmentionable names')
      }
      case 'invite':
      case 'invites': {
        await db.from<GuildSettings>('guilds').update({ 'anti-invites': false }).eq('guild_id', message.guild.id)

        return await message.channel.send('No longer filtering discord invites')
      }

      case 'gift':
      case 'gifts': {
        await db.from<GuildSettings>('guilds').update({ 'anti-invites': false }).eq('guild_id', message.guild.id)

        return await message.channel.send('Now filtering discord gifts')
      }
    }
  }
}