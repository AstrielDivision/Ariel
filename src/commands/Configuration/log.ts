import GuildSettings from '#lib/Models/GuildSettings'
import { ArielCommand, ArielCommandOptions } from '#lib/Structures/Command'
import { ApplyOptions } from '@sapphire/decorators'
import { Message, MessageEmbed, TextChannel } from 'discord.js'

@ApplyOptions<ArielCommandOptions>({
  description: 'Set log channel for Moderation actions and Members joining and leaving',
  requiredUserPermissions: ['MANAGE_GUILD'],
  requiredClientPermissions: ['MANAGE_CHANNELS', 'MANAGE_WEBHOOKS'],
  flags: ['d', 'disable'],
  usage: '<moderation | members> <#channel>'
})
export default class Log extends ArielCommand {
  public async messageRun(message: Message, args: ArielCommand.Args) {
    const log = (await args.pickResult('string')).value
    const disableFlag = args.getFlags('d', 'disable')
    const channel = (await args.pickResult('guildTextChannel')).value

    switch (log ? log.toLowerCase() : '') {
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
            `Logging Moderation Actions to ${channel.toString()}`
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
            `Logging Members Join and Leave to ${channel.toString()}`
          )
        }
      }

      default: {
        const { logs } = await GuildSettings.findOne({ guild_id: message.guild.id })
        let moderationLogs
        let membersLogs

        if (message.guild.channels.cache.has(logs.moderation?.channel)) {
          moderationLogs = message.guild.channels.cache.get(logs.moderation.channel)
        }
        if (message.guild.channels.cache.has(logs.members?.channel)) {
          membersLogs = message.guild.channels.cache.get(logs.moderation.channel)
        }

        /* eslint-disable @typescript-eslint/no-base-to-string */
        const embed = new MessageEmbed({
          color: 'YELLOW',
          description:
            `${
              membersLogs
                ? `Logging **members** Join and Leave in ${membersLogs.toString()}`
                : 'Not currently logging **members** Join and Leave.'
            }\n` +
            `${
              moderationLogs
                ? `Logging **moderation** actions in ${moderationLogs.toString()}`
                : 'Not currently logging **moderation** actions.'
            }`,
          timestamp: new Date(),
          author: {
            name: `Logs | ${message.guild.name}`,
            icon_url: message.guild.iconURL({ dynamic: true, format: 'png' })
          }
        })

        return await message.channel.send({ embeds: [embed] })
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
