import GuildSettings from '#lib/Models/GuildSettings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import type { Message, TextChannel } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set log channel for types: Moderation and Members',
  requiredUserPermissions: ['MANAGE_GUILD'],
  requiredClientPermissions: ['MANAGE_CHANNELS'],
  flags: ['d', 'disable'],
  usage: '<moderation | members> <#channel>'
})
export default class Log extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const log = (await args.pickResult('string')).value
    const disableFlag = args.getFlags('d', 'disable')
    const channel = (await args.pickResult('guildTextChannel')).value

    if (!log) return await message.channel.send('Please include a type you want to log. (Moderation or Members)')

    switch (log.toLowerCase()) {
      case 'moderation': {
        if (disableFlag) {
          return await this.deleteWebhook(message, 'moderation')
        } else {
          if (!channel) return await message.channel.send('Mention a channel to set the log channel to!')
          const webhook = await channel.createWebhook('Moderation Logs', {
            avatar: this.container.client.user.avatarURL({ dynamic: true })
          })
          await GuildSettings.findOneAndUpdate(
            { guild_id: message.guild.id },
            { $set: { 'logs.moderation': { hook: webhook.id, channel: channel.id } } }
          )

          return await message.channel.send(
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            `I have successfully set the channel to log Moderation events to ${channel.toString()}`
          )
        }
      }

      case 'members': {
        if (disableFlag) {
          return await this.deleteWebhook(message, 'members')
        } else {
          if (!channel) return await message.channel.send('Mention a channel to set the log channel to!')
          const webhook = await channel.createWebhook('Member Logs', {
            avatar: this.container.client.user.avatarURL({ dynamic: true })
          })
          await GuildSettings.findOneAndUpdate(
            { guild_id: message.guild.id },
            { $set: { 'logs.members': { hook: webhook.id, channel: channel.id } } }
          )

          return await message.channel.send(
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            `I have successfully set the channel to log Member events to ${channel.toString()}`
          )
        }
      }

      default: {
        return await message.channel.send('Unknown log type! Current log types: Moderation and Members')
      }
    }
  }

  private async deleteWebhook(message: Message, type: 'moderation' | 'members') {
    const guild = await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id })
    const webhookID = guild.logs[type].hook
    const channel = guild.logs[type].channel

    if (message.guild.channels.cache.has(channel)) {
      const hooks = await (message.guild.channels.cache.get(channel) as TextChannel).fetchWebhooks()
      if (hooks.has(webhookID)) hooks.delete(webhookID)
    }

    await GuildSettings.findOneAndUpdate({ guild_id: message.guild.id }, { $set: { [`logs.${type}`]: null } })

    return await message.channel.send(`Disabled \`${type}\` logs`)
  }
}
