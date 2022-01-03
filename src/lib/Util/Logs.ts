import dayjs from 'dayjs'
import { Guild, MessageEmbed, TextChannel } from 'discord.js'
import GuildSettings from '../Models/GuildSettings'
import type { logEmbedData } from '../Types/Logs'

export function logEmbed(type: 'members' | 'moderation', data: logEmbedData) {
  return type === 'moderation'
    ? data.action === 'ban'
      ? new MessageEmbed({
        title: 'Member Banned',
        color: 'RED',
        description:
            `┏ **Banned User:** ${data.member.user.tag} (${data.member.id})\n` +
            `┣ **Banned User ID:** ${data.member.id}\n` +
            `┣ **Issued By:** ${data.issuer.toString()}\n` +
            `┗ **Reason:** ${data.reason}`,
        timestamp: new Date()
      })
      : new MessageEmbed({
        title: 'Member Kicked',
        color: 'YELLOW',
        description:
            `┏ **Kicked User:** ${data.member.user.tag}\n` +
            `┣  **Kicked User ID: :** ${data.member.id}\n` +
            `┣  **Issued By:** ${data.issuer.toString()}\n` +
            `┗  **Reason:** ${data.reason}`
      })
    : data.action === 'join'
      ? new MessageEmbed({
        title: 'Member Joined',
        color: 'BLURPLE',
        description:
          `┏ **User:** ${data.member.user.tag}\n` +
          `┣ **ID:** ${data.member.id}\n` +
          `┗ **Account Created At:** <t:${dayjs(data.member.user.createdTimestamp).unix()}:D>`,
        timestamp: new Date()
      })
      : new MessageEmbed({
        title: 'Member Left',
        color: 'BLURPLE',
        description:
          `┏ **User:** ${data.member.user.tag}\n` +
          `┣ **ID:** ${data.member.id}\n` +
          `┣ **Join Date:** <t:${dayjs(data.member.joinedTimestamp).unix()}:D> \n` +
          `┗ **Account Created At:** <t:${dayjs(data.member.user.createdTimestamp).unix()}:D>`,
        timestamp: new Date()
      })
}

export async function sendToLogs(guild: Guild, type: 'moderation' | 'members', embed: MessageEmbed) {
  const { logs } = await GuildSettings.findOne({ guild_id: guild.id })

  if (!logs) return false

  const webhookId = logs[type].hook
  const channelId = logs[type].channel

  if (guild.channels.cache.has(channelId)) {
    const hooks = await (guild.channels.cache.get(channelId) as TextChannel).fetchWebhooks()
    if (hooks.has(webhookId)) await hooks.get(webhookId).send({ embeds: [embed] })
  }

  return true
}
